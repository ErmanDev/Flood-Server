const https = require('https');

const url = 'https://flood-backend-7rfe.onrender.com/api/users';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const users = JSON.parse(data);
            console.log('--- Users on Server ---');
            if (Array.isArray(users)) {
                users.forEach(user => {
                    console.log(`ID: ${user._id} | Username: ${user.username} | Email: ${user.email} | Name: ${user.firstName} ${user.lastName} | Status: ${user.status}`);
                });
                console.log(`Total Users: ${users.length}`);
            } else {
                console.log('Error: Response is not an array');
                console.log(users);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw data:', data);
        }
    });

}).on('error', (err) => {
    console.error('Error with request:', err.message);
});
