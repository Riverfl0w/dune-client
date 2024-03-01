import { z } from 'zod';

export type QueryExecuteArgs = {
  query_id: string | number;
  performance?: 'medium' | 'large';
  query_parameters?: Record<string, unknown>;
};

export const QueryExecuteResponse = z
  .object({
    execution_id: z.string(),
  })
  .and(
    z.discriminatedUnion('state', [
      z.object({
        state: z.literal('QUERY_STATE_PENDING'),
      }),
      z.object({
        state: z.literal('QUERY_STATE_EXECUTING'),
      }),
    ]),
  );
export type QueryExecuteResponse = z.infer<typeof QueryExecuteResponse>;
