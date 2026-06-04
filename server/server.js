import express from 'express';
import cors from 'cors';
import { all, run, initDatabase } from './db.js';

const app = express();
const port = 3001;

// 啟用跨來源資源共用 (CORS) 與 JSON 解析
app.use(cors());
app.use(express.json());

// 啟動時自動檢查並初始化資料庫
initDatabase();

// 1. 取得學生列表 (支援關鍵字模糊搜尋)
app.get('/api/students', async (req, res) => {
  try {
    const keyword = (req.query.keyword || '').trim();
    let rows;

    if (keyword) {
      const word = `%${keyword}%`;
      rows = await all(`
        SELECT * FROM students 
        WHERE student_id LIKE ? 
           OR name LIKE ? 
           OR department LIKE ? 
           OR course LIKE ? 
           OR email LIKE ?
        ORDER BY id DESC
      `, [word, word, word, word, word]);
    } else {
      rows = await all('SELECT * FROM students ORDER BY id DESC');
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: '後端查詢失敗', error: err.message });
  }
});

// 2. 新增學生資料
app.post('/api/students', async (req, res) => {
  try {
    const { student_id, name, department, course, email } = req.body;
    const result = await run(
      'INSERT INTO students (student_id, name, department, course, email) VALUES (?, ?, ?, ?, ?)',
      [student_id, name, department, course, email]
    );
    res.status(201).json({ id: result.id, message: '新增成功' });
  } catch (err) {
    res.status(500).json({ message: '新增失敗', error: err.message });
  }
});

// 3. 修改學生資料
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, name, department, course, email } = req.body;
    await run(
      'UPDATE students SET student_id = ?, name = ?, department = ?, course = ?, email = ? WHERE id = ?',
      [student_id, name, department, course, email, id]
    );
    res.json({ message: '更新成功' });
  } catch (err) {
    res.status(500).json({ message: '更新失敗', error: err.message });
  }
});

// 4. 刪除單一學生資料
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM students WHERE id = ?', [id]);
    res.json({ message: '刪除成功' });
  } catch (err) {
    res.status(500).json({ message: '刪除失敗', error: err.message });
  }
});

// 5. 批次刪除學生資料
app.post('/api/students/batch-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: '未提供要刪除的 ID 清單' });
    }
    // 動態產生對應數量的 SQL 萬用字元，例如 (?, ?, ?)
    const placeholders = ids.map(() => '?').join(',');
    await run(`DELETE FROM students WHERE id IN (${placeholders})`, ids);
    res.json({ message: '批次刪除成功' });
  } catch (err) {
    res.status(500).json({ message: '批次刪除失敗', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 後端 API 伺服器已成功運行在： http://localhost:${port}`);
});