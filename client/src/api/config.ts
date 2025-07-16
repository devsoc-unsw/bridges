export enum Env {
  DEV = 'development',
  TEST = 'testing',
  PROD = 'production',
  STAGE = 'staging',
}

const API_CONFIG: Record<string, string> = Object.freeze({
  [Env.DEV]: 'http://localhost:3001/api',
  [Env.TEST]: 'http://localhost:3001/api',
  // [Env.PROD]: 'TODO:',
  // [Env.STAGE]: 'TODO:',
});

export const API_URL: string = API_CONFIG[process.env.NODE_ENV ?? Env.DEV];
