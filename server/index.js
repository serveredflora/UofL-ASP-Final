const express = require("express");
const path = require("path");
const mariadb = require("mariadb");

const app = express();
const port = 8000;

async function asyncFunction() {
	// Requires 'mariadb' to be installed and running on the server
	const conn = await mariadb.createConnection({});

	try {
		const res = await conn.query("select 1", [2]);
		console.log(res); // [{ "1": 1 }]
		return res;
	} finally {
		conn.end();
	}
}

// asyncFunction();

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/test", (req, res) => {
	res.send({
		data: "example data being sent via express",
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
