import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Expiry time
  );
};

// Function to verify a JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
