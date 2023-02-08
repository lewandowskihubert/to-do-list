import { CircularProgress } from "@mui/material"
import { LoadingContainer } from "../../styled/loading-container/loading-container"

const Loading = () => {
    return <LoadingContainer>
        <CircularProgress />
    </LoadingContainer>
}

export default Loading