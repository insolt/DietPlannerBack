import {Scheduler} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type SchedulerRecordResults = [Scheduler[], FieldPacket[]]


export class SchedulerRecord implements Scheduler {
    public id?: string;
    public planId: string;
    public mealId: string;
    public plannerPositionId: number;

    constructor(obj: Scheduler) {
        this.id = obj.id;
        this.planId = obj.planId;
        this.mealId = obj.mealId;
        this.plannerPositionId = obj.plannerPositionId;
    }

    async insert(): Promise<void> {

        await pool.execute("INSERT INTO `schedulers` (`planId`, `mealId`, `plannerPositionId`) VALUES (:planId, :mealId, :plannerPositionId)", this);

    }

}