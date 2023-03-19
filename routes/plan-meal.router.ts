import {Router} from "express";
import {PlanMealRecord} from "../records/plan-meal.record";


export const planMealRouter = Router()

    .post('/', async (req, res) => {
        const planMeal = new PlanMealRecord(req.body);
        await planMeal.insert();
        res.json(planMeal);
    })