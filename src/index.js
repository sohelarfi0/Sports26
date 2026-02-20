import AgentAPI from 'apminsight';
AgentAPI.config();


import express from 'express';
import { matchRouter } from './routes/matches.js';
import http from 'http';
import { securityMiddleware } from './arcjet.js';
import { commentaryRouter } from './routes/commentary.js';


const PORT=Number(process.env.PORT || 8000);
const HOST=process.env.HOST || '0.0.0.0';

const app=express();
const server =http.createServer(app);



app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello from Express server!');

});

// app.use(securityMiddleware());

app.use('/matches',matchRouter);
app.use('matches/:id/commentary', commentaryRouter);

const {broadcastMatchCreated, broadcastCommentary}=attachWebSocketServer(server);
app.locals.broadcastMatchCreated=broadcastMatchCreated;
app.locals.broadcastCommentary=broadcastCommentary;

app.listen(PORT,HOST,()=>{
    const baseUrl = HOST ==='0.0.0.0' ? `http://localhost:${PORT}`:`http://${HOST}:${POST}`;

    console.log(`Server is running on ${baseUrl}`);
    console.log(`Server is running on ${baseUrl.replace('http','ws')}/ws`);
});
