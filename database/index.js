/* DB 연결 및 SQL문 실행 파일*/

const mysql = require("mysql2/promise");
const colors = require("colors");

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    enableKeepAlive: true, 
    waitForConnections: true,
  };


/* DB Pool 생성 */
const pool = mysql.createPool(config);

// 쿼리 실행 함수
const query = async (queryString, params, response) => {
  console.log(colors.yellow(queryString));

  let connection;
  try {
    connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(queryString, params);
      connection.release();
      return [rows];
    } catch (error) {
      console.error("Query Error");
      console.error(error);
      if (connection) connection.release();
      if (response) {
        return response.status(500).json({ code: "Query Error" });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("DB Error");
    console.error(error);
    if (connection) connection.release();
    if (response) {
      return response.status(500).json({ code: "DB Error" });
    } else {
      throw error;
    }
  }
};

module.exports = { config, pool, query };
