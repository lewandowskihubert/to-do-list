import { Button, IconButton } from "@mui/material"
import { useAppDispatch } from "../../../../app/hooks"
import { apiService } from "../../../../services/api/api.service"
import { ToDoItem, ToDoItemStatus } from "../../../../services/api/types"
import { setTodosToEdit, updateToDoStatus } from "../../../../slices/todos-slice"
import { TodosItemActions } from "../../../../styled/todos-item-actions/todos-item-actions"
import { TodosItemContainer } from "../../../../styled/todos-item-container/todos-item-container"
import { TodoListItemDescription, TodoListItemName, TodosItemInfo } from "../../../../styled/todos-item-info/todos-item-info"
import { triggerTodoListRefreshNeededEvent } from "../../../../utils/utils"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StartIcon from '@mui/icons-material/Start';
import DoneIcon from '@mui/icons-material/Done';


interface TodosItemProps {
    todo: ToDoItem
}

const TodosItem: React.FC<TodosItemProps> = ({ todo }) => {
    // const {setTodoToEdit} = useContext(TodosContext)

    const dispatch = useAppDispatch();
    const deleteItem = async (): Promise<void> => {
        await apiService.deleteTodo(todo.id)
        triggerTodoListRefreshNeededEvent()
    }

    const editItem = (): void => {
        dispatch(setTodosToEdit(todo))
    }

    const handleUpdateTodoStatus = async (id:string, status: ToDoItemStatus) => {
        dispatch(updateToDoStatus({...todo, status }));
        await apiService.editTodo(id, {...todo, status})
        triggerTodoListRefreshNeededEvent();
        

    };
    
    return <TodosItemContainer>
        <TodosItemInfo>
        <TodoListItemName>{todo.name}</TodoListItemName>
        <TodoListItemDescription>{todo.description}</TodoListItemDescription>
        </TodosItemInfo>
        <TodosItemActions>
        <IconButton type="button" size="small" aria-label="edit" onClick={editItem}>
            <EditIcon fontSize="small"/>
            </IconButton>
        <IconButton type="button" size="small" aria-label="delete" onClick={deleteItem}>
        <DeleteIcon  fontSize="small"/>
        </IconButton>
      {todo.status === 'done' ? <></> :  <IconButton size="small" type="button" onClick={ () => {handleUpdateTodoStatus(todo.id, todo.status === 'to-do' ? 'in-progress' : 'done')}}>
        {todo.status ==='to-do' ? <StartIcon/> : <DoneIcon/>} </IconButton>}      
        </TodosItemActions>

    </TodosItemContainer>
}

export default TodosItem