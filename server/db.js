import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// 取得目前檔案與資料夾路徑 (支援 ES Module 語法)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'students.sqlite');

sqlite3.verbose();
export const db = new sqlite3.Database(dbPath);

// 封裝 db.run 為 Promise (用於 INSERT, UPDATE, DELETE)
export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

// 封裝 db.all 為 Promise (用於 SELECT 多筆)
export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// 初始化資料庫結構
export async function initDatabase() {
  try {
    await run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id TEXT NOT NULL,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        course TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 如果資料庫是空的，則自動塞入預設測試資料
    const rows = await all('SELECT COUNT(*) as count FROM students');
    if (rows[0].count === 0) {
      const sampleData = [
        ['S001', '王小明', '智慧商務系', 'React 入門', 's001@example.com'],
        ['S002', '陳美華', '資訊管理系', 'Ant Design 元件應用', 's002@example.com'],
        ['S003', '林志強', '電子商務系', '前端專案實作', 's003@example.com']
      ];
      
      for (const student of sampleData) {
        await run(
          'INSERT INTO students (student_id, name, department, course, email) VALUES (?, ?, ?, ?, ?)',
          student
        );
      }
      console.log('✅ 已成功寫入預設學生資料至 SQLite');
    }
    console.log('✅ SQLite 資料庫連線與初始化成功');
  } catch (err) {
    console.error('❌ 資料庫初始化失敗:', err);
  }
}