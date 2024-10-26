import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:'16kb'}))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser());


import { userRouter } from './routes/user.routes.js'
import { videoRouter } from './routes/video.routes.js'
import { subsRouter } from './routes/subscription.routes.js'

app.use('/api/v1/users',userRouter)
app.use('/api/v1/videos',videoRouter)
app.use('/api/v1/subscription',subsRouter)



export {app}