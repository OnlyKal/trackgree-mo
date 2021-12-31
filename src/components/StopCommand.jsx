import React from 'react';
import Button from './Button';
import { sendCommand } from './fetchProducts';

// Host, port and password are required
let inputs = [
    
    {
        name: 'user_password',
        label: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Account Password'
    }
];

function StopCommand({active, setActive, device, setCommand, setCommandResponse, }) {
    let userPassword = React.useRef(null);
    const [currentUserPassword, setCurrentUserPassword] = React.useState('');
    
    return  (<div className={active?"art_modal active":"art_modal" }>
            <span className="art_layer" onClick={()=>{ 
                setActive(false);
            }}></span>
            <div className="art_modal_content"> 
                <div className="art_modal_header">
                    <h2>{"Enter account password"}</h2>
                </div> 
                <form className="server-command" onSubmit={(e) =>{
                    e.preventDefault();
                    setActive(false);
                    // Show sending command
                    setCommand("Custom");
                    // Send command
                    let accountPassword = userPassword.current.value;
                    sendCommand(device.imei, "Stop", "Stop", device.protocol, accountPassword).then(response => {
                        response = response.data;

                        if('msg' in response) {
                            setCommandResponse(response['msg']);
                        } 
                        if('message' in response) {
                            setCommandResponse(response['message']);
                        }
                    });
                    setCurrentUserPassword('');
                    userPassword.current.value = "";
                }}>
                    {inputs.map((input, index) => {
                        return (
                            <div className="art_input" key={index}>
                                <input type={input.type} placeholder={input.placeholder} name={input.name} ref={userPassword} value={currentUserPassword} onChange={(e)=> setCurrentUserPassword( e.target.value)} />
                            </div>
                        )
                    })}
                    <Button className="art_send_command" name={'Send'} type="submit" />
                </form>
            </div>
        </div>
  )
}

export default StopCommand;
