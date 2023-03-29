export interface Scheduler {
    id?: string,
    planId: string,
    mealId: string,
    plannerPositionId: number,
}

export interface Plan {
    id?: string,
    planName: string,
}