import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subDays } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  // Listagem de todos os meetups cadastrados
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      // where: { organizer_id: req.userId },
      order: ['date'],
      attributes: ['id', 'title', 'date', 'past', 'cancelable'],
      limit: 20, // itens por página
      offset: (page - 1) * 20, // qtde de itens q vc vai pular
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  // Permite que um usuário cadastrar um novo meetup
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      date: Yup.date().required(),
      localization: Yup.string().required(),
      description: Yup.string().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      });
    }

    const { title, date, localization, description, banner_id } = req.body;

    // Comando para marcar uma hora exata e não quebrada 19:15 => 19:00
    // parseISO: passa para o formato de data do JS
    const hourStart = startOfHour(parseISO(date));

    // Checa se a data colocada já passou
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Past dates are not allowed',
      });
    }

    // Se o "prestador de serviço já não tem um appointment no mesmo horário"

    // const checkAvailability = await Meetup.findOne({
    //   where: {
    //     user_id: req.userId,
    //     date: hourStart,
    //   },
    // });

    // if (checkAvailability) {
    //   return res.status(400).json({
    //     erro: 'Appointment not available',
    //   });
    // }

    // Notificar organizador do evento quando houver uma nova inscrição

    const meetup = await Meetup.create({
      organizer_id: req.userId,
      title,
      date,
      localization,
      description,
      banner_id,
    });

    const user = await User.findByPk(req.userId);

    await user.update({
      user_id: req.userId,
      organizer: true,
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    // O organizador só pode cancelar o evento em até 5 dias antes
    if (meetup.organizer_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this meetup",
      });
    }

    const dateWithSub = subDays(meetup.date, 7);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel meetups 5 days in advance',
      });
    }

    await Meetup.destroy({
      where: { id: req.params.id },
    });

    return res.json({
      message: 'Exclusão realizada com sucesso',
    });
  }
}

export default new MeetupController();
