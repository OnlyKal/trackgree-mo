// Template Literals with embedded JSX
// Language: javascript/React

import { ReactComponent as  ILogo} from '../assets/images/logo.svg';

let Logo = () => {
    return (

        <div className="art_logo">
            <ILogo />
        </div>
    );
}; 

export default Logo;