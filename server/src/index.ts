import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello, world!';

  return next();
});

const app = new Koa();

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(80);