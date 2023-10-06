In order to run the application locally: 

1.npm run devStart

2. Change const client in usersDB.js to this:

const client = new Client({
    host: "Your Database Host",
    user: "Your Username",
    port: Port You Are Using In Postgresql,
    password: "Your Postgresql Password",
    database: "Your Postgresql Database Name"
});

3. Create tables in your database using these queries: 


CREATE TABLE users (
    user_id serial PRIMARY KEY,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT test UNIQUE (email, username)
);

CREATE TABLE tasks (
    task_list_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tasks VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
