import { DataTypes, sequelize } from '../sequelize'

const Account = sequelize.define(
  'account',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    planType: { type: DataTypes.STRING, defaultValue: 'basic' },
    domainName: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN,
  },
  {
    underscored: true,
  }
)

Account.associate = (models) => {
  Account.belongsToMany(models.User, { through: models.AccountUser })
}

export default Account
