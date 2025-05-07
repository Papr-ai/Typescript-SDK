// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_user',
  description: 'Update user details by user_id (_User.objectId) and developer association',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      external_id: {
        type: 'string',
        title: 'External Id',
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
  const { user_id, ...body } = args as any;
  return client.user.update(user_id, body);
};

export default { metadata, tool, handler };
