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
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `schedulers` (`id`, `planId`, `mealId`, `plannerPositionId`) VALUES (:id, :planId, :mealId, :plannerPositionId)", this);
    }


    // static async findAll(): Promise<MealIdPlannerPositionId[]> {
    //     const [results] = await pool.execute("SELECT * FROM `meals`") as PlanRecordResults;
    //     return results;
    // }

    // static async getOne(id: string): Promise<AdRecord> | null {
    //     const [result] = await pool.execute("SELECT * FROM `ads` WHERE `id` =:id", {
    //         id,
    //     }) as AdRecordResults;
    //
    //     return result.length === 0 ? null : new AdRecord(result[0])
    // }




}