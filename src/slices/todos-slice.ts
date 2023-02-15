import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store'
import { apiService } from '../services/api/api.service';
import { ToDoItem, ToDoItemStatus, TodosDto } from '../services/api/types';

export interface TodosState {
    todos: TodosDto;
    todoToEdit: ToDoItem | null;
    isTodosListLoading: boolean;
}

const initialState: TodosState = {
    todos: [],
    todoToEdit: null,
    isTodosListLoading: false
};

export const getTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async () => { 
        return new Promise<TodosDto>((resolve) => {
            setTimeout(async () => {
                const data = await apiService.storeMethods.getTodos()
                resolve(data)
            }, 1000)
        })
        //return await apiService.storeMethods.getTodos()
    }
)

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodosToEdit: (state, action: PayloadAction<ToDoItem>) => {
            state.todoToEdit = action.payload
        },
        removeTodosToEdit: (state) => {
            state.todoToEdit = null
        },
        updateToDoStatus: (state , action: PayloadAction<{id: string, status: ToDoItemStatus}>) => {
            const {id, status} = action.payload;
            state.todos = state.todos.map(todo => {
                if(todo.id === id) {
                    todo.status = status
                } 
                return todo
            })

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.pending, (state) => {
                state.isTodosListLoading = true
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.todos = action.payload
                state.isTodosListLoading = false;
            })
            .addCase(getTodosAsync.rejected, (state) => {
                state.todos = []
                state.isTodosListLoading = false
            })
    }
})

//! Actions
export const { setTodosToEdit, removeTodosToEdit, updateToDoStatus } = todosSlice.actions;

//! Selectors
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodoToEdit = (state: RootState) => state.todos.todoToEdit;
export const selectIsTodosListLoading = (state: RootState) => state.todos.isTodosListLoading;

export default todosSlice.reducer;