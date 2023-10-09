import { expect, it, describe, afterEach, vi } from "vitest";
import * as queryDomain from "./src/query-domain";
import { domainTest } from "./handler";

describe("testing handler", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("it should return the correct response formatting", async () => {
    const spy = vi.spyOn(queryDomain, "queryDomain");
    spy.mockImplementation(() =>
      Promise.resolve("clean" as unknown as queryDomain.DomainRisk)
    );

    const output = await domainTest({
      body: '{"domain":"www.testdomain.com"}',
    } as any);

    expect(output).toStrictEqual({
      statusCode: 200,
      body: '{\n  "risk": "clean"\n}',
    });
  });
});
