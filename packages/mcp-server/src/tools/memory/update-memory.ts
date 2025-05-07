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
  name: 'update_memory',
  description:
    "Update an existing memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
  inputSchema: {
    type: 'object',
    properties: {
      memory_id: {
        type: 'string',
        title: 'Memory Id',
      },
      content: {
        type: 'string',
        title: 'Content',
        description: 'The new content of the memory item',
      },
      context: {
        type: 'array',
        title: 'Context',
        description: 'Updated context for the memory item',
        items: {
          $ref: '#/$defs/context_item',
        },
      },
      metadata: {
        $ref: '#/$defs/memory_metadata',
      },
      relationships_json: {
        type: 'array',
        title: 'Relationships Json',
        description: 'Updated relationships for Graph DB (neo4J)',
        items: {
          $ref: '#/$defs/relationship_item',
        },
      },
      type: {
        $ref: '#/$defs/memory_type',
      },
    },
    $defs: {
      context_item: {
        type: 'object',
        title: 'ContextItem',
        description: 'Context item for memory request',
        properties: {
          content: {
            type: 'string',
            title: 'Content',
          },
          role: {
            type: 'string',
            title: 'Role',
            enum: ['user', 'assistant'],
          },
        },
        required: ['content', 'role'],
      },
      memory_metadata: {
        type: 'object',
        title: 'MemoryMetadata',
        description: 'Metadata for memory request',
        properties: {
          conversationId: {
            type: 'string',
            title: 'Conversationid',
          },
          createdAt: {
            type: 'string',
            title: 'Createdat',
          },
          'emoji tags': {
            type: 'string',
            title: 'Emoji Tags',
          },
          'emotion tags': {
            type: 'string',
            title: 'Emotion Tags',
          },
          hierarchical_structures: {
            type: 'string',
            title: 'Hierarchical Structures',
            description: 'Hierarchical structures to enable navigation from broad topics to specific ones',
          },
          location: {
            type: 'string',
            title: 'Location',
          },
          role_read_access: {
            type: 'array',
            title: 'Role Read Access',
            items: {
              type: 'string',
            },
          },
          role_write_access: {
            type: 'array',
            title: 'Role Write Access',
            items: {
              type: 'string',
            },
          },
          sourceUrl: {
            type: 'string',
            title: 'Sourceurl',
          },
          topics: {
            type: 'string',
            title: 'Topics',
          },
          user_read_access: {
            type: 'array',
            title: 'User Read Access',
            items: {
              type: 'string',
            },
          },
          user_write_access: {
            type: 'array',
            title: 'User Write Access',
            items: {
              type: 'string',
            },
          },
          workspace_read_access: {
            type: 'array',
            title: 'Workspace Read Access',
            items: {
              type: 'string',
            },
          },
          workspace_write_access: {
            type: 'array',
            title: 'Workspace Write Access',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      relationship_item: {
        type: 'object',
        title: 'RelationshipItem',
        description: 'Relationship item for memory request',
        properties: {
          related_item_id: {
            type: 'string',
            title: 'Related Item Id',
            enum: ['TextMemoryItem', 'previous_memory_item_id'],
          },
          related_item_type: {
            type: 'string',
            title: 'Related Item Type',
            enum: ['TextMemoryItem'],
          },
          relation_type: {
            type: 'string',
            title: 'Relation Type',
          },
          metadata: {
            type: 'object',
            title: 'Metadata',
          },
        },
        required: ['related_item_id', 'related_item_type', 'relation_type'],
      },
      memory_type: {
        type: 'string',
        title: 'MemoryType',
        description: 'Valid memory types',
        enum: ['text', 'code_snippet', 'document'],
      },
    },
  },
};

export const handler = (client: Papr, args: Record<string, unknown> | undefined) => {
  const { memory_id, ...body } = args as any;
  return client.memory.update(memory_id, body);
};

export default { metadata, tool, handler };
