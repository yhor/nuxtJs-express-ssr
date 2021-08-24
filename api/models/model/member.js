const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    member_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "사용자키"
    },
    user_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "아이디",
      unique: "unique_user_id"
    },
    email_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "이메일",
      unique: "unique_email_address"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "비밀번호"
    },
    nick_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "닉네임",
      unique: "unique_nick_name"
    },
    blocked: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "차단여부"
    },
    is_admin: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "최고관리자"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일"
    },
    change_password_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "비밀번호 변경일"
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "마지막 접속일"
    },
    provider: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "소셜로그인 제공"
    },
    socialid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "소셜로그인 아이디"
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "소셜로그인 토큰"
    }
  }, {
    sequelize,
    tableName: 'member',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_srl" },
        ]
      },
      {
        name: "unique_user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "unique_email_address",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email_address" },
        ]
      },
      {
        name: "unique_nick_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nick_name" },
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
