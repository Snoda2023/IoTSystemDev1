// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQLの接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
});

// データベースからデータを取得するエンドポイント
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM your_table_name';
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(results);
    }
  });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});