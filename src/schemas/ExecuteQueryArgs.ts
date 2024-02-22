export default interface ExecuteQueryArgs {
  query_id: string | number;
  performance?: 'medium' | 'large';
  query_parameters?: Record<string, unknown>;
}
