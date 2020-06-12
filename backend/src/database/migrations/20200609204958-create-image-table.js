module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('images', {
      pupil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'pupils', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      path: Sequelize.STRING,
      file_name: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('images');
  },
};
