const Sequelize = require('sequelize');
const Students = require('./students');

const env = process.env.NODE_ENV || 'student_records';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Students = Students;

Students.init(sequelize);

module.exports = db;
