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
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TodosCreatorCentering } from "../../../styled/todos-creator-container/todos-creator-centering";
import { MyTextField, MySelect } from "../../../styled/todos-creator-container/text-field";
import { FormContainer } from "../../../styled/todos-creator-container/form-container";
import { display } from "@mui/system";
import { MyForm } from "../../../styled/form/styled-form";

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
  }
  
  return (
      
      <TodosCreatorContainer>
        <FormContainer>
        <MyForm onSubmit={isInEditMode ? editTodo : saveTodo}>
          <TodosCreatorColumn>
            <MyTextField
              inputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: "white",
                  },
                },
              }}
              id="outlined-basic"
              label="Name your task..."
              title="name"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              variant="outlined"
            />
          </TodosCreatorColumn>
          <TodosCreatorColumn>
            <MyTextField
              inputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: "white",
                  },
                },
              }}
              id="outlined-multiline-flexible"
              title="description"
              name="description"
              value={formData.description}
              label="Describe your task..."
              multiline
              maxRows={4}
              onChange={changeHandler}
              sx={{ color: "white" }}
            />
          </TodosCreatorColumn>
          <TodosCreatorColumn>
            <span>
              <MySelect
                title="priority"
                name="priority"
                labelId="priority-select"
                id="priority-select-autowidth"
                value={formData.priority}
                onChange={changeSelectHandler as (event: SelectChangeEvent<unknown>, child: ReactNode) => void}
                autoWidth
                label="Priority"
                sx={{bgcolor:'#1976d2', color:'white'}}
                
              >
                <MenuItem  value="low">Optional</MenuItem>
                <MenuItem value="medium">Important</MenuItem>
                <MenuItem value="high">Urgent</MenuItem>
              </MySelect>
            </span>
            <span>
              {isInEditMode ? (
                <Button type="submit" variant="contained">
                  Edit Task
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Add Task
                </Button>
              )}
            </span>
          </TodosCreatorColumn>
        </MyForm>
        </FormContainer>
      </TodosCreatorContainer>
   
  );
};

export default TodosCreator;
