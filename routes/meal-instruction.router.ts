import {Router} from "express";
import {MealInstructionRecord} from "../records/meal-instruction.record";


export const mealInstructionRouter = Router()

    .post('/', async (req, res) => {
        const mealInstruction = new MealInstructionRecord(req.body);
        await mealInstruction.insert();
        res.json(mealInstruction);
    })