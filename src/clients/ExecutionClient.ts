import CancelExecutionResponse from '../schemas/CancelExecutionResponse.js';
import type ExecutionResultsArgs from '../schemas/ExecutionResultsArgs.js';
import ExecutionResultsResponse from '../schemas/ExecutionResultsResponse.js';
import type ExecutionStatusArgs from '../schemas/ExecutionStatusArgs.js';
import ExecutionStatusResponse from '../schemas/ExecutionStatusResponse.js';
import BaseClient from './BaseClient.js';

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
      schema: CancelExecutionResponse,
    });
  }

  /**
   * Get the results of an execution.
   * @see https://dune.com/docs/api/api-reference/get-results/execution-status/
   */
  results({ execution_id }: ExecutionResultsArgs) {
    return this.call({
      method: 'GET',
      path: `/v1/execution/${execution_id}/results`,
      schema: ExecutionResultsResponse,
    });
  }
}
