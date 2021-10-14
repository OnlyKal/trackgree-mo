import React from 'react';
import Button from './Button';
import { sendCommand } from './fetchProducts';

function ServerCommand({active, setActive, device, setCommand, setCommandResponse,}) {
    const host = React.useRef('');
    const port = React.useRef('');
    const userPassword = React.useRef('');
    const [currentHost, setHost] = React.useState('');
    const [currentPort, setPort] = React.useState('');
    const [currentUserPassword, setCurrentUserPassword] = React.useState('');

    // Host, port and password are required
    let inputs = [
        {
            name: 'host',
            label: 'Host',
            type: 'text',
            required: true,
            placeholder: 'Host or IP',
            ref: host,
            onChange: (e) => setHost(e.target.value),
            value: currentHost?.current?.value,
        },
        {
            name: 'port',
            label: 'Port',
            type: 'number',
            required: true,
            placeholder: 'Port',
            ref:port,
            onChange: (e) => setPort(e.target.value),
            value: currentPort?.current?.value,
        },
        {
            name: 'user_password',
            label: 'Password',
            type: 'password',
            required: true,
            placeholder: 'Account Password',
            ref: userPassword,
            onChange: (e) => setCurrentUserPassword(e.target.value),
            value: currentUserPassword?.current?.value,
        }
    ];

    return  (<div className={active?"art_modal active":"art_modal" }>
            <span className="art_layer" onClick={()=>{ 
                setActive(false);
            }}></span>
            <div className="art_modal_content"> 
                <div className="art_modal_header">
                    <h2>{"Server Command"}</h2>
                </div> 
                <form className="server-command" onSubmit={(e) =>{
                    e.preventDefault();
                    setActive(false);
                    setActive(false);
                    // Show sending command Modal
                    setCommand("Custom");
                    // Send command
                    let _host = host.current.value;
                    let _port = port.current.value;
                    let accountPassword = userPassword.current.value;
                    sendCommand(device.imei, "Server", "Server", device.protocol, accountPassword, _host, _port).then(response => {
                        response = response.data;

                        if('msg' in response) {
                            setCommandResponse(response['msg']);
                        } 
                        if('message' in response) {
                            setCommandResponse(response['message']);
                        }
                    });
                    setHost('');
                    setPort('');
                    setCurrentUserPassword('');
                    host.current.value = "";
                    port.current.value = "";
                    userPassword.current.value = "";
                }}>
                    {inputs.map((input, index) => {
                        return (
                            <div className="art_input" key={index}>
                                <input type={input.type} placeholder={input.placeholder} name={input.name} ref={input.ref} value={input.value} onChange={input.onChange} readOnly onFocus={(e)=>e.target.removeAttribute('readonly')} onBlur={(e)=>e.target.setAttribute('readonly', '')} />
                            </div>
                        )
                    })}
                    <Button className="art_send_command" name={'Send'} type="submit" />
                </form>
            </div>
        </div>
  )
}

export default ServerCommand;
