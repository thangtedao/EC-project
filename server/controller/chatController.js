import expressAsyncHandler from 'express-async-handler'
import { ConversationModel } from '../models/Conversation.js'
import { MessageModel } from '../models/Message.js'

export const getAllConversation = expressAsyncHandler(async (req, res) => {
    const allConversation = await ConversationModel.find().sort({ updatedAt: -1} )
    res.send(allConversation)
})

export const getMessageByConversation = async (req, res) => {
    try {
        console.log('calling thiss');
        
        const user = await ConversationModel.findOne({
            $or: [
                {idUser: req.query.idUser},
                {_id: req.query.idConversation}
            ]
        });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: 'Cuộc trò chuyện không tồn tại'
            });
        }

        const messages = await MessageModel.find({
            idConversation: user._id
        }).populate('idConversation').exec();

        if (!messages || messages.length === 0) {
            return res.status(400).json({
                message: 'Không tìm thấy tin nhắn'
            });
        }

        return res.status(200).json({
            messageList: messages
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lỗi server'
        });
    }
};

export const postSaveMessage = async (req, res) => {
    try {
    const messageText = new MessageModel({
        sender: req.body.sender,
        message: req.body.message,
        idConversation: req.body.idConversation,
    })
    console.log(messageText)
    const createMessage = await messageText.save()
    res.send(createMessage)
    } catch (error) {
        console.log(error.message)
    }
}