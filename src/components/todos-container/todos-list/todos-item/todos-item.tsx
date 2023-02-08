import { useAppDispatch } from "../../../../app/hooks"
import { apiService } from "../../../../services/api/api.service"
import { ToDoItem, ToDoItemStatus } from "../../../../services/api/types"
import { setTodosToEdit, updateToDoStatus } from "../../../../slices/todos-slice"
import { TodosItemActions } from "../../../../styled/todos-item-actions/todos-item-actions"
import { TodosItemContainer } from "../../../../styled/todos-item-container/todos-item-container"
import { TodosItemInfo } from "../../../../styled/todos-item-info/todos-item-info"
import { triggerTodoListRefreshNeededEvent } from "../../../../utils/utils"


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
            <span>Name: {todo.name}</span>
            <span>Description: {todo.description}</span>
            <span>Priority: {todo.priority}</span>
        </TodosItemInfo>
        <TodosItemActions>
            <button type="button" onClick={editItem}>Edit</button>
            <button type="button" onClick={deleteItem} >Delete</button>
      {todo.status === 'done' ? <></> :  <button type="button" onClick={ () => {handleUpdateTodoStatus(todo.id, todo.status === 'to-do' ? 'in-progress' : 'done')}}>
        {todo.status ==='to-do' ? <>Turn to</> : <>Done</>} </button>}      
        </TodosItemActions>

    </TodosItemContainer>
}

export default TodosItem