import {Router} from "express";
import {PlanRecord} from "../records/plan.record";


export const planRouter = Router()

    .post('/', async (req, res) => {
        const plan = new PlanRecord(req.body);
        await plan.insert();
        res.json(plan.id);
    })