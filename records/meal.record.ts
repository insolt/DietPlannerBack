import {MealEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type MealRecordResults = [MealEntity[], FieldPacket[]]


export class MealRecord implements MealEntity {
    public id?: string;
    public recipeName: string;

    constructor(obj: MealEntity) {
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


    static async findAll(): Promise<MealEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `meals`") as MealRecordResults;
        return results;
    }

    // static async getOne(id: string): Promise<MealRecord> {
    //     const [result] = await pool.execute("SELECT * FROM `meals` WHHERE `id` = :id", {
    //         id,
    //     });
    //
    //     return new MealRecord(result)
    // }




}