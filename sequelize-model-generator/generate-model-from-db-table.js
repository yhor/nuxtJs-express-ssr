const SequelizeAuto = require('sequelize-auto');
const dotenv = require('dotenv');
const path = process.env === 'production' ? '../.env' : '../.env.development'
dotenv.config({ path });

if(process.argv[1].indexOf("generate-model-from-db-table.js") !== -1) {
  const { RDS_DATABASE, RDS_USERNAME, RDS_PASSWORD, RDS_HOST, RDS_DIALECT } = process.env;

  new SequelizeAuto(RDS_DATABASE, RDS_USERNAME, RDS_PASSWORD, {
    host: RDS_HOST,
    dialect: RDS_DIALECT,
    additional: {
      timestamps: false,
      underscored: true,
    },
    directory: './model',
  }).run((err) => {
    if (err) {
      console.debug(err);
    } else {
      console.error('Successfully generated models');
      process.exit();
    }
  });
}
