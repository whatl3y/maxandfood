import { DataTypes, sequelize } from '../sequelize'

const AccountUser = sequelize.define(
  'account_user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accountId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'admin',
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['account_id', 'user_id'],
      },
    ],
    underscored: true,
  }
)

AccountUser.associate = (models) => {
  AccountUser.belongsTo(models.Account)
  AccountUser.belongsTo(models.User)
}

export default AccountUser
