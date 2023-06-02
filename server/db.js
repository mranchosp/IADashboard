import { createPool } from "mariadb";

const pool = createPool({
  host: "localhost",
  user: "dbia",
  password: "S0p0rt3",
  database: "IA",
  connectionLimit: 20,
});

export default pool;
export const connectDB = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("MariaDB connected!");
    console.log(conn.threadId);
  } catch (error) {
      console.error(error);
  }
};
