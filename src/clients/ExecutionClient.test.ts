import { beforeEach, describe, expect, it } from 'vitest';
import DuneClient from '../DuneClient.js';

describe('ExecutionClient', () => {
  let client: DuneClient;

  beforeEach(() => {
    const apiKey = process.env['DUNE_API_KEY'];
    if (!apiKey) {
      throw new Error('DUNE_API_KEY is not set');
    }

    client = new DuneClient(apiKey);
  });

  describe('cancel', () => {
    it('should get last results of "Last DEX trade USD amount" query', async () => {
      const { execution_id } = await client.query.execute({ query_id: 3479420 });
      const { success } = await client.execution.cancel({ execution_id });
      expect(success).toBe(true);

      const { state } = await client.execution.status({ execution_id });
      expect(state).toBe('QUERY_STATE_CANCELLED');
    }, 60_000);
  });
});
