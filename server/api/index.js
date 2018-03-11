import { Router } from 'express'

import bot from './bot'

const router = Router()

// Add USERS Routes
router.use(bot)

export default router
