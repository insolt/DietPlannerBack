import {Plan} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type PlanRecordResults = [Plan[], FieldPacket[]]


export class PlanRecord implements Plan {
    public id?: string;
    public planName: string;

    constructor(obj: Plan) {
        this.id = obj.id;
        this.planName = obj.planName;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `plans` (`id`, `planName`) VALUES (:id, :planName)", this);

        return this.id
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