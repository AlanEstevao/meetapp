import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours, subDays } from 'date-fns';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        date: Sequelize.DATE,
        time: Sequelize.TIME,
        localization: Sequelize.STRING,
        description: Sequelize.STRING,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subDays(this.date, 7));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'organizer_id',
      as: 'organizer',
    });

    this.belongsTo(models.File, {
      foreignKey: 'banner_id',
      as: 'banner',
    });
  }
}

export default Meetup;
