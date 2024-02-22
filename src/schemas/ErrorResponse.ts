import { z } from 'zod';

const ErrorResponse = z.object({
  error: z.string(),
});
type ErrorResponse = z.infer<typeof ErrorResponse>;

export default ErrorResponse;
