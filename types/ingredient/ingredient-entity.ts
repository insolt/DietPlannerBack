export interface IngredientEntity {
    id?: string,
    mealId?: string,
    ingredientName: string,
    ingredientAmount: number,
    ingredientUnit: string,
    ingredientEnergy: number,
}

export interface IngredientEnergy {
    energy: number,
}