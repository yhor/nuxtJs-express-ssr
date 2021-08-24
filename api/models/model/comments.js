const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comment_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "댓글키"
    },
    document_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "게시글키"
    },
    module_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "모듈키"
    },
    parent_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "부모댓글키"
    },
    parent_nick_name: {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: "부모닉네임"
    },
    head: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "대댓글 정렬1 (부모 댓글키)"
    },
    arrange: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "대댓글 정렬2(신규 댓글키)"
    },
    depth: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "대댓글 깊이"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    uploaded_count: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "파일업로드개수"
    },
    member_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "사용자키"
    },
    nick_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "닉네임"
    },
    ipaddress: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "사용자아이피"
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "사용자 UA"
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
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_srl" },
        ]
      },
      {
        name: "idx_document_comment_srl",
        using: "BTREE",
        fields: [
          { name: "document_srl" },
          { name: "comment_srl" },
        ]
      },
      {
        name: "idx_list",
        using: "BTREE",
        fields: [
          { name: "document_srl" },
          { name: "head" },
          { name: "arrange" },
        ]
      },
      {
        name: "idx_document_srl",
        using: "BTREE",
        fields: [
          { name: "document_srl" },
        ]
      },
      {
        name: "idx_module_srl",
        using: "BTREE",
        fields: [
          { name: "module_srl" },
        ]
      },
      {
        name: "idx_member_srl",
        using: "BTREE",
        fields: [
          { name: "member_srl" },
        ]
      },
      {
        name: "idx_ipaddress",
        using: "BTREE",
        fields: [
          { name: "ipaddress" },
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
