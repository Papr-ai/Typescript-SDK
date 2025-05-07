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
  name: 'get_user',
  description: 'Get user details by user_id (_User.objectId) and developer association',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const { user_id, ...body } = args as any;
  return client.user.get(user_id);
};

export default { metadata, tool, handler };
