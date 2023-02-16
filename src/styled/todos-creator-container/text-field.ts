import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';

 
 
 
 export const MyTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#1976d2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
      },
    },
  });


   export const MySelect = styled(Select)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', 
      },
    },
  });