'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_integrations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        allowNull: false,
        field: 'user_id',
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uid: {
        type: Sequelize.STRING,
      },
      accessToken: {
        type: Sequelize.STRING,
        field: 'access_token',
      },
      refreshToken: {
        type: Sequelize.STRING,
        field: 'refresh_token',
      },
      expires: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_integrations')
  },
}
