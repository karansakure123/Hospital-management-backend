import { Message } from "../models/messageSchema.js";
import { catchAssyncErrors } from "../middlewares/catchAssyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// Controller to send a new message
export const sendMessage = catchAssyncErrors(async (req, res, next) => {
  console.log(req.body); // Log the incoming request body
  const { firstName, lastName, phone, email, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }

  const newMessage = await Message.create({ firstName, lastName, phone, email, message });

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

// Controller to get all messages
export const getAllMessages = catchAssyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
