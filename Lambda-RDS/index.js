const sql = require("mssql");

const config = {
  user: "username",
  password: "password",
  server: "servername", // You can use 'localhost\\instance' to connect to named instance
  database: "database",
};

// async/await style:
const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect();

pool1.on("error", (err) => {
  // ... error handler
});

exports.handler = (event, context, callback) => {
  var today = new Date();
  var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const email = event.request.userAttributes.email;
  const verified = event.request.userAttributes.email_verified;
  const created = date;

  context.callbackWaitsForEmptyEventLoop = false;
  //The connection pool remains active so we have to set this flag to false to close the pool otherwise lambda will throw a timeout error
  async function messageHandler() {
    await pool1Connect; // ensures that the pool has been created
    try {
      const request = pool1.request(); // or: new sql.Request(pool1)
      const result = await request.query(`insert into dbo.users (email,verified,created) values ('${email}','${verified}','${created}')`);
      callback(null, event);
      return result;
    } catch (err) {
      callback(null, event);
    }
  }
  messageHandler();
};
