import express from 'express';

import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import mongoose from 'mongoose';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { __dirname } from './utils.js';
import cartsRoutes from './routes/carts.routes.js';
import productsRoutes from './routes/products.routes.js';
import sessionRoutes from './routes/session.routes.js';
import viewsRouter from './routes/views.routes.js';

// --- application
const app = express();

// --- mongoDB
mongoose.set('strictQuery', true);
try {
    await mongoose.connect('mongodb+srv://proyectoqyg:qyg100623@tiendafuncional.w059uuz.mongodb.net/');
    console.log('Conexión exitosa a MongoDB');
} catch (err) {
    console.log('Error al conectar a MongoDB', err);
}
// --- handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

// ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartsRoutes);
app.use('/session', sessionRoutes);
app.use('/', viewsRouter);
app.get('*', (req, res) => { res.status(404).send('404 not found')})


app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'))