const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file_temp', {
    temp_file_name: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      primaryKey: true
    },
    orgin_file_name: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'file_temp',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "temp_file_name" },
        ]
      },
    ]
  });
};
