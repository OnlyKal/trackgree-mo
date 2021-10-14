import React,  { useRef, useState/* , useEffect */ } from "react";
import { Eye, EyeOff } from 'react-feather';
import Button  from './Button.jsx';
import Logo from "./Logo.jsx";
import Loader from "./Loader.jsx";
import ArtAlert from "./Alert.jsx";
import {ReactComponent as User} from '../assets/images/user.svg';
import {ReactComponent as Lock} from '../assets/images/lock-single.svg';

async function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

const LoginForm = ({handleSubmit, navigator}) => {

    let emailContainer = useRef();
    let passwordContainer = useRef();
    let handleInputFocus = (e) => {
        
        if(e.target.name === 'username') {
            emailContainer.current.classList.add('art_infocus');
        }
        if(e.target.name === 'password') {
            passwordContainer.current.classList.add('art_infocus');

        }
    };
    let handleInputBlur = (e) => {
      
        if(e.target.name === 'username') {
            emailContainer.current.classList.remove('art_infocus');
        }
        if(e.target.name === 'password') {
            passwordContainer.current.classList.remove('art_infocus');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setlLoading] = useState(false);
    const [artError, setError] = useState(null);
 
    return (
        <>
        {loading?
        <Loader text="Loging in..."/>:''}
        {artError?
        <ArtAlert text={artError} />:''}
      <Logo /> 
        <form onSubmit={async (e)=>{
            e.preventDefault();
            setlLoading(true);
            setError(null);

            if(typeof (username&&password) === 'string' && (typeof rememberPassword === 'boolean'||'string'))
            {
                if(username.trim() === '') {
                    setlLoading(false);
                    setError("Account username is required");
                    return;
                }
                if(password.trim() === '') {
                    setlLoading(false);
                    setError("Account password is required");
                    return;
                }

            }else{
                setlLoading(false);
                setError("Something is went wrong, please try again");
                 return;
            }
            
            let token = await handleSubmit(e,username,password , rememberPassword, setlLoading, setError);

            if (token?.status==="error"||token?.status==="failure") {
                setlLoading(false);
                setError(token.msg);
                return;
            }

            if(token) {
                setToken(token);
                navigator('Home');
                window.location.reload();
            }

            setlLoading(false);
            setError(token.msg);

        }} className="login-form art_checkbox_ex">
            <div className="login-form__inputs">
                <div className="login-form__inputs-item" ref={emailContainer}>
                    <label htmlFor="username">
                        <span>Email</span>
                        <span className="login-form__input_icon">
                            <User />
                        </span>
                    </label>
                    <input type="text" id="username"  name="username" placeholder="Username/Email" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={(e)=>setUsername(e.target.value) } value={username}/>
                </div>
                <div className="login-form__inputs-item" ref={passwordContainer}>
                    <label htmlFor="password">
                        <span>Password</span>
                        <span className="login-form__input_icon">
                            <Lock />
                        </span></label>
                    <input type="password" id="password" name="password" placeholder="Password" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={(e)=>setPassword(e.target.value) } value={password}/>

                    <button type="button" className="art_icon_btn show_pw" onClick={()=>{
                        setShowPassword(!showPassword);
                        !showPassword ? passwordContainer.current.querySelector('#password').type = 'text' : passwordContainer.current.querySelector('#password').type = 'password';
                        }}>
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>
            <div className="art_login_foot">
                <Button type="submit" className="primary"  name="Login" />
                <div className="art_remember_me_section">
                    <p>
                        <input type="checkbox" id="remember"name="remember"onChange={(e) => setRememberPassword(e.target.checked)}  checked={rememberPassword} />
                        <label htmlFor="remember">Remember</label>
                    </p>
                </div>
            </div>
        </form>
        </>
    )
};

export default LoginForm;