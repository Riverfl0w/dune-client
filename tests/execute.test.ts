import { beforeEach, describe, expect, it } from 'vitest';
import DuneClient from '../src/DuneClient.js';

describe('Execute a query', () => {
  let client: DuneClient;

  beforeEach(() => {
    const apiKey = process.env['DUNE_API_KEY'];
    if (!apiKey) {
      throw new Error('DUNE_API_KEY is not set');
    }

    client = new DuneClient(apiKey);
  });

  it('should refresh a query', async () => {
    const results = await client.refresh({ query_id: 3453659 });

    expect(results.state).toBe('QUERY_STATE_COMPLETED');
    if (results.state === 'QUERY_STATE_COMPLETED') {
      expect(results.result.rows).toBeDefined();
    }
  }, 60_000);
});
