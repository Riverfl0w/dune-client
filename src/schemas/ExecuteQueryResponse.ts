import { z } from 'zod';

const ExecuteQueryResponse = z
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
type ExecuteQueryResponse = z.infer<typeof ExecuteQueryResponse>;

export default ExecuteQueryResponse;
