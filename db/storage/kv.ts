
export interface KV {
  read(): void;
  write(): void;
  walk(): Promise<void>;
  create(): void;
}

