import {Router} from "express";
import {SchedulerRecord} from "../records/scheduler.record";


export const schedulerRouter = Router()

    .post('/', async (req, res) => {
        const plan = new SchedulerRecord(req.body);
        await plan.insert();
        res.json({saved: true});
    })