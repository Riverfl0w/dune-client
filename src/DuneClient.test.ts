import { beforeEach, describe, expect, it } from 'vitest';
import DuneClient from './DuneClient.js';

describe('DuneClient', () => {
  let client: DuneClient;

  beforeEach(() => {
    const apiKey = process.env['DUNE_API_KEY'];
    if (!apiKey) {
      throw new Error('DUNE_API_KEY is not set');
    }

    client = new DuneClient(apiKey);
  });

  describe('refresh', () => {
    it('should refresh "Last DEX trade USD amount" query', async () => {
      const results = await client.refresh({ query_id: 3479382 });

      expect(results.state).toBe('QUERY_STATE_COMPLETED');
      if (results.state === 'QUERY_STATE_COMPLETED') {
        expect(results.result.rows).toBeDefined();
      }
    }, 60_000);

    it('should refresh "All DEX trades" query with limit=10, offset=0', async () => {
      const results = await client.refresh({
        query_id: 3478409,
        limit: 10,
        offset: 0,
      });

      expect(results.state).toBe('QUERY_STATE_COMPLETED');
      if (results.state === 'QUERY_STATE_COMPLETED') {
        expect(results.result.rows).length(10);
      }
    }, 60_000);

    it.skip('should refresh "All DEX trades" query with sample_count=10', async () => {
      const results = await client.refresh({
        query_id: 3478409,
        sample_count: 10,
      });

      expect(results.state).toBe('QUERY_STATE_COMPLETED');
      if (results.state === 'QUERY_STATE_COMPLETED') {
        expect(results.result.rows).length(10);
      }
    }, 60_000);
  });
});
