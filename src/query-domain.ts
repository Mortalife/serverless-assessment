import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
} from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient();

export type DomainRisk = "clean" | "malicious" | "unknown";

export async function queryDomain(domain: string): Promise<DomainRisk> {
  const params: GetItemCommandInput = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      Domain: {
        S: domain,
      },
    },
  };

  try {
    const command = new GetItemCommand(params);
    const response = await client.send(command);

    if (response.Item) {
      return response.Item.Risk.S as DomainRisk;
    }
  } catch (err) {
    console.log(err);
  }

  return "unknown";
}
