import { Pool } from 'pg';
import env from './config';

const pool: Pool = new Pool({
	connectionString: env.DB_URI,
});

export default pool;
