import React from 'react';
import Header from './Header.jsx'

import HeaderProfile from './HeaderProfile.jsx';
 
import {
  ReactComponent as ProfileImage 
} from '../assets/images/UserProfile.svg';
import Loader from './Loader.jsx';
import Button from './Button.jsx';
import { updateAccountPassword } from './fetchProducts.js';

function Profile({navigator,}) {

    
let inputData = [
  {
      name: 'prevPassword',
      label: 'Current Password',
      value: '',
      required: true,
      ref: React.useRef(),
      type: 'password',

  },
  {
      name: 'newPassword',
      label: 'New Password',
      value: '',
      required: true,
      ref: React.useRef(),
      type: 'password',
  },
  {
      name: 'confirmedPassword',
      label: 'Repeat Password',
      value: '',
      required: true,
      ref: React.useRef(),
      type: 'password',
  },
];


const [data , setData] = React.useState(inputData);
const [isLoading, setIsLoading] = React.useState(false);
const [statusMsg, setStatusMsg] = React.useState("Loading ...");
const [dismissLoader, setDismissLoader] = React.useState(false);

//  Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="art_main art_main_initial">
      <div>
          <Header children={<HeaderProfile navigator={navigator} /> } navigator={navigator} className="art_profile_header"  />

          {isLoading && (dismissLoader)&& <Loader text={statusMsg} dismiss={setIsLoading}/>}
        {isLoading && (!dismissLoader)&& <Loader text={statusMsg} />}
    
          <div className="art_option_header">
            <div className="art_user_profile">
              <ProfileImage className="art_user_profile_icon" />
            </div>
              <h4>{user.account_name.trim() === '' ? user.username.toUpperCase() : user.account_name.toUpperCase() }</h4>
          </div>
        <form className="art_profile_container form_edit_device" onSubmit={(e) =>{
          e.preventDefault();
          // setIsLoading(true);
          // setStatusMsg("Updating ...");
          let changingData = {};
          // map data to changingData by name
          data.forEach(item => {
            changingData[item.name] = item.value;
          });

          // check required fields are not empty
          let isEmpty = false;
          // use forEach on data array
          data.forEach(item => {
            if(item.required && item.value.trim() === ''){
              isEmpty = true;
            }
          });
          // if any required field is empty alert user
          if(isEmpty){
            setDismissLoader(true);
            setIsLoading(true);
            setStatusMsg('Please fill all required fields');
            
          } else {


            // check if new password and confirmed password are the same
            if(changingData.newPassword !== changingData.confirmedPassword){
              setDismissLoader(true);
              setIsLoading(true);
              setStatusMsg("Password does not match");
              return;
            }
            
            setDismissLoader(false);
            setIsLoading(true);
            setStatusMsg("Updating ...");

            // submit data to server
            updateAccountPassword(changingData).then(res => {
             
              setDismissLoader(true);
              setIsLoading(true);
              if ('msg' in res) setStatusMsg(res.msg);
              if ('message' in res) setStatusMsg(res.message);
              // loggout user

            }).catch(err => {
              setDismissLoader(false);
              setIsLoading(false);
              console.log(err);
              // setStatusMsg(err.message);
            })

        }
          // 


        }}>
          <div className="art_profile_op ">
              <h4>Change Password</h4>
          </div>
          {data.map((input, index)=>{
            input.ref.current= {value : input.value};
            return (
                <div className="art_form_group" key={index}>
                    <label className="art_form_label" htmlFor={`art_form_input_${index}`}>{input.label}</label>
                    <input className="art_form_input" id={`art_form_input_${index}`} type={input.type}  value={input.ref.current.value?input.ref.current.value:input.value} onChange={(e)=>{
                        
                        data[index].value = e.target.value;
                        
                        setData([...data]);
                    }} placeholder={input.label} name={input.name} 
                    
                    
                    />
                    
                </div>
            )
          })}

          <Button className="art_submit_btn" name={"Save"} type="submit" />
        </form>
      </div>
        
    </div>
  );

}

export default Profile;
