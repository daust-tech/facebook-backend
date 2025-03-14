require('dotenv').config();  
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: process.env.DB_HOST,        
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,     
  waitForConnections: true,         
  connectionLimit: 10,               
  queueLimit: 0                      
});

module.exports = pool;  

const pool = require('./config/db');

async function fetchData() {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM your_table');
    console.log(rows); 
  } catch (error) {
    console.error('Database query error:', error);
  }
}

fetchData();

