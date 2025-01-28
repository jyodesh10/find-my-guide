import Chat from "../models/chat.model.js";


export const getChat = async (req, res) => {
     try {
          const chat = await Chat.find();
          res.status(200).json(chat);
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
}

export const getChatbyUserId = async (req, res) => {
     try {
          const { user } = req.query;
          const chat = await Chat.find({ user: user }).populate({
               path: "guide",
               model: "Guide",
               select: ["image", "firstname", "lastname"]
          });
          res.status(200).json(chat);
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
}

export const getChatbyGuideId = async (req, res) => {
     try {
          const { guide } = req.query;
          const chat = await Chat.find({ guide: guide }).populate({
               path: "user",
               model: "User",
               select: ["image", "username",]
          });
          res.status(200).json(chat);
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
}

export const getChatbyId = async (req, res) => {
     try {
          const { id } = req.params;
          const chat = await Chat.findById(id).select('messages -_id');
          res.status(200).json(chat);
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
}

export const sendMessage = async (req, res) => {
     try {
          const { user, guide, messages } = req.body;
          const chatExist = await Chat.findOne({
               user: user,
               guide: guide
          })
          if (chatExist) {
               const chat = await Chat.findByIdAndUpdate(
                    chatExist._id,
                    {
                         $push: {
                              messages: messages
                         }
                    }
               )
               res.status(200).json({ message: "message sent" });
          } else {
               const chat = await Chat(req.body);
               chat.save();
               res.status(200).json(chat);
          }
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
}

export default {
     getChat,
     sendMessage,
     getChatbyUserId,
     getChatbyGuideId,
     getChatbyId
}