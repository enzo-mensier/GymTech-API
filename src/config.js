require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3002,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};