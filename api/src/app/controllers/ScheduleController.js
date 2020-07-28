import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
  // Listar os meetups organizados pelo usuário logado
  async index(req, res) {
    const checkUserOrganizer = await User.findOne({
      where: { id: req.userId, organizer: true },
    });

    if (!checkUserOrganizer) {
      return res.status(400).json({
        error: 'User is not a organizer',
      });
    }

    // Meetups do dia de hoje
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        organizer_id: req.userId,
        date: {
          [Op.between]: [startOfMonth(parsedDate), endOfMonth(parsedDate)],
        },
      },
      attributes: ['id', 'title', 'date', 'localization'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'organizer',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return res.json(meetups);
  }
}

export default new ScheduleController();
