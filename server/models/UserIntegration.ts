import { DataTypes, sequelize } from '../sequelize'
import { User } from '.'

const UserIntegration = sequelize.define(
  'user_integration',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' },
      allowNull: false,
    },
    type: DataTypes.STRING,
    uid: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    expires: DataTypes.STRING,
  },
  {
    underscored: true,
  }
)

UserIntegration.associate = (models) => {
  UserIntegration.belongsTo(models.User)
}

export default UserIntegration
