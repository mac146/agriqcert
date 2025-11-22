require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
// 1. Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

// 2. Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');
    } catch (error) {
        console.error('wm Unable to connect to the database:', error);
    }
}

testConnection();
// 3. Import models
const userModel = require('../models/user')(sequelize, DataTypes);

module.exports = {
    sequelize,
    userModel
};