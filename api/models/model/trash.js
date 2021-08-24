const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trash', {
    trash_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "휴지통키"
    },
    table_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "테이블명"
    },
    json_data: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "JSON serialized"
    },
    remover_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "삭제자"
    },
    remove_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "삭제일"
    }
  }, {
    sequelize,
    tableName: 'trash',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trash_srl" },
        ]
      },
      {
        name: "idx_table_name",
        using: "BTREE",
        fields: [
          { name: "table_name" },
        ]
      },
      {
        name: "idx_remove_at",
        using: "BTREE",
        fields: [
          { name: "remove_at" },
        ]
      },
    ]
  });
};
