// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Document extends APIResource {
  /**
   * Upload a document (PDF/HTML/TXT) to be processed and added to memory.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Required Headers**:
   *     - Content-Type: multipart/form-data
   *     - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
   *
   *     **Form Data**:
   *     - file: The document file to upload (PDF/HTML/TXT)
   *     - metadata: (optional) JSON string containing additional metadata
   */
  upload(
    params: DocumentUploadParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentUploadResponse> {
    const { post_objectId, skip_background_processing } = params ?? {};
    return this._client.post('/v1/document', {
      query: { post_objectId, skip_background_processing },
      ...options,
    });
  }
}

/**
 * Unified response model for document upload status (success or error).
 */
export interface DocumentUploadResponse {
  /**
   * 0.0 to 1.0 for percentage
   */
  progress: number;

  /**
   * HTTP status code
   */
  code?: number;

  current_filename?: string | null;

  current_page?: number | null;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * Human-readable status message
   */
  message?: string | null;

  /**
   * 'success', 'processing', 'error', etc.
   */
  status?: string;

  /**
   * Processing status type
   */
  status_type?: 'processing' | 'completed' | 'failed' | 'not_found' | 'queued' | 'cancelled' | null;

  total_pages?: number | null;

  upload_id?: string | null;
}

export interface DocumentUploadParams {
  /**
   * Optional Post objectId for updating status
   */
  post_objectId?: string | null;

  /**
   * If True, skips adding background tasks for processing
   */
  skip_background_processing?: boolean;
}

export declare namespace Document {
  export {
    type DocumentUploadResponse as DocumentUploadResponse,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
