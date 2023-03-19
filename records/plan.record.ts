import {MealIdPlannerPositionId} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type PlanRecordResults = [MealIdPlannerPositionId[], FieldPacket[]]


export class PlanRecord implements MealIdPlannerPositionId {
    public id?: string;
    public mealId: string;
    public plannerPositionId: number;

    constructor(obj: MealIdPlannerPositionId) {
        this.mealId = obj.mealId;
        this.plannerPositionId = obj.plannerPositionId;
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `plans` (`id`, `mealId`, `plannerPositionId`) VALUES (:id, :mealId, :plannerPositionId)", this);
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