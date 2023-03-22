import {IngredientEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

// type IngredientRecordResults = [IngredientEntity[], FieldPacket[]];


export class IngredientRecord implements IngredientEntity {
    public id?: string;
    public mealId?: string;
    public ingredientName: string;
    public ingredientAmount: number;
    public ingredientUnit: string;
    public ingredientEnergy: number;

    constructor(obj: IngredientEntity) {
        if (!obj.ingredientName) {
            throw new ValidationError('Ingredient does not exist.');
        }
        if (obj.ingredientName.length > 50) {
            throw new ValidationError('Ingredient\'s name cannot exceed length of 50 letters.');
        }

        this.id = obj.id;
        this.mealId = obj.mealId;
        this.ingredientName = obj.ingredientName;
        this.ingredientAmount = obj.ingredientAmount;
        this.ingredientUnit = obj.ingredientUnit;
        this.ingredientEnergy = obj.ingredientEnergy;
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `ingredients` (`id`, `mealId`, `name`, `amount`, `unit`, `energy`) VALUES (:id, :mealId, :ingredientName, :ingredientAmount, :ingredientUnit, :ingredientEnergy)", this);
    }


    static async delete(id: string): Promise<void> {
       await pool.execute("DELETE FROM `ingredients` WHERE `id` = :id", {
            id,
        });
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