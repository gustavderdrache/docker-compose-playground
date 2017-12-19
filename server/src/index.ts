import { createServer } from 'http';
import { resolve } from 'path';

import express from 'express';
import { ParseServer } from 'parse-server';

import { load } from 'dotenv-safe';

load();

type ExtraOptions = {
  filesAdapter?: {};
  emailAdapter?: {};
};

let extraOptions: ExtraOptions = {};
if (process.env.NODE_ENV !== 'production') {
  extraOptions.filesAdapter = {
    module: '@parse/fs-files-adapter',
    options: {
      filesSubDirectory: 'storage',
    },
  };

  extraOptions.emailAdapter = {
    module: require.resolve('simple-parse-smtp-adapter'),
    options: {
      fromAddress: 'parse@localhost',
      user: 'parse@localhost',
      password: 'password',
      host: 'mail',
      isSSL: false,
      port: 1025,
    },
  };
}

const api = new ParseServer({
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  serverURL: process.env.PARSE_SERVER_URL,
  databaseURI: process.env.PARSE_DATABASE_URL,
  ...extraOptions,
});

const app = express();
app.use('/parse', api);
app.get('/', (_req, res, next) => {
  const path = resolve(process.cwd(), './assets/index.html');

  res.sendFile(path, (err: Error | null) => {
    if (err) {
      next(err);
    }
  });
});

const server = createServer(app);
server.listen(80);

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});