import {Router} from "express";
import {MealIngredientRecord} from "../records/meal-ingredient.record";


export const mealIngredientRouter = Router()

    .post('/', async (req, res) => {
        const mealIngredient = new MealIngredientRecord(req.body);
        await mealIngredient.insert();
        res.json(mealIngredient);
    })