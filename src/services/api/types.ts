export interface ToDoItem {
    id: string;
    name: string;
    description: string;
    status: ToDoItemStatus;
    plannedExecutionDate: string;
    priority: ToDoItemPriority;
    endDate?: string;
}

export type ToDoItemStatus = 'to-do' | 'in-progress' | 'done'
export type ToDoItemPriority = 'low' | 'medium' | 'high'


// Dto
export type TodosDto = ToDoItem[]