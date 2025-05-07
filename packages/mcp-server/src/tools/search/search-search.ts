// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr';

export const metadata: Metadata = {
  resource: 'search',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'search_search',
  description:
    'Search through memories with authentication required.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Recommended Headers**:\n    ```\n    Accept-Encoding: gzip\n    ```\n    \n    The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        title: 'Query',
        description:
          "Detailed search query describing what you're looking for. For best results, write 2-3 sentences that include specific details, context, and time frame. For example: 'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.'",
      },
      max_memories: {
        type: 'integer',
        title: 'Max Memories',
        description: 'Maximum number of memories to return',
      },
      max_nodes: {
        type: 'integer',
        title: 'Max Nodes',
        description: 'Maximum number of neo nodes to return',
      },
      rank_results: {
        type: 'boolean',
        title: 'Rank Results',
        description:
          "Whether to enable additional ranking of search results. Default is false because results are already ranked when using an LLM for search (recommended approach). Only enable this if you're not using an LLM in your search pipeline and need additional result ranking.",
      },
      'Accept-Encoding': {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.search.search(body);
};

export default { metadata, tool, handler };
