const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('popupbanner', {
    popup_srl: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "팝업키"
    },
    popup_title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      comment: "팝업 제목"
    },
    target_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "all",
      comment: "all|modules"
    },
    target_srls: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "module_srls(콤마구분)"
    },
    file_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "PC 파일키"
    },
    m_file_srl: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "모바일 파일키"
    },
    popup_link: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "팝업 클릭 링크"
    },
    popup_link_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "N",
      comment: "새창으로 열기"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "시작일"
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "종료일"
    },
    exp_days: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      comment: "팝업 비활성 기간"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    popup_checkbox: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "체크박스 표시"
    },
    text_color: {
      type: DataTypes.STRING(7),
      allowNull: true,
      comment: "글자색"
    },
    bg_color: {
      type: DataTypes.STRING(7),
      allowNull: true,
      comment: "배경색"
    },
    icon_color: {
      type: DataTypes.STRING(7),
      allowNull: true,
      comment: "아이콘색"
    }
  }, {
    sequelize,
    tableName: 'popupbanner',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "popup_srl" },
        ]
      },
      {
        name: "idx_start_date",
        using: "BTREE",
        fields: [
          { name: "start_date" },
        ]
      },
      {
        name: "idx_end_date",
        using: "BTREE",
        fields: [
          { name: "end_date" },
        ]
      },
    ]
  });
};
