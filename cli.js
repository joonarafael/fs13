import pkg from "pg";
const { Client } = pkg;

const client = new Client({
	user: "fs13-dev",
	host: "localhost",
	database: "blogdb",
	password: "public_password_to_github",
	port: 5432,
});

client.connect();

client.query("SELECT * FROM blogs", (err, res) => {
	if (err) {
		console.error("Error executing query", err.stack);
	} else {
		res.rows.forEach((blog) => {
			console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
		});
	}
	client.end();
});
