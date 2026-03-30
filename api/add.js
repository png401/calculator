import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const { a, b } = req.body;
  const result = Number(a) + Number(b);

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      a NUMERIC,
      b NUMERIC,
      result NUMERIC,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO logs (a, b, result) VALUES (${a}, ${b}, ${result})
  `;

  res.status(200).json({ result });
}