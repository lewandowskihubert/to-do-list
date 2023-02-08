import { useState, useMemo, useEffect } from 'react'
import { uid } from 'uid';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiService } from '../../../services/api/api.service';
import { ToDoItem, ToDoItemPriority } from '../../../services/api/types';
import { removeTodosToEdit, selectTodoToEdit } from '../../../slices/todos-slice';
import { TodosCreatorContainer } from '../../../styled/todos-creator-container/todos-creator-container';
import { triggerTodoListRefreshNeededEvent } from '../../../utils/utils';

interface FormData {
    name: string;
    description: string;
    priority: ToDoItemPriority
}

const getFormDataDefaults = (): FormData => ({
    name: '',
    description: '',
    priority: 'low'
})

const TodosCreator: React.FC = () => {
    // const { todoToEdit, setTodoToEdit } = useContext(TodosContext)
    const todoToEdit = useAppSelector(selectTodoToEdit)
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<FormData>(getFormDataDefaults())
    const isInEditMode = useMemo(() => {
        return Boolean(todoToEdit)
    }, [todoToEdit])

    useEffect(() => {
        if (isInEditMode) {
            setFormData({
                name: todoToEdit!.name,
                description: todoToEdit!.description,
                priority: todoToEdit!.priority
            })
        } else {
            setFormData(getFormDataDefaults())
        }

    }, [isInEditMode, todoToEdit])

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const changeSelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const saveTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const dataToSend: ToDoItem = {
            ...formData,
            id: uid(),
            status: 'to-do',
            plannedExecutionDate: new Date('05/31/2023').toISOString(),
        }

        await apiService.addTodo(dataToSend)

        triggerTodoListRefreshNeededEvent()

        setFormData(getFormDataDefaults())
    }

    const editTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const dataToSend: ToDoItem = {
            ...todoToEdit as ToDoItem,
            ...formData,
        }

        dispatch(removeTodosToEdit())

        await apiService.editTodo(todoToEdit!.id, dataToSend)

        triggerTodoListRefreshNeededEvent()

        setFormData(getFormDataDefaults())
    }

    return <TodosCreatorContainer>
        <form onSubmit={isInEditMode ? editTodo : saveTodo}>
            <div>
                <label>Name:</label>
                <input title='name' type="text" name='name' value={formData.name} onChange={changeHandler} />
            </div>
            <div>
                <label>Description:</label>
                <input title='description' type="text" name='description' value={formData.description} onChange={changeHandler} />
            </div>
            <div>
                <label>Priority:</label>
                <select title='priority' name='priority' value={formData.priority} onChange={changeSelectHandler}>
                    <option value='low'>low</option>
                    <option value='medium'>medium</option>
                    <option value='high'>high</option>
                </select>
            </div>
            {isInEditMode ? <button>Edit task</button> : <button>Add task</button>}
        </form>
    </TodosCreatorContainer>
}

export default TodosCreator