'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipes', {
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
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'created_by',
      },
      title: {
        type: Sequelize.STRING,
      },
      endpoint: {
        type: Sequelize.STRING,
      },
      isLive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'is_live',
        defaultValue: false,
      },
      yieldServings: {
        type: Sequelize.INTEGER,
        field: 'yield_servings',
      },
      prepTime: {
        type: Sequelize.FLOAT,
        field: 'prep_time',
      },
      prepTimeUnits: {
        type: Sequelize.STRING,
        field: 'prep_time_units',
      },
      cookTime: {
        type: Sequelize.FLOAT,
        field: 'cook_time',
      },
      cookTimeUnits: {
        type: Sequelize.STRING,
        field: 'cook_time_units',
      },
      backgroundImageName: {
        type: Sequelize.STRING,
        field: 'background_image_name',
      },
      narrative: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('recipes')
  },
}
