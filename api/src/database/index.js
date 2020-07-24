import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Registration from '../app/models/Registration';

import databaseConfig from '../config/database';

const models = [User, File, Meetup, Registration];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  // { useNewUrlParser: true, useFindAndModify: true
  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/meetapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
