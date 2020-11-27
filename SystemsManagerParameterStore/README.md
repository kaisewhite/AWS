## Accessing SSM Parameters in NodeJS

How to access the AWS Parameter in Systems Manager from Lambda using NodeJS

### Calling the getParameter operation

Quick Example:

```
var params = {
  Name: 'STRING_VALUE', /* required */
  WithDecryption: true || false
};
ssm.getParameter(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

## Steps

1. Initialize the AWS client

```
const AWS = require("aws-sdk");
```

2. Create a new instance of SSM and pass the region into the constructor

```
  var ssm = new AWS.SSM({ region: "us-east-1" });
```

3. Create an async function that takes in the parameter name and returns the value

```
const getParameter = async function (parameterName) {
  const data = await ssm.getParameter({ Name: parameterName, WithDecryption: true }).promise();
  return data.Parameter.Value;
};
```

4. Now we can call this function by using the await keyword

```
const adminPassword = await getParameter("path/adminpassword")
```

## Reference

[https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html#getParameter-property]
