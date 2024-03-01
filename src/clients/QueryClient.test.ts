import { beforeEach, describe, expect, it } from 'vitest';
import DuneClient from '../DuneClient.js';

describe('QueryClient', () => {
  let client: DuneClient;

  beforeEach(() => {
    const apiKey = process.env['DUNE_API_KEY'];
    if (!apiKey) {
      throw new Error('DUNE_API_KEY is not set');
    }

    client = new DuneClient(apiKey);
  });

  describe('results', () => {
    it('should get last results of "Last DEX trade USD amount" query', async () => {
      const results = await client.query.results({ query_id: 3479382 });

      expect(results.state).toBe('QUERY_STATE_COMPLETED');
      if (results.state === 'QUERY_STATE_COMPLETED') {
        expect(results.result.rows).toBeDefined();
      }
    }, 60_000);
  });
});
