// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr-python-sdk';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_memory',
  description:
    "Delete a memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')",
  inputSchema: {
    type: 'object',
    properties: {
      memory_id: {
        type: 'string',
        title: 'Memory Id',
      },
      skip_parse: {
        type: 'boolean',
        title: 'Skip Parse',
        description: 'Skip Parse Server deletion',
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const { memory_id, ...body } = args as any;
  return client.memory.delete(memory_id, body);
};

export default { metadata, tool, handler };
