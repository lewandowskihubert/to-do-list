import styled from "styled-components"


export const HeaderContainer = styled.div `

text-align: center;




`

export const AnimatedSign = styled.p`
font-weight: bold;
font-size: 2.5rem;
color: #3D58B6;

white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #333;
  animation: typing 2s steps(20) forwards;
  text-shadow: 1px 1px 0 #fff, 2px 2px 0 #fff, 3px 3px 0 #fff, 4px 4px 0 #333;

  @keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
`