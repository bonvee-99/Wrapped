const Pool = require("pg").Pool;
import env from "dotenv";
env.config();

export default new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});
