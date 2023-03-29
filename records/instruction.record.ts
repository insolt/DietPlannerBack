import {IngredientEntity, InstructionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type InstructionResults = [InstructionEntity[], FieldPacket[]];


export class InstructionRecord implements InstructionEntity {
    public id?: string;
    public mealId: string;
    public instructionName: string;
    public instructionOrderNumber: number;

    constructor(obj: InstructionEntity) {
        if (!obj.instructionName) {
            throw new ValidationError('instruction does not exist.');
        }
        if (obj.instructionName.length > 100) {
            throw new ValidationError('Instruction\'s name cannot exceed length of 100.');
        }

        this.id = obj.id;
        this.mealId = obj.mealId;
        this.instructionName = obj.instructionName;
        this.instructionOrderNumber = obj.instructionOrderNumber;
    }


    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists in database");
        }

        await pool.execute("INSERT INTO `instructions` (`id`, `mealId`, `name`, `order_number`) VALUES (:id, :mealId, :instructionName, :instructionOrderNumber)", this);
    }


    static async delete(id: string): Promise<void> {
        await pool.execute("DELETE FROM `instructions` WHERE `id` = :id", {
            id,
        });
    }

    static async getSet(id: string): Promise<InstructionEntity[]> {
        const [resultInstruction] = await pool.execute("SELECT `name`, `amount`, `unit`, `energy` FROM `ingredients` WHERE `mealId` = :id", {
            id,
        }) as InstructionResults;

        return resultInstruction
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