import {InstructionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

// type IngredientRecordResults = [IngredientEntity[], FieldPacket[]];


export class InstructionRecord implements InstructionEntity {
    public id?: string;
    public instructionName: string;
    public instructionOrderNumber: number;

    constructor(obj: InstructionEntity) {
        if (!obj.instructionName || obj.instructionName.length > 100) {
            console.log('ZZbyt dluga nazwa instrukcji', obj.instructionName);
            throw new ValidationError('Instruction\'s name cannot exceed length of 100.');
        }

        this.id = obj.id;
        this.instructionName = obj.instructionName;
        this.instructionOrderNumber = obj.instructionOrderNumber;
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `instructions` (`id`, `name`, `order_number`) VALUES (:id, :instructionName, :instructionOrderNumber)", this);
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