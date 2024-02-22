import type ExecuteQueryArgs from './ExecuteQueryArgs.js';

export default interface RefreshQueryArgs extends ExecuteQueryArgs {
  cooldown?: number;
}
