// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from 'papr';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

import create_user from './user/create-user';
import update_user from './user/update-user';
import list_user from './user/list-user';
import delete_user from './user/delete-user';
import get_user from './user/get-user';
import update_memory from './memory/update-memory';
import delete_memory from './memory/delete-memory';
import add_memory from './memory/add-memory';
import add_batch_memory from './memory/add-batch-memory';
import get_memory from './memory/get-memory';
import upload_document from './document/upload-document';
import search_search from './search/search-search';

export type HandlerFunction = (client: Papr, args: Record<string, unknown> | undefined) => Promise<any>;

export type Metadata = {
  resource: string;
  operation: 'read' | 'write';
  tags: string[];
};

export type Endpoint = {
  metadata: Metadata;
  tool: Tool;
  handler: HandlerFunction;
};

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_user);
addEndpoint(update_user);
addEndpoint(list_user);
addEndpoint(delete_user);
addEndpoint(get_user);
addEndpoint(update_memory);
addEndpoint(delete_memory);
addEndpoint(add_memory);
addEndpoint(add_batch_memory);
addEndpoint(get_memory);
addEndpoint(upload_document);
addEndpoint(search_search);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  if (unmatchedFilters.size > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${[...unmatchedFilters]
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
