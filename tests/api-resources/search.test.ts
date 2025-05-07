// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from 'papr';

const client = new Papr({
  apiKey: 'My API Key',
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // skipped: tests are disabled for the time being
  test.skip('search: only required params', async () => {
    const responsePromise = client.search.search({
      query:
        'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('search: required and optional params', async () => {
    const response = await client.search.search({
      query:
        'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.',
      max_memories: 1,
      max_nodes: 1,
      rank_results: true,
      'Accept-Encoding': 'Accept-Encoding',
    });
  });
});
