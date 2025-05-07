// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Papr from 'papr';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'add_batch_memory',
  description:
    "Add multiple memory items in a batch with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
  inputSchema: {
    type: 'object',
    properties: {
      memories: {
        type: 'array',
        title: 'Memories',
        description: 'List of memory items to add in batch',
        items: {
          $ref: '#/$defs/add_memory',
        },
      },
      skip_background_processing: {
        type: 'boolean',
        title: 'Skip Background Processing',
        description: 'If True, skips adding background tasks for processing',
      },
      batch_size: {
        type: 'integer',
        title: 'Batch Size',
        description: 'Number of items to process in parallel',
      },
    },
    $defs: {
      add_memory: {
        type: 'object',
        title: 'AddMemoryRequest',
        description: 'Request model for adding a new memory',
        properties: {
          content: {
            type: 'string',
            title: 'Content',
            description: 'The content of the memory item you want to add to memory',
          },
          context: {
            type: 'array',
            title: 'Context',
            description: 'Context can be conversation history or any relevant context for a memory item',
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
            description: 'Array of relationships that we can use in Graph DB (neo4J)',
            items: {
              $ref: '#/$defs/relationship_item',
            },
          },
          type: {
            $ref: '#/$defs/memory_type',
          },
        },
        required: ['content'],
      },
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
  const body = args as any;
  return client.memory.addBatch(body);
};

export default { metadata, tool, handler };
