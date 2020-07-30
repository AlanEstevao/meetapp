import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        canceled_at: Sequelize.DATE,
        // user_id: Sequelize.NUMBER,
        // meetup_id: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    this.belongsTo(models.Meetup, {
      foreignKey: 'meetup_id',
      as: 'meetup',
    });
  }
}

export default Registration;
