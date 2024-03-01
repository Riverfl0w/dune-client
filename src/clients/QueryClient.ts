import { ExecutionResultsResponse } from '../schemas/ExecutionResults.js';
import { type QueryExecuteArgs, QueryExecuteResponse } from '../schemas/QueryExecute.js';
import BaseClient from './BaseClient.js';

export interface ResultsOptions {
  query_id: string | number;
  ignore_max_datapoints_per_request?: boolean;
}

/**
 * Dune API client for query-related endpoints.
 */
export default class QueryClient extends BaseClient {
  /**
   * Execute am existing Dune query.
   * @see https://dune.com/docs/api/api-reference/execute-queries/execute-query-id/
   */
  execute({ query_id, ...options }: QueryExecuteArgs) {
    return this.call({
      method: 'POST',
      path: `/v1/query/${query_id}/execute`,
      schema: QueryExecuteResponse,
      body: JSON.stringify(options),
    });
  }

  /**
   * Get the latest results of a Dune query. This method does NOT execute the query.
   * @see https://dune.com/docs/api/api-reference/get-results/latest-results/
   */
  results({ query_id, ...options }: ResultsOptions) {
    return this.call({
      method: 'GET',
      path: `/v1/query/${query_id}/results`,
      query: options,
      schema: ExecutionResultsResponse,
    });
  }
}
