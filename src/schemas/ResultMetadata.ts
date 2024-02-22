import { z } from 'zod';

const ResultMetadata = z.object({
  column_names: z.array(z.string()),
  result_set_bytes: z.number().int().nonnegative(),
  total_row_count: z.number().int().nonnegative(),
  datapoint_count: z.number().int().nonnegative(),
  pending_time_millis: z.number().int().nonnegative(),
  execution_time_millis: z.number().int().nonnegative(),
});
type ResultMetadata = z.infer<typeof ResultMetadata>;

export default ResultMetadata;
