import React from 'react';
import Header from './Header.jsx'
import HeaderCommand from './HeaderCommand.jsx';

import {ReactComponent as DefaultIcon } from '../assets/images/car.svg';
import Button from './Button.jsx';
import { Power, RefreshCcw, Server, Settings } from 'react-feather';
import ServerCommand from './ServerCommand.jsx';
import StopCommand from './StopCommand.jsx';
import CommandModal from './Modal/CommandModal.jsx';
import { sendCommand } from './fetchProducts.js';

function handleSubmitCommand(e, device, command,setCommand, setCommandResponse, setModalActive) {
  e.preventDefault();
  
    setCommand('Custom');

    sendCommand(device.imei, 'Custom', command, device['protocol']).then((data) => {
      data = data.data;

      if('msg' in data) {
        setCommandResponse(data['msg']);
      } 
      if('message' in data) {
        setCommandResponse(data['message']);
      }
    }).catch( (error)=>{
      setModalActive(false);
      console.error(error);
    });
}

let _quickOptions =(device, setCommand,setModalActive,setCommandResponse)=>  [
  {
    name: (typeof device["params"] !== 'string' && 'pwrcut' in device["params"] && Number(device['params']['pwrcut']) >0) ? 'Start': 'Stop',
    icon: <Power />,
    onClick: () => {
      setCommand('Stop')
    }, //
    description: 'Start/Stop the vehicle',
    active: true,
  },

  {
    name: 'Reboot',
    icon: <RefreshCcw />,
    onClick: () => {
      setCommand('Reboot');

      sendCommand(device.imei, 'Reboot', 'Reboot', device['protocol']).then((data) => {
        data = data.data;

        if('msg' in data) {
          setCommandResponse(data['msg']);
        } 
        if('message' in data) {
          setCommandResponse(data['message']);
        }
        
      }).catch( (error)=>{
        setModalActive(false);
        console.error(error);
      });

    }, //
    description: 'Restart the device',
    active: true,
  },
  {
    name: 'Settings',
    icon: <Settings />,
    onClick: () => {
      return null
    }, //
    description: 'Settings for the device (SOS&CENTER Number)',
    active: false,
  },
  {
    name: 'Server',
    icon: <Server />,
    onClick: () => { 
      setCommand('Server')
    } , //
    description: 'Change the device server',
    active: true,
  },
];
 
function Command({navigator,device,}) {
  const [command, _setCommand] = React.useState('');

  const [modalActive, setModalActive] = React.useState(false);
  const [commandResponse, setCommandResponse] = React.useState('');
  
  const setCommand = (value) => {
    _setCommand(value);
    setModalActive(true);
  }
  const customCommand = React.useRef('');

  let quickOptions = {};
  if (Object.keys(device).length > 0) {
     quickOptions = _quickOptions(device, setCommand,setModalActive,setCommandResponse);
  } else {
    navigator('Home');
    return null;
  }

  
  return (
    <div className="art_main art_main_initial">
      <div>
          <Header children={<HeaderCommand navigator={navigator} /> } navigator={navigator} />
          <div className="art_main_content">
            <div className="art_device_details_container">
              <div className="art_device_details_container_header"> 
                <div className="art_device_icon">
                  <DefaultIcon />
                </div>
                <div className="art_device_details">
                  <h1 className="art_device_details_name">{device.name}</h1>
                  <div className="art_device_details_imei">
                    <span className="art_device_details_imei_label">IMEI:</span>
                    <span className="art_device_details_imei_value">{device.imei}</span>
                  </div>
                </div>
                <div className={"art_device_details_status "+device.status}>
                  <div className="art_wrap">
                    <span className="art_device_details_status_label">Status:</span>
                    <span className={"art_device_details_status_value "+device.status}></span>
                  </div>
                  <span className={"art_device_details_status_v "}>
                    {device.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="art_command_details_container">
            <div className="art_options">
              <div className="art_options_header">
                <h1 className="art_options_header_title">{"Quick Options"}</h1>
              </div>
              <div className="art_options_content">
                <div className="art_options_content_items">
                  {
                    quickOptions.map((option,index) => option.active &&
                      <button className="art_options_content_item" key={index} onClick={option.onClick}>
                        <span className="art_options_content_item_icon">{option.icon}</span>
                        <span className="art_options_content_item_label_title">{option.name}</span>
                        <span className="art_options_content_item_label_description">{option.description}</span>
                      </button>)
                  }
                </div>
              </div>
            </div>
            <form className="art_custom_option" onSubmit={(e) => {
              e.preventDefault();
              handleSubmitCommand(e,device, customCommand.current.value, setCommand, setCommandResponse, setModalActive);
            }} >
              <div className="art_custom_option_header">
                <h1 className="art_custom_option_header_title">{"Define a command"}</h1>
              </div>
              <div className="art_custom_option_content">
                <div className="art_custom_option_content_item">
                  <input name="command" id="command" cols="30" rows="10" ref={customCommand} placeholder="User defined command" />
                </div>
                
                  <Button type="submit" className="art_command_btn" name="Send" />
        
              </div>
            </form>
          </div>
        </div>
        {
          <ServerCommand active={command=== 'Server'&&modalActive} setActive={setModalActive} device={device} setCommand={setCommand} setCommandResponse={setCommandResponse} />
        }
        {
          <StopCommand active={command=== 'Stop'&&modalActive} setActive={setModalActive} device={device} setCommand={setCommand} setCommandResponse={setCommandResponse} />
        }
        {
          <CommandModal active={(command=== 'Reboot'||command=== 'Custom')&&modalActive} setActive={setModalActive} text={commandResponse.trim()!== '' ? commandResponse.trim(): null} setCommandResponse={setCommandResponse} />
        }
        
        </div>
      </div>
  );

}

export default Command;
