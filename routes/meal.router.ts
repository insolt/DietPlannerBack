import {Router} from "express";
import {MealRecord} from "../records/meal.record";


export const mealRouter = Router()

    .post('/', async (req, res) => {
        const meal = new MealRecord(req.body);
        await meal.insert();
        res.json(meal);
    })

    // .get('/all', async (req, res) => {
    //     const meals = await MealRecord.findAll();
    //     res.json(meals);
    // })
//
// .get('/:id', async (req, res) => {
//     const ad = await AdRecord.getOne(req.params.id);
//     res.json(ad);
// })
//
