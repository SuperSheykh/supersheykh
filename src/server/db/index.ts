import postgres from 'postgres';

const connectionString = "YOUR_NEON_DB_CONNECTION_STRING";
const sql = postgres(connectionString);

export default sql;
