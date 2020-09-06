'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'account_users',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        accountId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'accounts',
            key: 'id',
          },
          field: 'account_id',
        },
        userId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
          field: 'user_id',
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: 'admin',
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
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['account_id', 'user_id'],
          },
        ],
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('account_users')
  },
}
