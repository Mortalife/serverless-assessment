import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayRequestAuthorizerEvent,
  APIGatewaySimpleAuthorizerResult,
} from "aws-lambda";
import { queryDomain } from "./src/query-domain";
import { generate } from "./src/generate-domains";

interface Body {
  domain: string;
}

function respond400(message: string) {
  return {
    statusCode: 400,
    body: JSON.stringify(
      {
        message,
      },
      null,
      2
    ),
  };
}

export const domainTest = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event.body);

  if (!event.body) {
    return respond400("Missing body, expects {domain: string}");
  }

  const body: Body = JSON.parse(event.body);

  if (!body.domain) {
    return respond400("Missing body, expects {domain: string}");
  }

  const risk = await queryDomain(body.domain);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        risk,
      },
      null,
      2
    ),
  };
};

export const generateTestDocs = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await generate();
  } catch (e) {
    console.log(e);
  }

  return {
    statusCode: 200,
    body: "",
  };
};

export const auth = async (
  event: APIGatewayRequestAuthorizerEvent
): Promise<APIGatewaySimpleAuthorizerResult> => {
  const secret = "secret";
  if (event.headers?.authorization === `Bearer ${secret}`) {
    console.log("Authorized");
    return {
      isAuthorized: true,
    };
  }
  console.log("Not Authorized");

  return {
    isAuthorized: false,
  };
};
