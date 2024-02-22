# Dune API Client

Simply query the Dune API in TypeScript.

## Install

```shell
npm install @riverfl0w/dune-client
```

## Usage

First, you have to [get an Dune API key](https://dune.com/docs/api/#obtaining-an-api-key).

Instanciate the `DuneClient`:

```ts
import { DuneClient } from '@riverfl0w/'

const client = new DuneClient('[your api key]');
const result = await client.query.execute({ query_id: 3453659 });

console.log('Execution ID:', result.execution_id);
```

We implemented a 1:1 mapping of the Dune API routes:

| Route                                        | Method                     |
| -------------------------------------------- | -------------------------- |
| POST `/v1/query/{{query_id}}/execute`        | `client.query.execute`     |
| GET `/v1/query/{{query_id}}/results`         | `client.query.results`     |
| POST `/v1/execution/{{execution_id}}/cancel` | `client.execution.cancel`  |
| GET `/v1/execution/{{execution_id}}/status`  | `client.execution.status`  |
| GET `/v1/execution/{{execution_id}}/results` | `client.execution.results` |