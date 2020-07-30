import { isBefore, format, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Registration from '../models/Registration';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import RegistrationMailer from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async store(req, res) {
    const { meetup_id } = req.body;

    const meetup = await Meetup.findOne({
      where: { id: meetup_id },
    });

    const user = await User.findByPk(req.userId);

    // O usuário deve poder se inscrever em meetups que não organiza.
    if (user.id === meetup.organizer_id) {
      return res.status(400).json({
        error: 'User is the organizer',
      });
    }

    // O usuário não pode se inscrever em meetups que já aconteceram.
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({
        error: 'Meetup have already happened',
      });
    }

    // O usuário não pode se inscrever no mesmo meetup duas vezes.
    const checkRegistration = await Registration.findOne({
      where: {
        user_id: req.userId,
        meetup_id,
      },
    });

    if (checkRegistration) {
      return res.status(400).json({
        error: 'User is already registrated in this meetup',
      });
    }

    // O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
    const checkAvailability = await Registration.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (!(checkAvailability !== [])) {
      return res.status(400).json({
        erro: 'Schedule is not available ',
      });
    }

    const registration = await Registration.create({
      meetup_id,
      user_id: req.userId,
    });

    // Notificando o organizador que alguém se inscreveu no seu meetup

    const formattedDate = format(
      meetup.date,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `${user.name} se inscreveu no seu MeetUp "${meetup.title}" que acontecerá no ${formattedDate}`,
      user: meetup.organizer_id,
    });

    const organizer = await User.findOne({
      where: { id: meetup.organizer_id },
    });

    await Queue.add(RegistrationMailer.key, {
      organizer,
      meetup,
      user,
      formattedDate,
    });

    return res.json(registration);
  }

  async index(req, res) {
    // Lista todos os meetups em que o usuário logado está inscrito
    const today = new Date();

    const meetups = await Registration.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id', 'canceled_at'],
      include: {
        model: Meetup,
        as: 'meetup',
        attributes: ['id', 'title', 'date', 'past', 'cancelable', 'localization'],
        include: {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        order: ['date', 'ASC'],
      },
    });

    return res.json(meetups);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (registration.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You are not registrated to this meetup',
      });
    }

    const dateWithSub = subDays(registration.date, 5);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel registrations 5 days in advance.',
      })
    }

    registration.canceled_at = new Date();

    await registration.save();

    return res.json(registration);
  }
}

export default new RegistrationController();
