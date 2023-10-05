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

        return true;

    } catch(error){
        console.error("User not registered:", error.message)
        console.log('Registration Failed!');

        return false;
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

async function addTask(username, taskTxt) {
    try {
        const query = `
        INSERT INTO tasks (user_id, tasks)
        VALUES (
            (SELECT user_id FROM users WHERE username = $1),
            $2
        )
        `;
        await client.query(query, [username, taskTxt]);
        console.log('Task added successfully');
        return true;
    } catch (error) {
        console.error('Failed to add task: ', error.message);
        return false;
    }
}

async function displayTasks(username) {
    try {
        const query = `
            SELECT task_list_id, tasks FROM tasks
            WHERE user_id = (SELECT user_id FROM users WHERE username = $1)
        `;
        const result = await client.query(query, [username]);
        return result.rows;
    } catch (error) {
        console.error('Failed to fetch tasks:', error.message);
        throw error;
    }
}

async function deleteTask(username, taskListId) {
    try {
        const query = `
        DELETE FROM tasks
        WHERE user_id = (SELECT user_id FROM users WHERE username = $1)
        AND task_list_id = $2
        `;
        await client.query(query, [username, taskListId]);
        console.log('Task Deleted!');
        return true;
    } catch (error) {
        console.error('Failed to delete task: ', error.message);
        return false;
    }
}

module.exports = {
    dbConnect,
    registerUser,
    loginUser,
    addTask,
    displayTasks,
    deleteTask,
    getClient : () => client,
}
