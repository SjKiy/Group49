import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// TESTING
import {create} from './data/apartment.js';
async function main(){
    let apt 
    try{
        apt = await create("Apt 1", 1500, 16500, 800, 1,1, "Nice", true, [], [])
        console.log(apt);
    }
    catch(e){
        console.log(e);
    }
}
main();


// // SERVER SETUP
// const staticDir = express.static(__dirname + '/public');

// const rewriteUnsupportedBrowserMethods = (req, res, next) => {
//   if (req.body && req.body._method) {
//     req.method = req.body._method;
//     delete req.body._method;
//   }
//   next();
// };

// app.use(session({
//     name: 'AuthCookie',
//     secret: 'some secret string!',
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.use('/public', staticDir);
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(rewriteUnsupportedBrowserMethods);

// app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// configRoutes(app);

// app.listen(3000, () => {
//   console.log("We've now got a server!");
//   console.log('Your routes will be running on http://localhost:3000');
// });