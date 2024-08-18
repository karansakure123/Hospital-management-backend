import mongoose from 'mongoose';

const footerItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

const Footer = mongoose.model('Footer', footerItemSchema);

export default Footer;
