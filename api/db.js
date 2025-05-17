import mysql from 'mysql';

// Create a connection to the database
export const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username if different
    password: "12345678Kushagra", // Replace with your MySQL password
    database: "circleup_db"
});

// Optional: Log connection success or failure
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Successfully connected to the database as id ' + db.threadId);
});

