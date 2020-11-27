const AWS = require("aws-sdk"); // Initialize the AWS client

var sts = new AWS.STS(); // Create a new instance of STS

// Create an async function that takes in the parameter name and returns the value
const getAccountID = async function () {
  const data = await sts.getCallerIdentity({}).promise();
  return JSON.stringify(data.Account);
};

// Now we can call this function from inside another function by using the await keyword
const lambdaFunction = async () => {
  const awsAccountID = await getAccountID();
};

// Export the handler
exports.handler = async () => {
  return await lambdaFunction();
};
