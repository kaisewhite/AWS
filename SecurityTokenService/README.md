## Using STS to access your AWS AccountID

How to access your AWS AccountID inside of a lambda function

### To get details about the current IAM identity

Example:

The **aws sts get-caller-identity** example displays information about the IAM identity used to authenticate the request. The caller is an IAM user.

Output:

```
{
    "UserId": "AIDASAMPLEUSERID",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/DevAdmin"
}
```

## Steps

1. Initialize the AWS client

```
const AWS = require("aws-sdk");
```

2. Create a new instance of STS

```
var sts = new AWS.STS();
```

3. Create an async function that calls STS and returns the the accountID

```
const getAccountID = async function () {
  const data = await sts.getCallerIdentity({}).promise();
  return JSON.stringify(data.Account);
};
```

4. Now we can call this function by using the await keyword

```
  const awsAccountID = await getAccountID();
```

## Reference

[https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html]
