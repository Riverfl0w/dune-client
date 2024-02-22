import { z } from 'zod';
import ResultMetadata from './ResultMetadata.js';

const ExecutionStatusResponse = z
  .object({
    execution_id: z.string(),
    query_id: z.number(),
    is_execution_finished: z.boolean(),
  })
  .and(
    z.discriminatedUnion('state', [
      z.object({
        state: z.literal('QUERY_STATE_PENDING'),
        queue_position: z.number().int().nonnegative().optional(),
        submitted_at: z.string().datetime(),
      }),
      z.object({
        state: z.literal('QUERY_STATE_EXECUTING'),
        submitted_at: z.string().datetime(),
        execution_started_at: z.string().datetime(),
      }),
      z.object({
        state: z.literal('QUERY_STATE_FAILED'),
        submitted_at: z.string().datetime(),
        expires_at: z.string().datetime(),
        execution_started_at: z.string().datetime(),
        execution_ended_at: z.string().datetime(),
      }),
      z.object({
        state: z.literal('QUERY_STATE_COMPLETED'),
        submitted_at: z.string().datetime(),
        expires_at: z.string().datetime(),
        execution_started_at: z.string().datetime(),
        execution_ended_at: z.string().datetime(),
        result_metadata: ResultMetadata,
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
export type ExecutionStatusResponse = z.infer<typeof ExecutionStatusResponse>;

export type ExecutionStatus = ExecutionStatusResponse['state'];

export default ExecutionStatusResponse;
