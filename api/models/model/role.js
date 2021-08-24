const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    role_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "권한키"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "이름",
      unique: "unique_role_name"
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "코드",
      unique: "unique_role_code"
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
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일"
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_srl" },
        ]
      },
      {
        name: "unique_role_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "unique_role_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
