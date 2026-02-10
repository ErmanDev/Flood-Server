import { Pool } from 'pg';

let pool: Pool;

export const createConnection = () => {
  // Supabase provides DATABASE_URL or individual connection params
  // Supabase requires SSL for all connections
  if (process.env.DATABASE_URL) {
    console.log('Using DATABASE_URL connection string');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // Supabase requires SSL
    });
  } else {
    // Check if connecting to Supabase (host contains supabase.co or pooler.supabase.com)
    const isSupabase = process.env.DB_HOST?.includes('supabase.co') || 
                       process.env.DB_HOST?.includes('pooler.supabase.com');
    
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '5432');
    const user = process.env.DB_USER || 'postgres';
    const database = process.env.DB_NAME || 'postgres';
    
    console.log(`Connecting to: ${user}@${host}:${port}/${database}`);
    
    pool = new Pool({
      host: host,
      port: port,
      user: user,
      password: process.env.DB_PASSWORD || '',
      database: database,
      ssl: isSupabase ? { rejectUnauthorized: false } : false // Supabase requires SSL
    });
  }
  
  console.log('PostgreSQL Database connected (Supabase)');
  return pool;
};

export const getConnection = () => {
  if (!pool) {
    createConnection();
  }
  return pool;
};

export default createConnection;
