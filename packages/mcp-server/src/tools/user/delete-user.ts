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
  name: 'delete_user',
  description: 'Delete user association with developer and the user itself by user_id (_User.objectId)',
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
  return client.user.delete(user_id);
};

export default { metadata, tool, handler };
