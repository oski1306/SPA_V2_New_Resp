const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "spaV2"
});

async function dbConnect(){
    try{
        await client.connect();
        console.log("Connected to database");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function registerUser(username, email, password){
    try {
        const query = `
              INSERT INTO users (username, email, password)
              VALUES ($1, $2, $3)
        `;
        await client.query(query, [username, email, password]);
        console.log("Registration Successfull!");
    } catch(error){
        console.error("User not registered:", error.message)
        console.log('Registration Failed!');
    }
}

async function loginUser(username,password){
    try{
        const query = `
        SELECT * FROM users
        WHERE username = $1 AND password = $2
        `;
        const response = await client.query(query, [username, password]);

        if (response.rows.length === 1){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Cannot Log In:', error.message);
        return false;
    }
}

module.exports = {
    dbConnect,
    registerUser,
    loginUser,
    getClient : () => client,
}
