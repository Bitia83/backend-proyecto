import express  from "express";
import 'dotenv/config';
import "./database/connectdb.js"
import cors from 'cors';


import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import linkRoute from './routes/link.route.js'
import redirectRouter from "./routes/redirect.route.js";




const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      return callback(null, origin)
    }
    return callback("error de CORS origin: " + origin + " no autorizado!");
  },
}));

app.use(express.json());
app.use(cookieParser());

//ejemplo back redirect (opcional)
app.use('/', redirectRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRoute);
// para el ejemplo de login
// app.use(express.static('public'))

const PORT =  process.env.PORT || 5000

app.listen(PORT, () => console.log("👌👌👌http://localhost:" + PORT));
