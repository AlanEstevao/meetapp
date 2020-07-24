import User from '../models/User';
import File from '../models/File';

class OrganizerController {
  async index(req, res) {
    const organizers = await User.findAll({
      where: { organizer: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(organizers);
  }
}

export default new OrganizerController();
