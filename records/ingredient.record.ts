import {IngredientEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

// type IngredientRecordResults = [IngredientEntity[], FieldPacket[]];


export class IngredientRecord implements IngredientEntity {
    public id?: string;
    public ingredientName: string;
    public ingredientAmount: number;
    public ingredientUnit: string;
    public ingredientEnergy: number;

    constructor(obj: IngredientEntity) {
        if (!obj.ingredientName || obj.ingredientName.length > 50) {
            console.log('Zbyt dluga nazwa skladnika', obj.ingredientName);
            throw new ValidationError('Ingredient\'s name cannot exceed length of 50.');
        }

        this.id = obj.id;
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

        await pool.execute("INSERT INTO `ingredients` (`id`, `name`, `amount`, `unit`, `energy`) VALUES (:id, :ingredientName, :ingredientAmount, :ingredientUnit, :ingredientEnergy)", this);
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