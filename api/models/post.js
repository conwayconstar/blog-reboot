// Import dependencies
import { Schema, model } from 'mongoose';

// Create Post model Schema
const PostSchema = Schema({
  title: { type: String, required: true },
  content: { type: String },
  image: { type: String },
},
// Add timestamps
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Init Post model
const Post = model('Post', PostSchema);

// Export Post model
export default Post;
