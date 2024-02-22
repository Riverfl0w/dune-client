import { z } from 'zod';
import ResultMetadata from './ResultMetadata.js';

const ExecutionResultsResponse = z
  .object({
    execution_id: z.string(),
    query_id: z.number(),
    is_execution_finished: z.boolean(),
  })
  .and(
    z.discriminatedUnion('state', [
      z.object({
        state: z.literal('QUERY_STATE_FAILED'),
        submitted_at: z.string().datetime(),
        expires_at: z.string().datetime(),
        execution_started_at: z.string().datetime(),
        execution_ended_at: z.string().datetime(),
        error: z.object({
          type: z.string(),
          message: z.string(),
          metadata: z.record(z.unknown()),
        }),
      }),
      z.object({
        state: z.literal('QUERY_STATE_COMPLETED'),
        submitted_at: z.string().datetime(),
        expires_at: z.string().datetime(),
        execution_started_at: z.string().datetime(),
        execution_ended_at: z.string().datetime(),
        result: z.object({
          rows: z.array(z.record(z.unknown())),
          metadata: ResultMetadata,
        }),
      }),
      z.object({
        state: z.literal('QUERY_STATE_CANCELLED'),
        submitted_at: z.string().datetime(),
        expires_at: z.string().datetime(),
        cancelled_at: z.string().datetime(),
      }),
      z.object({
        state: z.literal('QUERY_STATE_EXPIRED'),
        // TODO: Add more fields
      }),
    ]),
  );
export type ExecutionResultResponse = z.infer<typeof ExecutionResultsResponse>;

export default ExecutionResultsResponse;
