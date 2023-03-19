import {MealIdPlannerPositionId} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type PlanMealRecordResults = [MealIdPlannerPositionId[], FieldPacket[]]


export class PlanMealRecord implements MealIdPlannerPositionId {
    public id?: string;
    public recipeName: string;

    constructor(obj: MealIdPlannerPositionId) {
        if (!obj.recipeName || obj.recipeName.length > 50) {
            throw new ValidationError('Meal\'s name cannot exceed length of 50.');
        }

        this.id = obj.id;
        this.recipeName = obj.recipeName;
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `meals` (`id`, `name`) VALUES (:id, :recipeName)", this);
    }


    static async findAll(): Promise<MealIdPlannerPositionId[]> {
        const [results] = await pool.execute("SELECT * FROM `meals`") as PlanMealRecordResults;
        return results;
    }

    // static async getOne(id: string): Promise<AdRecord> | null {
    //     const [result] = await pool.execute("SELECT * FROM `ads` WHERE `id` =:id", {
    //         id,
    //     }) as AdRecordResults;
    //
    //     return result.length === 0 ? null : new AdRecord(result[0])
    // }




}