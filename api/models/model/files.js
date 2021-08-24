const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    file_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "파일키"
    },
    upload_target_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "게시글키|댓글키"
    },
    upload_target_type: {
      type: DataTypes.CHAR(3),
      allowNull: true,
      comment: "null|doc|img|vod"
    },
    sid: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: "다운로드키"
    },
    module_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "모듈키"
    },
    member_srl: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "사용자키"
    },
    ipaddress: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "사용자아이피"
    },
    download_count: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "다운로드수"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "파일이름(확장자포함)"
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "파일경로(도메인제외)"
    },
    ext: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "파일확장자"
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "local",
      comment: "파일 위치(local|s3)"
    },
    file_size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "파일크기"
    },
    isvalid: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "N",
      comment: "파일상태"
    },
    cover_image: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "N",
      comment: "대표이미지(썸네일)"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    s3_region: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "s3 지역"
    },
    s3_bucket: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "s3 버킷"
    },
    s3_download_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "s3 full url"
    }
  }, {
    sequelize,
    tableName: 'files',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "file_srl" },
        ]
      },
      {
        name: "idx_upload_target_srl",
        using: "BTREE",
        fields: [
          { name: "upload_target_srl" },
        ]
      },
      {
        name: "idx_upload_target_type",
        using: "BTREE",
        fields: [
          { name: "upload_target_type" },
        ]
      },
      {
        name: "idx_sid",
        using: "BTREE",
        fields: [
          { name: "sid" },
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
        name: "idx_download_count",
        using: "BTREE",
        fields: [
          { name: "download_count" },
        ]
      },
      {
        name: "idx_file_size",
        using: "BTREE",
        fields: [
          { name: "file_size" },
        ]
      },
      {
        name: "idx_is_valid",
        using: "BTREE",
        fields: [
          { name: "isvalid" },
        ]
      },
      {
        name: "idx_created_at",
        using: "BTREE",
        fields: [
          { name: "created_at" },
        ]
      },
      {
        name: "idx_ipaddress",
        using: "BTREE",
        fields: [
          { name: "ipaddress" },
        ]
      },
    ]
  });
};
