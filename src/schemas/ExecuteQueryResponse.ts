import { z } from 'zod';

const ExecuteQueryResponse = z.object({
  execution_id: z.string(),
  state: z.literal('QUERY_STATE_PENDING'),
});
type ExecuteQueryResponse = z.infer<typeof ExecuteQueryResponse>;

export default ExecuteQueryResponse;
