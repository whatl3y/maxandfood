'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'account_images',
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
        imageName: {
          type: Sequelize.STRING,
          field: 'image_name',
        },
        position: {
          type: Sequelize.STRING,
        },
        isEnabled: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          field: 'is_enabled',
          defaultValue: true,
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
            fields: ['account_id', 'image_name'],
          },
        ],
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('account_images')
  },
}
