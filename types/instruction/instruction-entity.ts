export interface InstructionEntity {
    id?: string,
    mealId: string,
    instructionName: string,
    instructionOrderNumber: number,
}

export interface InstructionEntityFront {
    id?: string,
    mealId?: string,
    name: string,
    orderNumber: number,
}