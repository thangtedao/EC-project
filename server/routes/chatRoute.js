import express from 'express'
import { getAllConversation, postSaveMessage, getMessageByConversation } from '../controller/chatController.js'

const router = express.Router()

router.get('/', getAllConversation)

router.get('/message', getMessageByConversation);

router.post('/save', postSaveMessage)

export default router