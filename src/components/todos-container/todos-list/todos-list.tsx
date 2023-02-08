import TodosItem from "./todos-item/todos-item";
import { useEffect } from "react";
import { TodosListContainer } from "../../../styled/todos-list-container/todos-list-container";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getTodosAsync,
  selectIsTodosListLoading,
  selectTodos,
} from "../../../slices/todos-slice";
import { TodosDto } from "../../../services/api/types";
import Loading from "../../loading/loading";

const TodosList: React.FC = () => {
  const todos: TodosDto = useAppSelector(selectTodos);
  const isTodosListLoading: boolean = useAppSelector(selectIsTodosListLoading);
  const dispatch = useAppDispatch();

  const sortedTodos = todos.slice().sort((a, b) => {
    if (a.priority === "high") return -1;
    if (b.priority === "high") return 1;
    if (a.priority === "medium") return -1;
    if (b.priority === "medium") return 1;
    return 0;
  });

  const getTodosData = async (): Promise<void> => {
    dispatch(getTodosAsync());
  };

  useEffect(() => {
    getTodosData();
  }, []);

  useEffect(() => {
    const listener = () => {
      getTodosData();
    };

    document.addEventListener("todoListRefreshNeeded", listener);

    return () => {
      document.removeEventListener("todoListRefreshNeeded", listener);
    };
  }, []);

  const notCompletedTodos = sortedTodos.filter(
    (todo) => todo.status === "to-do"
  );

  const inProgressTodos = sortedTodos.filter(
    (todo) => todo.status === "in-progress"
  );
  const doneTodos = sortedTodos.filter((todo) => todo.status === "done");

  return (
    <TodosListContainer>
      {isTodosListLoading && <Loading />}
      <div>
        <h2>Todo:</h2>
        {notCompletedTodos.map((todo) => (
          <TodosItem key={todo.id} todo={todo} />
        ))}
      </div>
      <div>
        <h2>In progress:</h2>
        {inProgressTodos.map((todo) => (
          <TodosItem key={todo.id} todo={todo} />
        ))}
      </div>
      <div>
        <h2>Done:</h2>
        {doneTodos.map((todo) => (
          <TodosItem key={todo.id} todo={todo} />
        ))}
      </div>
    </TodosListContainer>
  );
};

export default TodosList;
