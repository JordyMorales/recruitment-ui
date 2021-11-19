export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      NODE_ENV: string;
      REACT_APP_SERVER_URI: string;
    };
  }
}
