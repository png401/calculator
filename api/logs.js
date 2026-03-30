import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  const rows = await sql`SELECT * FROM logs ORDER BY created_at DESC`;

  const html = `
    <html>
    <head><style>
      body { font-family: sans-serif; padding: 20px; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: center; }
      th { background: #f0f0f0; }
    </style></head>
    <body>
      <h2>📋 계산기 로그</h2>
      <table>
        <tr><th>번호</th><th>A</th><th>B</th><th>결과</th><th>시간</th></tr>
        ${rows.map(r => `
          <tr>
            <td>${r.id}</td>
            <td>${r.a}</td>
            <td>${r.b}</td>
            <td>${r.result}</td>
            <td>${new Date(r.created_at).toLocaleString('ko-KR')}</td>
          </tr>
        `).join('')}
      </table>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}