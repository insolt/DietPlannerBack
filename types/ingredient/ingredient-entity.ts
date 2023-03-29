export interface IngredientEntity {
    id?: string,
    mealId: string,
    ingredientName: string,
    ingredientAmount: number,
    ingredientUnit: string,
    ingredientEnergy: number,
}

export interface IngredientEnergy {
    energy: number,
}

export interface IngredientEntityFront {
    id?: string,
    mealId?: string,
    name: string,
    amount: number,
    unit: string,
    energy: number,
}