const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('documents', {
    document_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "게시글키"
    },
    module_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "모듈키"
    },
    category_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "카테고리키"
    },
    is_notice: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "공지사항여부"
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: true,
      comment: "제목"
    },
    title_bold: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "제목 두껍게여부"
    },
    title_color: {
      type: DataTypes.STRING(7),
      allowNull: true,
      comment: "제목 컬러 hex"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "태그"
    },
    readed_count: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "읽은수"
    },
    comment_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "댓글수"
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
    is_allow_comment: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "댓글허용여부"
    },
    is_published: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "게시여부"
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
    published_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "게시일"
    }
  }, {
    sequelize,
    tableName: 'documents',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "document_srl" },
        ]
      },
      {
        name: "idx_module_list_order",
        using: "BTREE",
        fields: [
          { name: "module_srl" },
          { name: "published_at" },
        ]
      },
      {
        name: "idx_module_notice",
        using: "BTREE",
        fields: [
          { name: "module_srl" },
          { name: "is_notice" },
        ]
      },
      {
        name: "idx_module_document_srl",
        using: "BTREE",
        fields: [
          { name: "module_srl" },
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
        name: "idx_category_srl",
        using: "BTREE",
        fields: [
          { name: "category_srl" },
        ]
      },
      {
        name: "idx_is_notice",
        using: "BTREE",
        fields: [
          { name: "is_notice" },
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
        name: "idx_is_published",
        using: "BTREE",
        fields: [
          { name: "is_published" },
        ]
      },
      {
        name: "idx_published_at",
        using: "BTREE",
        fields: [
          { name: "published_at" },
        ]
      },
      {
        name: "idx_ngarm_title",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
        ]
      },
      {
        name: "idx_ngarm_content",
        type: "FULLTEXT",
        fields: [
          { name: "content" },
        ]
      },
      {
        name: "idx_ngarm_nick_name",
        type: "FULLTEXT",
        fields: [
          { name: "nick_name" },
        ]
      },
      {
        name: "idx_ngarm_all",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
          { name: "content" },
          { name: "nick_name" },
        ]
      },
    ]
  });
};
