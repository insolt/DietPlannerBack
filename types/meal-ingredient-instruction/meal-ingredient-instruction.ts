import {MealEntity} from "../meal";
import {MealIngredientEntity} from "../meal-ingredient-entity";
import {MealInstructionEntity} from "../meal-instruction-entity";

export interface MealName {
    name: string,
}

export interface MealIngredientInstruction {
    resultMeal: MealName[],
    resultIngredient: MealIngredientEntity[],
    resultInstruction: MealInstructionEntity[],
}