import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Task } from './models/Task.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message)
  })

app.get('/', (req, res) => {
  res.json({
    message: 'TaskFlow Backend Running'
  })
})

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

app.post('/tasks', async (req, res) => {

  const newTask = new Task({
    title: req.body.title,
    completed: false
  })

  await newTask.save()

  res.json(newTask)
})

app.delete('/tasks/:id', async (req, res) => {

  const { id } = req.params

  await Task.findByIdAndDelete(id)

  res.json({
    message: 'Task deleted'
  })
})

app.patch('/tasks/:id', async (req, res) => {

  const { id } = req.params

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      completed: req.body.completed
    },
    {
      returnDocument: 'after'
    }
  )

  res.json(updatedTask)
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})