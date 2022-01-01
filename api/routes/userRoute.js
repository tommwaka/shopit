import express from 'express'
import { updateUser } from '../controllers/userController.js'
import {tokenAuthorization} from '../middleware/authMiddleware.js'

const router = express.Router()

router.put('/:id', tokenAuthorization, updateUser)

export default router