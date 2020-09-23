'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'recipe_ratings',
      {
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
        userId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
          field: 'user_id',
        },
        rating: {
          type: Sequelize.INTEGER,
        },
        comment: {
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
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['recipe_id', 'user_id'],
          },
        ],
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipe_ratings')
  },
}
