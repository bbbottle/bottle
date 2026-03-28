import { Hono } from 'hono';
import { listPosts } from '../controllers/posts/list.controller';
import { getPost } from '../controllers/posts/get.controller';
import { addPost } from '../controllers/posts/add.controller';
import { updatePost } from '../controllers/posts/update.controller';
import { removePost } from '../controllers/posts/remove.controller';
import { requireAuth } from '../utils/auth';
import { trackDeviceActivity } from '../utils/deviceActivity';

const postsRouter = new Hono();

postsRouter.use('*', trackDeviceActivity);

// Public routes
postsRouter.get('/', listPosts);
postsRouter.get('/:title', getPost);

// Protected routes (require API key)
postsRouter.post('/', requireAuth, addPost);
postsRouter.put('/:id', requireAuth, updatePost);
postsRouter.delete('/:id', requireAuth, removePost);

export { postsRouter };
