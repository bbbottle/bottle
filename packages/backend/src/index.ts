import app from './config/app.config';

import { commentRouter } from './routes/comment.routes';
import { streamingRouter } from './routes/streaming.routes';

app.route('comment', commentRouter);
app.route('streaming', streamingRouter);

app.get('/', c => {
  return c.text('Hello Hono!');
});

export default app;
