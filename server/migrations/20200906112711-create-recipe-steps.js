'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipe_steps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      description: {
        type: Sequelize.TEXT,
      },
      ordering: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('recipe_steps')
  },
}
