const https = require('https');

const baseUrl = 'https://flood-backend-7rfe.onrender.com';

function request(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, baseUrl);
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runDiagnostics() {
    console.log('--- Starting Server Diagnostics ---\n');

    // 1. Root Check
    try {
        const root = await request('GET', '/');
        console.log(`GET / : Status ${root.status}`);
        console.log('Response:', root.body);
    } catch (e) {
        console.log('GET / Failed:', e.message);
    }

    // 2. Health Check
    try {
        const health = await request('GET', '/api/health');
        console.log(`\nGET /api/health : Status ${health.status}`);
        console.log('Response:', health.body);
    } catch (e) {
        console.log('GET /api/health Failed:', e.message);
    }

    // 3. Admin Login Check
    try {
        const login = await request('POST', '/api/auth/login', {
            email: 'admin@gmail.com',
            password: 'admin123'
        });
        console.log(`\nPOST /api/auth/login (Admin) : Status ${login.status}`);
        console.log('Response:', login.body);
    } catch (e) {
        console.log('POST /api/auth/login Failed:', e.message);
    }

    // 4. Register Check
    const testUser = {
        username: 'TestUser_' + Math.floor(Math.random() * 1000),
        email: `test_${Math.floor(Math.random() * 1000)}@example.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        address: '123 Test St'
    };

    try {
        const register = await request('POST', '/api/auth/register', testUser);
        console.log(`\nPOST /api/auth/register : Status ${register.status}`);
        console.log('Response:', register.body);
    } catch (e) {
        console.log('POST /api/auth/register Failed:', e.message);
    }

    // 5. Users List Check (re-try)
    try {
        const users = await request('GET', '/api/users');
        console.log(`\nGET /api/users : Status ${users.status}`);
        console.log('Response:', users.body.substring(0, 200) + '...');
    } catch (e) {
        console.log('GET /api/users Failed:', e.message);
    }
}

runDiagnostics();
