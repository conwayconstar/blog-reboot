// Import Router
import { Router } from 'express';

// Import Controllers
import PostController from './controllers/PostController';

// Init router
const router = Router();

// Create root route
router.get('/', (req, res) => {
  res.send('hello world');
});

// Post Routes
router.post('/post', PostController.create);
router.get('/post/:id?', PostController.read);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.delete);

// Export middleware config
export default {
  path: '/api',
  handler: router,
};
