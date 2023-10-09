import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { expect, it, describe, afterEach, vi, beforeEach } from "vitest";
import { queryDomain } from "./query-domain";

vi.mock("@aws-sdk/client-dynamodb", async () => {
  const DynamoDBClient = vi.fn();
  DynamoDBClient.prototype.send = vi.fn();
  const actual = await vi.importActual("@aws-sdk/client-dynamodb");
  return {
    ...(actual as any),
    DynamoDBClient,
  };
});

describe("testing handler", () => {
  let client;
  beforeEach(() => {
    client = new DynamoDBClient();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return unknown if the database does not contain the domain", async () => {
    client.send.mockResolvedValueOnce({ Item: null });

    const output = await queryDomain("www.testdomain.com");

    expect(output).toBe("unknown");
  });
});
