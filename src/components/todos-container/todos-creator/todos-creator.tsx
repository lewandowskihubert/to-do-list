import {
    Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState, useMemo, useEffect, ReactNode } from "react";
import { uid } from "uid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { apiService } from "../../../services/api/api.service";
import { ToDoItem, ToDoItemPriority } from "../../../services/api/types";
import {
  removeTodosToEdit,
  selectTodoToEdit,
} from "../../../slices/todos-slice";
import { TodosCreatorContainer } from "../../../styled/todos-creator-container/todos-creator-container";
import { TodosCreatorColumn } from "../../../styled/todos-creator-container/todos-creator-column";
import { triggerTodoListRefreshNeededEvent } from "../../../utils/utils";

interface FormData {
  name: string;
  description: string;
  priority: ToDoItemPriority;
}

const getFormDataDefaults = (): FormData => ({
  name: "",
  description: "",
  priority: "low",
});

const TodosCreator: React.FC = () => {
  // const { todoToEdit, setTodoToEdit } = useContext(TodosContext)
  const todoToEdit = useAppSelector(selectTodoToEdit);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>(getFormDataDefaults());
  const isInEditMode = useMemo(() => {
    return Boolean(todoToEdit);
  }, [todoToEdit]);

  useEffect(() => {
    if (isInEditMode) {
      setFormData({
        name: todoToEdit!.name,
        description: todoToEdit!.description,
        priority: todoToEdit!.priority,
      });
    } else {
      setFormData(getFormDataDefaults());
    }
  }, [isInEditMode, todoToEdit]);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeSelectHandler = (
    e: SelectChangeEvent<"low" | "medium" | "high">,
    child: ReactNode
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const dataToSend: ToDoItem = {
      ...formData,
      id: uid(),
      status: "to-do",
      plannedExecutionDate: new Date("05/31/2023").toISOString(),
    };

    await apiService.addTodo(dataToSend);

    triggerTodoListRefreshNeededEvent();

    setFormData(getFormDataDefaults());
  };

  const editTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const dataToSend: ToDoItem = {
      ...(todoToEdit as ToDoItem),
      ...formData,
    };

    dispatch(removeTodosToEdit());

    await apiService.editTodo(todoToEdit!.id, dataToSend);

    triggerTodoListRefreshNeededEvent();

    setFormData(getFormDataDefaults());
  };

  return (
    <TodosCreatorContainer>
      <form onSubmit={isInEditMode ? editTodo : saveTodo}>
        <TodosCreatorColumn>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            title="name"
            name="name"
            value={formData.name}
            onChange={changeHandler}
          />
        </TodosCreatorColumn>
        <TodosCreatorColumn>
          <TextField
            id="outlined-multiline-flexible"
            title="description"
            name="description"
            value={formData.description}
            label="Description"
            multiline
            maxRows={4}
            onChange={changeHandler}
          />
        </TodosCreatorColumn>
        <TodosCreatorColumn>
            <span>
          <InputLabel id="priority-select">Priority</InputLabel>
          <Select
            title="priority"
            name="priority"
            labelId="priority-select"
            id="priority-select-autowidth"
            value={formData.priority}
            onChange={changeSelectHandler}
            autoWidth
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          </span>
          <span>
        {isInEditMode ? <Button type="submit" variant="contained">Edit Task</Button> : <Button type="submit" variant="contained">Add Task</Button>}
        </span>
        </TodosCreatorColumn>
      </form>
    </TodosCreatorContainer>
  );
};

export default TodosCreator;
