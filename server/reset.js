import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'students.sqlite');

try {
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('✅ 已經成功刪除壞掉的 students.sqlite 檔案！');
  } else {
    console.log('⚠️ 找不到 students.sqlite 檔案。');
  }
} catch (err) {
  console.error('❌ 刪除檔案失敗：', err);
}