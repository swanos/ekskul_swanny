import express from 'express';
import bodyParser from "body-parser";
import cors from'cors';
import http from 'http';
import configData from './environment';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

//Connect to database
mongoose.connect(configData.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
const database = mongoose.connection;
database.once("open", async() => {
    console.log("Connected to database");
});
database.on("error", () => {
    console.log("Error connecting to database");
});

//week7
app.get('/index', (req, res) => {
    console.log("req: ", req)
    return res.status(200).json({message: "success !"})
})
app.post('/create', (req, res) => {
    console.log("req: ", req)
    return res.status(200).json({message: "success !"})
})
app.delete('/remove', (req, res) => {
    console.log("req: ", req)
    return res.status(200).json({message: "success !"})
})
app.put('/update', (req, res) => {
    console.log("req: ", req)
    return res.status(200).json({message: "success !"})
})

const server = http.createServer(app);
//server initialization
function startServer(){
    server.listen(configData.port, parseInt(configData.host), function(){
        console.log('Express server listening on %d, in %s mode %s', configData.port, configData.host, configData.env);
    });
}

setImmediate(startServer);
