import Sequelize from 'sequelize';
import { initModels } from './model/init-models';;

const { RDS_DATABASE, RDS_USERNAME, RDS_PASSWORD, RDS_HOST, RDS_DIALECT } = process.env;
const sequelize = new Sequelize(RDS_DATABASE, RDS_USERNAME, RDS_PASSWORD, {
  host: RDS_HOST,
  dialect: RDS_DIALECT,
  logging: false,
  timezone: "+09:00",
});

const db = initModels(sequelize);
db.Sequelize = Sequelize;

// 관계 정의
// db.member.hasMany(db.member_token);
// db.member_token.belongsTo(db.member);

// db.member.hasMany(db.schedule);
// db.schedule.belongsTo(db.member);

// db.cast_member.hasMany(db.cast_info);
// db.cast_info.belongsTo(db.cast_member);

// db.cast_info.hasMany(db.cast_info_etc);
// db.cast_info_etc.belongsTo(db.cast_info);

// db.program_epi_info.hasOne(db.cast_info_etc);
// db.cast_info_etc.belongsTo(db.program_epi_info);

// db.program_allow.hasOne(db.program_allow_in_cast_info);
// db.program_allow_in_cast_info.belongsTo(db.program_allow);

// db.cast_info.hasMany(db.program_allow_in_cast_info);
// db.program_allow_in_cast_info.belongsTo(db.cast_info);

// db.program_epi.hasMany(db.cast_info);
// db.cast_info.belongsTo(db.program_epi);

// db.program.hasMany(db.program_epi);
// db.program_epi.belongsTo(db.program);

// db.program_epi.hasMany(db.program_epi_info);
// db.program_epi_info.belongsTo(db.program_epi);

// db.program_group.hasMany(db.program, { foreignKey: 'group_cid' });
// db.program.belongsTo(db.program_group, { foreignKey: 'group_cid' });

// db.advertisement.hasMany(db.advertisement_batch);
// db.advertisement_batch.belongsTo(db.advertisement);

module.exports = db;