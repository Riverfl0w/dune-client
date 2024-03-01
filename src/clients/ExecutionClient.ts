import { ExecutionCancelResponse } from '../schemas/ExecutionCancel.js';
import { type ExecutionResultsArgs, ExecutionResultsResponse } from '../schemas/ExecutionResults.js';
import { type ExecutionStatusArgs, ExecutionStatusResponse } from '../schemas/ExecutionStatus.js';
import BaseClient from './BaseClient.js';

/**
 * Dune API client for execution-related endpoints.
 */
export default class ExecutionClient extends BaseClient {
  /**
   * Get the status of an execution.
   * @see https://dune.com/docs/api/api-reference/get-results/execution-status/
   */
  status({ execution_id }: ExecutionStatusArgs) {
    return this.call({
      method: 'GET',
      path: `/v1/execution/${execution_id}/status`,
      schema: ExecutionStatusResponse,
    });
  }

  /**
   * Cancel an execution.
   * @see https://dune.com/docs/api/api-reference/execute-queries/cancel-execution/
   */
  cancel({ execution_id }: ExecutionStatusArgs) {
    return this.call({
      method: 'POST',
      path: `/v1/execution/${execution_id}/cancel`,
      schema: ExecutionCancelResponse,
    });
  }

  /**
   * Get the results of an execution.
   * @see https://dune.com/docs/api/api-reference/get-results/execution-status/
   */
  results({ execution_id, ...options }: ExecutionResultsArgs) {
    return this.call({
      method: 'GET',
      path: `/v1/execution/${execution_id}/results`,
      query: options,
      schema: ExecutionResultsResponse,
    });
  }
}
