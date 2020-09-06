'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      planType: {
        type: Sequelize.STRING,
        defaultValue: 'basic',
        field: 'plan_type',
      },
      domainName: {
        type: Sequelize.STRING,
        field: 'domain_name',
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts')
  },
}
