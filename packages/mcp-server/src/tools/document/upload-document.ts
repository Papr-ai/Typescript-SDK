// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr-python-sdk';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'upload_document',
  description:
    "Upload a document (PDF/HTML/TXT) to be processed and added to memory.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: multipart/form-data\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    **Form Data**:\n    - file: The document file to upload (PDF/HTML/TXT)\n    - metadata: (optional) JSON string containing additional metadata",
  inputSchema: {
    type: 'object',
    properties: {
      post_objectId: {
        type: 'string',
        title: 'Post Objectid',
        description: 'Optional Post objectId for updating status',
      },
      skip_background_processing: {
        type: 'boolean',
        title: 'Skip Background Processing',
        description: 'If True, skips adding background tasks for processing',
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.document.upload(body);
};

export default { metadata, tool, handler };
