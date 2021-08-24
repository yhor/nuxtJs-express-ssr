const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_group_roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "그룹부여권한키"
    },
    group_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "그룹키"
    },
    role_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "권한키"
    }
  }, {
    sequelize,
    tableName: 'member_group_roles',
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
