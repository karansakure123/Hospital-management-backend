import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../../controller/homepage/blgoController.js';

const blogRouter = express.Router();

blogRouter.get('/getall', getAllBlogs);
blogRouter.get('/get/:id', getBlogById);
blogRouter.post('/addnew/', createBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/delete/:id', deleteBlog);

export default blogRouter;
