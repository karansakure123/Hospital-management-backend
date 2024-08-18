import Footer from '../../models/homepage/footerSchema.js';
import footerRouter from '../../router/homepage/footerRouter.js';


// Get all footer links
export const getFooterLinks = async (req, res) => {
    try {
      const links = await Footer.find();
      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a footer link by ID
  export const getFooterLinkById = async (req, res) => {
    try {
      const link = await Footer.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ message: 'Footer link not found' });
      }
      res.status(200).json(link);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get an item by ID within a footer link
  export const getFooterItemById = async (req, res) => {
    try {
      const footerLink = await Footer.findOne({ 'items._id': req.params.itemId });
      if (!footerLink) {
        return res.status(404).json({ message: 'Footer item not found' });
      }
      const item = footerLink.items.id(req.params.itemId);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Create a new footer link
export const createFooterLink = async (req, res) => {
  const footerLink = new Footer(req.body);
  try {
    const savedLink = await footerLink.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing footer link
export const updateFooterLink = async (req, res) => {
  try {
    const updatedLink = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLink) {
      return res.status(404).json({ message: 'Footer link not found' });
    }
    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFooterLink = async (req, res) => {
  try {
    const { id } = req.params; // Get the item ID from the request parameters

    // First, find the footer link that contains the item
    const footerLink = await Footer.findOneAndUpdate(
      { 'items._id': id },
      { $pull: { items: { _id: id } } }, // Remove the item from the items array
      { new: true }
    );

    if (!footerLink) {
      return res.status(404).json({ message: 'Footer link not found' });
    }

    // Check if there are no items left in this footer link
    if (footerLink.items.length === 0) {
      await Footer.deleteOne({ _id: footerLink._id }); // Delete the footer link if no items remain
    }

    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a footer link by ID (useful if you want to delete the heading directly)
export const deleteFooterById = async (req, res) => {
  try {
    const { id } = req.params; // Get the footer ID from the request parameters

    const deletedFooter = await Footer.findByIdAndDelete(id);

    if (!deletedFooter) {
      return res.status(404).json({ message: 'Footer link not found' });
    }

    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};