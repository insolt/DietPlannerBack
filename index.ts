import cookieSession from "cookie-session";
import express from "express";
import cookieParser from "cookie-parser";
import {sessionConfig} from './session-config';
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {ingredientRouter} from "./routes/ingredient.router";
import {mealRouter} from "./routes/meal.router";
import {userRouter} from "./routes/user.router";
import {weekRouter} from "./routes/week.router";
import {instructionRouter} from "./routes/instruction.router";



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(express.json()); // Content-type: application/json
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: sessionConfig.keySession,
    maxAge: sessionConfig.maxLengthSession,
}))

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))


app.use('/user', userRouter);
app.use('/week', weekRouter);
app.use('/meal', mealRouter);
app.use('/ingredient', ingredientRouter);
app.use('/operation', instructionRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});