import { createServer } from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'

const prisma = new PrismaClient()
const httpServer = createServer()

// Initialize Socket.io with open CORS for the Next.js Dev environment
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`)

  // === P2P DIRECT CHAT HANDLER ===
  socket.on('send_message', async (data) => {
    try {
      const message = await prisma.message.create({
        data: {
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
        }
      })
      
      // Ensure the message propagates back to both parties
      io.emit(`receive_message_${data.receiverId}`, message)
      io.emit(`receive_message_${data.senderId}`, message)
      console.log(`💬 Saved message from ${data.senderId} to ${data.receiverId}`)
    } catch (e) {
      console.error('Socket message save failed:', e)
    }
  })

  // === LIVE GPS TRACKING HANDLER ===
  socket.on('update_location', async (data) => {
    try {
      await prisma.locationRecord.create({
        data: {
          sellerId: data.sellerId,
          latitude: data.latitude,
          longitude: data.longitude,
        }
      })
      
      // Broadcast this seller's new coordinates instantly
      io.emit(`seller_location_${data.sellerId}`, {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date()
      })
    } catch (e) {
      console.error('Socket location save failed:', e)
    }
  })

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`)
  })
})

// === SERVERLESS MAINTENANCE CHRON JOBS ===

// Clean old, noisy GPS tracking data every hour to free DB volume
cron.schedule('0 * * * *', async () => {
  console.log('🧹 Running maintenance job: Cleaning old location data...')
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const result = await prisma.locationRecord.deleteMany({
      where: {
        timestamp: { lt: oneHourAgo }
      }
    })
    console.log(`✅ Chron Cleanup: Erased ${result.count} stale location records.`)
  } catch (error) {
    console.error('Chron cleanup failed:', error)
  }
})

// Ensure DB limits / pricing logic scales overnight (Example Placeholder)
cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Fetching & Updating latest LPG pricing datasets...')
  // Add 3rd party API fetch logic here
})

const PORT = process.env.WS_PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`🚀 [Real-Time] Socket.io + Cron Jobs Server running on port ${PORT}`)
})
