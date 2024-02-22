import type ExecuteQueryArgs from '../schemas/ExecuteQueryArgs.js';
import ExecuteQueryResponse from '../schemas/ExecuteQueryResponse.js';
import ExecutionResultsResponse from '../schemas/ExecutionResultsResponse.js';
import BaseClient from './BaseClient.js';

export interface ResultsOptions {
  query_id: string | number;
  ignore_max_datapoints_per_request?: boolean;
}

export default class QueryClient extends BaseClient {
  /**
   * Execute am existing Dune query.
   * @see https://dune.com/docs/api/api-reference/execute-queries/execute-query-id/
   */
  execute({ query_id, ...options }: ExecuteQueryArgs) {
    return this.call({
      method: 'POST',
      path: `/v1/query/${query_id}/execute`,
      schema: ExecuteQueryResponse,
      body: JSON.stringify(options),
    });
  }

  /**
   * Get the latedst results of a Dune query. This method does NOT execute the query.
   * @see https://dune.com/docs/api/api-reference/get-results/latest-results/
   */
  results({ query_id, ignore_max_datapoints_per_request }: ResultsOptions) {
    const searchParams = new URLSearchParams();
    if (ignore_max_datapoints_per_request) {
      searchParams.set('ignore_max_datapoints_per_request', 'true');
    }

    return this.call({
      method: 'GET',
      path: `/v1/query/${query_id}/results`,
      searchParams,
      schema: ExecutionResultsResponse,
    });
  }
}
