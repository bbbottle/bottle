import { Hono } from 'hono';
import { listStreaming } from '../controllers/streaming/list.controller';
import { addStreaming } from '../controllers/streaming/add.controller';
import { removeStreaming } from '../controllers/streaming/remove.controller';
import { trackDeviceActivity } from '../utils/deviceActivity';

const streamingRouter = new Hono();

streamingRouter.use('*', trackDeviceActivity);

streamingRouter.get('/', listStreaming);
streamingRouter.post('/', addStreaming);
streamingRouter.delete('/:id', removeStreaming);

export { streamingRouter };
