export type QueryResultsArgs = {} & (
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
