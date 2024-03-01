import type { QueryExecuteArgs } from './QueryExecute.js';

export type QueryRefreshArgs = QueryExecuteArgs & {
  cooldown?: number;
  limit?: number;
  offset?: number;
  sample_count?: number;
} & (
    | {
        limit?: number;
        offset?: number;
        sample_count?: never;
      }
    | {
        limit?: never;
        offset?: never;
        sample_count?: number;
      }
  );
