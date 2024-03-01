import { z } from 'zod';

export type ExecutionCancelArgs = {
  execution_id: string;
};

export const ExecutionCancelResponse = z.object({
  success: z.boolean(),
});
export type ExecutionCancelResponse = z.infer<typeof ExecutionCancelResponse>;
