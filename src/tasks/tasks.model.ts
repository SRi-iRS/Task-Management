export interface Tasks {
    id: string,
    title: string,
    description: string,
    status: TasksStatus
}

export enum TasksStatus{
    OPEN= 'OPEN',
    IN_PROGRESS= 'IN_PROGRESS',
    COMPLETED= 'COMPLETED'
}