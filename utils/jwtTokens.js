import jwt from 'jsonwebtoken';

export const generateToken = (user, message, statusCode, res) => {
  // Ensure the user is an instance of the User model with `generateWebToken` method
  if (typeof user.generateWebToken !== 'function') {
    throw new Error('User object does not have generateWebToken method');
  }

  const token = user.generateWebToken();
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res.status(statusCode).cookie(cookieName, token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }).json({
    success: true,
    message,
    user,
    token,
  });
};
