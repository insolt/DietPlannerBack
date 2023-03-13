import {MealInstructionEntity} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

// type IngredientRecordResults = [IngredientEntity[], FieldPacket[]];


export class MealInstructionRecord implements MealInstructionEntity {
    public mealIdData: string;
    public instructionIdData: string;

    constructor(obj: MealInstructionEntity) {

        this.mealIdData = obj.mealIdData;
        this.instructionIdData = obj.instructionIdData;
    }

    async insert(): Promise<void> {

        await pool.execute("INSERT INTO `meals_instructions` (`mealId`, `instructionId`) VALUES (:mealIdData, :instructionIdData)", this);
    }

    // static async getOne(id: string): Promise<AdRecord> | null {
    //     const [result] = await pool.execute("SELECT * FROM `ads` WHERE `id` =:id", {
    //         id,
    //     }) as AdRecordResults;
    //
    //     return result.length === 0 ? null : new AdRecord(result[0])
    // }

    // static async findAll(): Promise<IngredientEntity[]> {
    //     const [results] = await pool.execute("SELECT * FROM `meals`") as MealRecordResults;
    //     console.log(results)
    //     return results;
    // }


}