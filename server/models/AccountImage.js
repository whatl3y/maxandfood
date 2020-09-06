import { DataTypes, sequelize } from '../sequelize'

const AccountImage = sequelize.define(
  'account_image',
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
    imageName: DataTypes.STRING,
    position: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['account_id', 'image_name'],
      },
    ],
    underscored: true,
  }
)

AccountImage.associate = (models) => {
  AccountImage.belongsTo(models.Account)
}

export default AccountImage
