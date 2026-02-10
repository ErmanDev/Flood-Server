import { getConnection } from './db';
import bcrypt from 'bcryptjs';

export const initTables = async () => {
  const connection = getConnection();
  
  try {
    // Users table only - this server handles authentication and user management
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        _id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        phone VARCHAR(255),
        address TEXT,
        "profileImage" TEXT,
        status VARCHAR(50) DEFAULT 'Pending Verification' CHECK (status IN ('Verified', 'Pending Verification', 'Rejected')),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create trigger for updatedAt
    await connection.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
    
    await connection.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
    
    // Insert default admin user if not exists
    const defaultPasswordHash = bcrypt.hashSync('admin123', 10);
    
    const result = await connection.query(
      'SELECT _id FROM users WHERE email = $1',
      ['admin@gmail.com']
    );
    
    if (result.rows.length === 0) {
      await connection.query(`
        INSERT INTO users (_id, username, email, password, "firstName", "lastName", phone, address, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        '1',
        'Admin',
        'admin@gmail.com',
        defaultPasswordHash,
        'System',
        'Admin',
        '123-456-7890',
        '123 Admin St, City, Country',
        'Verified'
      ]);
      console.log('Default admin user created');
    }
    
    console.log('Database tables initialized successfully (Users table only)');
  } catch (error: any) {
    console.error('Error initializing database tables:', error.message);
    throw error;
  }
};
