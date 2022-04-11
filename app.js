const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
// const {MONGOURI} = require('./keys')
require('./models/user')





mongoose.connect("mongodb+srv://vamaninsta:Vaman6327@cluster0.bdkh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mongoose.connection.on('connected', () => {
    console.log("connected to mongo");
})

mongoose.connection.on('error', (err) => {
    console.log("err connecting", err);
})

require('./models/user')
require('./models/posts')


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// app.get('/', (req, res) => {
//     res.send("Vaman Kumar")
// })
if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is running on", PORT);
})