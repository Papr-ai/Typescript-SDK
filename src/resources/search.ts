// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MemoryAPI from './memory';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search through memories with authentication required.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Recommended Headers**:
   *     ```
   *     Accept-Encoding: gzip
   *     ```
   *
   *     The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.
   *
   * @example
   * ```ts
   * const searchResponse = await client.search.search({
   *   query:
   *     'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.',
   * });
   * ```
   */
  search(params: SearchSearchParams, options?: RequestOptions): APIPromise<MemoryAPI.SearchResponse> {
    const { max_memories, max_nodes, 'Accept-Encoding': acceptEncoding, ...body } = params;
    return this._client.post('/v1/search', {
      query: { max_memories, max_nodes },
      body,
      ...options,
      headers: buildHeaders([
        { ...(acceptEncoding != null ? { 'Accept-Encoding': acceptEncoding } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface SearchSearchParams {
  /**
   * Body param: Detailed search query describing what you're looking for. For best
   * results, write 2-3 sentences that include specific details, context, and time
   * frame. For example: 'Find recurring customer complaints about API performance
   * from the last month. Focus on issues where customers specifically mentioned
   * timeout errors or slow response times in their conversations.'
   */
  query: string;

  /**
   * Query param: Maximum number of memories to return
   */
  max_memories?: number;

  /**
   * Query param: Maximum number of neo nodes to return
   */
  max_nodes?: number;

  /**
   * Body param: Whether to enable additional ranking of search results. Default is
   * false because results are already ranked when using an LLM for search
   * (recommended approach). Only enable this if you're not using an LLM in your
   * search pipeline and need additional result ranking.
   */
  rank_results?: boolean;

  /**
   * Header param: Recommended to use 'gzip' for response compression
   */
  'Accept-Encoding'?: string;
}

export declare namespace Search {
  export { type SearchSearchParams as SearchSearchParams };
}
