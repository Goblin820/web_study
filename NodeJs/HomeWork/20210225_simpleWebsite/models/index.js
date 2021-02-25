const Sequelize = require('sequelize');
const User = require('./user');

const env = process.env.NODE_ENV || 'dev';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;

User.init(sequelize);

module.exports = db;
