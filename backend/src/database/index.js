import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import Pupil from '../app/models/Pupil';
import Image from '../app/models/Image';
import Address from '../app/models/Address';

const models = [Pupil, Image, Address];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
