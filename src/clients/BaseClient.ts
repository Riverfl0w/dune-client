import type { ZodSchema, z } from 'zod';
import DuneError from '../DuneError.js';
import ErrorResponse from '../schemas/ErrorResponse.js';

export interface CallOptions<S extends ZodSchema> extends RequestInit {
  path: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  schema: S;
  delay?: number;
}

const MAX_RATE_LIMIT_DELAY = 60000;

/**
 * Base client for Dune API. It handles the API key and error handling.
 */
export default class BaseClient {
  private readonly base = 'https://api.dune.com/api';

  constructor(private readonly apiKey: string) {}

  protected async call<S extends ZodSchema>({
    path,
    query,
    schema,
    delay = 0,
    ...options
  }: CallOptions<S>): Promise<z.infer<S>> {
    if (query) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (typeof value !== 'undefined' && value !== null) {
          searchParams.append(key, value.toString());
        }
      }

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
      if (hasError.data.error.match(/too many requests/)) {
        // We are being rate limited, so we should wait and try again
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (delay < MAX_RATE_LIMIT_DELAY) {
          const newDelay = (delay + Math.floor(Math.random() * 1000)) * 2;
          return this.call({ path, query, schema, delay: newDelay, ...options });
        }

        // If we have been waiting for more than a minute, we should throw an error
      }

      throw new DuneError(hasError.data.error);
    }

    console.log(`${options.method} ${path}`, data);
    return await schema.parseAsync(data);
  }
}
