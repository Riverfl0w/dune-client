import type { ZodSchema, z } from 'zod';
import DuneError from '../DuneError.js';
import ErrorResponse from '../schemas/ErrorResponse.js';

export interface CallOptions<S extends ZodSchema> extends RequestInit {
  path: string;
  searchParams?: URLSearchParams;
  schema: S;
}

/**
 * Base client for Dune API. It handles the API key and error handling.
 */
export default class BaseClient {
  private readonly base = 'https://api.dune.com/api';

  constructor(private readonly apiKey: string) {}

  protected async call<S extends ZodSchema>({
    path,
    searchParams,
    schema,
    ...options
  }: CallOptions<S>): Promise<z.infer<S>> {
    if (searchParams) {
      const search = searchParams.toString();

      if (search.length > 0) {
        path += `?${search}`;
      }
    }

    const response = await fetch(`${this.base}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        'x-dune-api-key': this.apiKey,
      },
    });
    const data = await response.json();

    const hasError = await ErrorResponse.safeParseAsync(data);
    if (hasError.success) {
      throw new DuneError(hasError.data.error);
    }

    // console.log(`${options.method} ${path}`, data);
    return await schema.parseAsync(data);
  }
}
