import { DataTypes, Op, sequelize } from '../sequelize'

const Tag = sequelize.define(
  'tag',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    colorHex: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
  },
  {
    underscored: true,
  }
)

Tag.associate = (models) => {
  Tag.belongsToMany(models.Recipe, { through: models.RecipeTag })
}

export default Tag
