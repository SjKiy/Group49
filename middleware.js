/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/


import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import configRoutes from './routes/index.js';
app.use(cookieParser());
app.use(express.json());
/*
app.use('/', async (req, res, next) => {
    if (req.session.user && req.session.user.role == "admin") {
        return res.redirect('/admin');
    }
    else if (req.session.user && req.session.user.role == "user") {
        return res.redirect('/protected');
    }
    else {
        return res.redirect('login');
    }
}
);

app.use('/login', async (req, res, next) => {
    if (req.session.user && req.session.user.role == "admin") {
        return res.redirect('/admin');
    }
    else if (req.session.user && req.session.user.role == "user") {
        return res.redirect('/protected');
    }
    else {
        return ????;
    }
}
);

app.use('/register', async (req, res, next) => {
    if (req.session.user && req.session.user.role == "admin") {
        return res.redirect('/admin');
    }
    else if (req.session.user && req.session.user.role == "user") {
        return res.redirect('/protected');
    }
    else {
        return ????;
    }
}
);

*/