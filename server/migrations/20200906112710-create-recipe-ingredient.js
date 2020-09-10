'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipe_ingredients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      recipeId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'recipes',
          key: 'id',
        },
        field: 'recipe_id',
      },
      quantity: {
        type: Sequelize.FLOAT,
      },
      measurement: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      ordering: {
        type: Sequelize.INTEGER,
      },
      raw: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable('recipe_ingredients')
  },
}
