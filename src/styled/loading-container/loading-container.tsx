import styled from 'styled-components'

export const LoadingContainer = styled.div`
    width: 100%;
    position: absolute;
    top: -10px;
    min-height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    opacity: 0.7;
    filter: blur(4px);
`