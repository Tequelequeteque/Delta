import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        country: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'addresses',
      }
    );
    this.removeAttribute('id');
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pupil, { foreignKey: 'pupil_id' });
  }
}

export default Address;
