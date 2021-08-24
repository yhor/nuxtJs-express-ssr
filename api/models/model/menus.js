const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menus', {
    menu_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "메뉴키"
    },
    parent_srl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "부모메뉴키"
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "TOP",
      comment: "메뉴구분"
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "url"
    },
    browser_title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      comment: "브라우저 제목"
    },
    list_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "순서"
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "비고"
    },
    is_show: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "사용여부"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'menus',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_srl" },
        ]
      },
      {
        name: "idx_order",
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "parent_srl" },
          { name: "list_order" },
        ]
      },
    ]
  });
};
