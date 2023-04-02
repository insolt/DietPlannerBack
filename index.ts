import cookieSession from "cookie-session";
import express, {Router} from "express";
import cookieParser from "cookie-parser";
import {sessionConfig} from './session-config';
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {mealRouter} from "./routes/meal.router";
import {ingredientRouter} from "./routes/ingredient.router";
import {instructionRouter} from "./routes/instruction.router";
import {userRouter} from "./routes/user.router";
import {weekRouter} from "./routes/week.router";
import {planRouter} from "./routes/plan.router";
import {schedulerRouter} from "./routes/scheduler.router";



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


const router = Router();

router.use('/user', userRouter);
router.use('/week', weekRouter);
router.use('/meal', mealRouter);
router.use('/ingredient', ingredientRouter);
router.use('/instruction', instructionRouter);
router.use('/plan', planRouter);
router.use('/scheduler', schedulerRouter);

app.use('/api', router);


app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});