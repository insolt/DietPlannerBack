import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {ingredientRouter} from "./routes/ingredient.router";
import {mealRouter} from "./routes/meal.router";
import {userRouter} from "./routes/user.router";
import {weekRouter} from "./routes/week.router";
import {operationRouter} from "./routes/operation.router";



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(json()); // Content-type: application/json

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))


app.use('/user', userRouter);
app.use('/week', weekRouter);
app.use('/meal', mealRouter);
app.use('/ingredient', ingredientRouter);
app.use('/operation', operationRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});