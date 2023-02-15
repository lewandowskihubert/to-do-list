
import TodosCreator from "./todos-creator/todos-creator"
import TodosList from "./todos-list/todos-list"

const TodosContainer: React.FC = () => {
    return <div>
            <TodosCreator />
            <TodosList />
    </div>
}

export default TodosContainer