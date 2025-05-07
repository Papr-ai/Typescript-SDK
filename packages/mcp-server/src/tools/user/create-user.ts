// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr-python-sdk';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_user',
  description: 'Create a new user or link existing user to developer',
  inputSchema: {
    type: 'object',
    properties: {
      external_id: {
        type: 'string',
        title: 'External Id',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      type: {
        $ref: '#/$defs/user_type',
      },
    },
    $defs: {
      user_type: {
        type: 'string',
        title: 'UserType',
        enum: ['developerUser', 'user', 'agent'],
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.user.create(body);
};

export default { metadata, tool, handler };
