import CSR from '../../models/homepage/csrSchema.js'

// Create a new CSR
export const createCSR = async (req, res) => {
    try {
        const csr = new CSR(req.body);
        await csr.save();
        res.status(201).json(csr);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all CSRs
export const getAllCSRs = async (req, res) => {
    try {
        const csrs = await CSR.find();
        res.status(200).json(csrs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single CSR by ID
export const getCSRById = async (req, res) => {
    try {
        const csr = await CSR.findById(req.params.id);
        if (!csr) return res.status(404).json({ message: 'CSR not found' });
        res.status(200).json(csr);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a CSR by ID
export const updateCSR = async (req, res) => {
    try {
        const csr = await CSR.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!csr) return res.status(404).json({ message: 'CSR not found' });
        res.status(200).json(csr);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a CSR by ID
export const deleteCSR = async (req, res) => {
    try {
        const csr = await CSR.findByIdAndDelete(req.params.id);
        if (!csr) return res.status(404).json({ message: 'CSR not found' });
        res.status(200).json({ message: 'CSR deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
