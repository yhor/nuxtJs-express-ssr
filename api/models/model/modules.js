const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modules', {
    module_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "모듈키"
    },
    module: {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "모듈(board,page)"
    },
    mid: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "모듈url",
      unique: "unique_mid"
    },
    browser_title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      comment: "브라우저 제목"
    },
    layout: {
      type: DataTypes.STRING(250),
      allowNull: true,
      comment: "PC 레이아웃"
    },
    mlayout: {
      type: DataTypes.STRING(250),
      allowNull: true,
      comment: "모바일 레이아웃"
    },
    skin: {
      type: DataTypes.STRING(250),
      allowNull: true,
      comment: "PC 스킨"
    },
    mskin: {
      type: DataTypes.STRING(250),
      allowNull: true,
      comment: "모바일 스킨"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "PC 내용"
    },
    mcontent: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "모바일 내용"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'modules',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "module_srl" },
        ]
      },
      {
        name: "unique_mid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mid" },
        ]
      },
      {
        name: "idx_module",
        using: "BTREE",
        fields: [
          { name: "module" },
        ]
      },
      {
        name: "idx_created_at",
        using: "BTREE",
        fields: [
          { name: "created_at" },
        ]
      },
    ]
  });
};
