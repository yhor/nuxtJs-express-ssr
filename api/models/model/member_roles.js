const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "사용자부여권한키"
    },
    member_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "사용자키"
    },
    role_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "권한키"
    }
  }, {
    sequelize,
    tableName: 'member_roles',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
