import { IngredientEntity } from "../ingredient";
import { InstructionEntity } from "../instruction";
import {MealEntity} from "../meal";

export interface MealName {
    name: string,
}

export interface MealIngredientInstruction {
    resultMeal: MealEntity[],
    resultIngredient: IngredientEntity[],
    resultInstruction: InstructionEntity[],
}