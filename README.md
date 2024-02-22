# Dune API Client

A TypeScript client for querying the Dune API, designed to simplify the integration of Dune's powerful analytics into your projects. 

> [!IMPORTANT]  
> This package is still in very early development and cannot be considered as stable until v1.
> Riverflow commits to maintain this project as best as possible.

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

### Supported API methods

We implemented a 1:1 mapping of the Dune API routes:

| Route                                        | Method                     |
| -------------------------------------------- | -------------------------- |
| POST `/v1/query/{{query_id}}/execute`        | `client.query.execute`     |
| GET `/v1/query/{{query_id}}/results`         | `client.query.results`     |
| POST `/v1/execution/{{execution_id}}/cancel` | `client.execution.cancel`  |
| GET `/v1/execution/{{execution_id}}/status`  | `client.execution.status`  |
| GET `/v1/execution/{{execution_id}}/results` | `client.execution.results` |

### Custom refresh method

We added a method to refresh a query (execute + wait for results):

```ts
// execute query 3453659 and wait for the execution results
const results = await client.refresh({ query_id: 3453659 });
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Thank you to all the contributors who have helped with the development of this client.
- Special thanks to Dune for providing the API that inspired this project.