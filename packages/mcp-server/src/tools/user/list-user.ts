// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr-python-sdk';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_user',
  description: 'List users for a developer',
  inputSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        title: 'Email',
      },
      external_id: {
        type: 'string',
        title: 'External Id',
      },
      page: {
        type: 'integer',
        title: 'Page',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.user.list(body);
};

export default { metadata, tool, handler };
