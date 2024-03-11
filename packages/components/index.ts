import * as components from './src';
export * from './src';
import { App } from 'vue';

export default {
  install: (app: App) => {
    for (const c in components) {
      app.use((components as any)[c]);
    }
  }
};
