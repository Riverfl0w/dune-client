import { z } from 'zod';

const CancelExecutionResponse = z.object({
  success: z.boolean(),
});
type CancelExecutionResponse = z.infer<typeof CancelExecutionResponse>;

export default CancelExecutionResponse;
