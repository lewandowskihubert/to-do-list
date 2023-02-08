import { ToDoItem, ToDoItemStatus, TodosDto } from "./types"

const apiServiceDef = () => {
    //Private properties 
    const baseUrl = `http://localhost:3001`

    const getTodos = async (): Promise<TodosDto> => {
        try {
            const response = await fetch(`${baseUrl}/todos`);
            const todos: TodosDto = await response.json()
            return todos;
        } catch (error) {
            console.log(error);
            return []
        }
    }

    const addTodo = async (todo: ToDoItem): Promise<void> => {
        try {
            await fetch(`${baseUrl}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const editTodo = async (id: string, todo: ToDoItem): Promise<void> => {
        try {
            await fetch(`${baseUrl}/todos/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async (id: string): Promise<void> => {
        try {
            await fetch(`${baseUrl}/todos/${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.log(error);
        }
    }
    const updateTodoStatus = async (id: string, status: ToDoItemStatus): Promise<void> => {
        try {
            await fetch(`${baseUrl}/todos/${id}/status`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
        } catch (error) {
            console.log(error);
        }
    }


    // return { getTodos, addTodo, deleteTodo, editTodo } -> rozwiazanie poprawne ale dla czytelnosci uzywamy wersji nizej
    return { addTodo, deleteTodo,updateTodoStatus ,editTodo, storeMethods: { getTodos } }
}


export const apiService = apiServiceDef()