import ExecutionClient from './clients/ExecutionClient.js';
import QueryClient from './clients/QueryClient.js';
import type { QueryRefreshArgs } from './schemas/QueryRefresh.js';

/**
 * Public API client for Dune Analytics. It contains the following sub-clients:
 * - `execution` for managing query executions
 * - `query` for querying the results of a query
 */
export default class DuneClient {
  readonly execution: ExecutionClient;
  readonly query: QueryClient;

  constructor(apiKey: string) {
    this.execution = new ExecutionClient(apiKey);
    this.query = new QueryClient(apiKey);
  }

  /**
   * Convenience method to refresh the results of a query.
   * It will wait for the query to finish and return the results.
   */
  async refresh({ cooldown = 500, limit, offset, ...args }: QueryRefreshArgs) {
    const { execution_id } = await this.query.execute(args);

    // Simple polling loop to wait for the query to finish
    for (;;) {
      const { state } = await this.execution.status({ execution_id });

      if (state === 'QUERY_STATE_PENDING' || state === 'QUERY_STATE_EXECUTING') {
        await new Promise((resolve) => setTimeout(resolve, cooldown));
        continue;
      }

      break;
    }

    return await this.execution.results({ execution_id, limit, offset });
  }
}
