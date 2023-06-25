import express from 'express'
import Handlebars from 'handlebars'
import handlebars from 'express-handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import UserRouter from './routes/user.router.js'

const app = express()

app.engine('hbs', handlebars.engine({
     extname: 'hbs',
     defaultLayout: 'main',
     handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
const userRouter = new UserRouter()

app.use('/users', userRouter.getRouter())

app.listen(8080,  () => console.log('Server Up!'))