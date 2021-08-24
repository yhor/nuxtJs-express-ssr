const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_group', {
    group_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "그룹키"
    },
    list_order: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      comment: "표시순서"
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "그룹이름",
      unique: "unique_group_name"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "설명"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'member_group',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_srl" },
        ]
      },
      {
        name: "unique_group_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "idx_list_order",
        using: "BTREE",
        fields: [
          { name: "list_order" },
        ]
      },
    ]
  });
};
