import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required : true
        },
        senderID: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide'
    },
    messages: [
        {
            type: messageSchema,
            required: true
        }
    ]
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;