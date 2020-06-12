import Sequelize, { Model } from 'sequelize';

class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
        fileName: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path || 'profile.jpg'}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'images',
      }
    );
    this.removeAttribute('id');
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pupil, { foreignKey: 'pupil_id' });
    return this;
  }
}

export default Image;
