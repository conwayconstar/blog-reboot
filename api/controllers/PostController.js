// Import post model
import Post from '../models/post';

// PostController methods
export default {
  create: ({ body }, res) => {
    // Create post from body
    Post.create(body)
      // Promise resolved
      .then((err, post) => {
        if (err) res.status(401).send(err);
        res.send(post);
      })
      // Promise rejected
      .catch(err => res.status(401).send(err));
  },
  read: ({ params }, res) => {
    // If id is passed in find by id
    if (params.id) {
      Post.findById(params.id)
        // Promise resolved
        .then(post => res.send(post))
        // Promise rejected
        .catch(() => res.status(404).send({
          message: 'Post not found',
        }));
    } else {
    // If not then get all
      Post.find({})
        // Promise resolved
        .then(posts => res.send(posts))
        // Promise rejected
        .catch(() => res.status(404).send({
          message: 'No posts found',
        }));
    }
  },
  update: ({ body, params }, res) => {
    // Update the post
    Post.findByIdAndUpdate(params.id, body)
      // Promise resolved
      .then(post => res.send(post))
      // Promise rejected
      .catch(() => res.status(404).send({
        message: 'No posts found',
      }));
  },
  delete: ({ params }, res) => {
    // Delete post
    Post.deleteOne({ _id: params.id })
      // Promise resolved
      .then(post => res.send(post))
      // Promise rejected
      .catch(() => res.status(404).send({
        message: 'No posts found',
      }));
  },
};
