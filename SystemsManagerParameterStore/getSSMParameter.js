const AWS = require("aws-sdk"); // Initialize the AWS client

var ssm = new AWS.SSM({ region: "us-east-1" }); // Create a new instance of SSM and pass the region into the constructor

// Create an async function that takes in the parameter name and returns the value
const getParameter = async function (parameterName) {
  const data = await ssm.getParameter({ Name: parameterName, WithDecryption: true }).promise();
  return data.Parameter.Value;
};

// Now we can call this function from inside another function by using the await keyword
const lambdaFunction = async () => {
  const adminPassword = await getParameter(`path/adminPassword`);
};

// Export the handler
exports.handler = async () => {
  return await lambdaFunction();
};
