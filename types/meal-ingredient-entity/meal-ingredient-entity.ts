export interface MealIngredientEntity {
    id?: string,
    name: string,
    amount: number,
    unit: string,
    energy: number,
    mealId?: string,
}