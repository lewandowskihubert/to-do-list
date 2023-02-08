
import TodosCreator from "./todos-creator/todos-creator"
import TodosList from "./todos-list/todos-list"

const TodosContainer: React.FC = () => {
    return <>
            <TodosCreator />
            <TodosList />
    </>
}

export default TodosContainer