import {AnimatedSign, HeaderContainer} from "../.././styled/header/header"
import HandwritingAnimation from "./hand-writing-animation"


const Header : React.FC = () => {
    return <HeaderContainer>
        
         <HandwritingAnimation>Manage your time!</HandwritingAnimation>
         </HeaderContainer>
}

export default Header