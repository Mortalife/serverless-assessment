import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient();

export async function generate() {
  const domains = [
    {
      domain: "www.testdomain.com",
      risk: "clean",
    },
    {
      domain: "www.malicious.com",
      risk: "malicious",
    },
  ];

  for (const { domain, risk } of domains) {
    const params: PutItemCommandInput = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        Domain: {
          S: domain,
        },
        Risk: {
          S: risk,
        },
      },
    };

    try {
      const command = new PutItemCommand(params);
      await client.send(command);
    } catch (err) {
      console.log(err);
    }
  }
}
