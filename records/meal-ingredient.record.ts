import {MealIngredientEntity} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

// type IngredientRecordResults = [IngredientEntity[], FieldPacket[]];


export class MealIngredientRecord implements MealIngredientEntity {
    public mealDataId: string;
    public ingredientDataId: string;

    constructor(obj: MealIngredientEntity) {

        this.mealDataId = obj.mealDataId;
        this.ingredientDataId = obj.ingredientDataId;
    }

    async insert(): Promise<void> {

        await pool.execute("INSERT INTO `meals_ingredients` (`mealId`, `ingredientId`) VALUES (:mealDataId, :ingredientDataId)", this);
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