const express = require('express')
const app = express()
const logger = require('morgan')
const PORT = process.env.PORT || 8888
const cors = require('cors')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get('/events', async (req, res) => {
    // console.log(`Requested url : ${req.url}`)
    req.on('close', () => {
        if (res.writableEnded){
            res.end()
            console.log('stop sending events')
        }
    })

    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
    })
    let count = 0;

    setInterval(() => {
        res.write(`data:${++count}\n\n`)
    }, 1000)
    // while (true) {
    //   await new Promise(resolve => setTimeout(resolve, 1000));

    //   console.log('Emit', ++count);
    //   // Emit an SSE that contains the current 'count' as a string
    //   res.write(`data: ${count}\n\n`);
    // }
})



app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
})

