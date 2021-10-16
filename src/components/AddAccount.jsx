import React, { useEffect } from 'react';
import Header from './Header.jsx'

import {createAccount, fetchAccountTypes,} from './fetchProducts'
import HeaderEditDevice from './HeaderEditDevice.jsx';
import  Button  from './Button.jsx';
import { X } from 'react-feather';
import Loader from "./Loader.jsx";



function AddAccount({navigator, setShowBottomBar, selectedUser, setSelectedUser }) {

const [accountTypes, setAccountTypes] = React.useState({});
    // useEffect and clean up after 
    // component mount and unmount
    useEffect(() => {
        setShowBottomBar(false);
        fetchAccountTypes(selectedUser.privileges.type).then(accountTypes => {
          if(accountTypes.status === 'success') {
            let ops = {};
            accountTypes.data.forEach(type => {
              ops[type.name.toLowerCase()] = type;
            });
            setAccountTypes(ops);
          }
        });
        return () => {
          return null
        }
  // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
let createAccountElements = [
  {
      type: 'input',
      element: 'input',
      name: 'manager_id',
      label: 'Superior Account',
      required: true,
      ref: React.useRef(),
      value: (selectedUser.account_name.trim() !== '') ? selectedUser.account_name : selectedUser.username,
      disabled: true,
  },
  {
      type: 'select',
      element: 'select',
      name: 'account_type',
      label: 'Account Type',
      options: accountTypes,
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'text',
      element: 'input',
      name: 'account_name',
      label: 'Customer Name',
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'text',
      element: 'input',
      name: 'username',
      label: 'Username',
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'password',
      element: 'input',
      name: 'password',
      label: 'Password',
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'email',
      element: 'input',
      name: 'email',
      label: 'Email',
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'tel',
      element: 'input',
      name: 'phone',
      label: 'Phone',
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'text',
      element: 'input',
      name: 'country',
      label: 'Country',
      required: true,
      value: '',
      ref: React.useRef(),
      disabled: false,
  },
  {
      type: 'text',
      element: 'input',
      name: 'company',
      label: 'Company Name',
      required: false,
      value: '',
      ref: React.useRef(),
      disabled: false,
  }
];
    

const [data , setData] = React.useState(createAccountElements);
 // Get previousPage from localStorage
 let previousPage = localStorage.getItem('previousPage');
 previousPage = (previousPage === null ? 'home' : previousPage);
const [isLoading, setIsLoading] = React.useState(false);
const [statusMsg, setStatusMsg] = React.useState("Loading ...");
 const [dismissLoader, setDismissLoader] = React.useState(false);


  return (

    <div className="art_main art_main_initial">
        <Header children={<HeaderEditDevice navigator={navigator} name={"Add Account"} back={previousPage} setShowBottomBar={setShowBottomBar} setSelectedUser={setSelectedUser} /> } navigator={navigator} />

        {isLoading && (dismissLoader)&& <Loader text={statusMsg} dismiss={setIsLoading}/>}
        {isLoading && (!dismissLoader)&& <Loader text={statusMsg} />}


        <div>


            <form onSubmit={(e)=>{
                e.preventDefault();
                setIsLoading(true);
                // check if all fields are filled
                let isValid = true, invalidMsg= 'Field [field] can not be empty', message = '';
                data.forEach(field => {
                    // check element is select
                    if(field.element === 'select') {
                        if(field.ref.current.value.trim() === '') {
                            field.ref.current.value =accountTypes[accountTypes[selectedUser.privileges.type.toLowerCase()].apply[0].toLowerCase()].value;
                        }
                    }
                   
                    // check if field is required
                    if(field.required && field.ref.current?.value?.trim() === '') {
                        isValid = false; 
                        invalidMsg = invalidMsg.replace('[field]', field.label);
                        return invalidMsg;
                    }
                    // email validation
                    if(field.type === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field.value)) {
                        isValid = false;
                        message = 'Invalid email address';
                        return message
                    }
                    // phone validation with country code optional
                    if(field.type === 'tel' && !/^\+?[0-9]{6,}$/i.test(field.value)) {
                        isValid = false;message = 'Invalid phone number';
                        return message;
                    }
                    
                    // password validation
                    if(field.type === 'password' && field.value.length < 6) {
                        isValid = false;message = 'Password must be at least 6 characters long';
                        return message;
                    }
                }
                );
                
                if(isValid) {
                    setDismissLoader(false);
                    setStatusMsg('Creating...');
                 
                    let  _data={
                        user: {
                            id: selectedUser.id,
                            manager_id: selectedUser.manager_id,
                            account_type: selectedUser.privileges.type,
                            username: selectedUser.username,
                            superior_id: (selectedUser.superior_id||0),
                            privileges: selectedUser.privileges,
                        },
                        accountName: '',
                        username: '',
                        password: '',
                        accountType: '',
                        info: {
                            name: '',
                            email: '',
                            company: '',address: '',
                            post_code: '',
                            city: '',
                            country: '',
                            phone1: '',
                            phone2:'',
                        },
                    },accountData = _data;
                    // set account data as it is presented in accountData object
                    data.forEach(field => {
                        if (field.name === 'account_name') {
                            accountData.accountName = field.ref.current.value;
                            accountData.info.name = field.ref.current.value;
                        }
                        if (field.name === 'username') {
                            accountData.username = field.ref.current.value;
                        }
                        if (field.name === 'password') {
                            accountData.password = field.ref.current.value;
                        }
                        if (field.name === 'account_type') {
                            accountData.accountType = field.ref.current.value;
                        }
                        if (field.name === 'phone') {
                            accountData.info['phone1'] = field.ref.current.value;
                        }
                        if (field.name === 'country') {
                            accountData.info.country = field.ref.current.value;
                        }
                        if (field.name === 'email') {
                            accountData.info.email = field.ref.current.value;
                        }
                        if (field.name === 'company') {
                            accountData.info.company = field.ref.current.value;
                        }
                    }); 
   
                    createAccount(accountData).then(res => {
                        
                        if(res.status === "success") {
                            setDismissLoader(true);
                            if ('message' in res) {
                                setStatusMsg(res.message);
                            } else if ('msg' in res ) {
                                setStatusMsg(res.msg);
                            } else {
                                setStatusMsg('Account created successfully');
                            }
                            setTimeout(() => {
                                setIsLoading(false);
                                setDismissLoader(false);
                               let _data_ = data.map(field => {
                                    if (field.name !== 'account_type'&&field.name !== 'manager_id') {
                                        field.ref.current.value = '';
                                        field.value = '';
                                    }
                                    return field
                                });
                                setData([..._data_]);
                                accountData = _data;
                            }, 2000);
                        } else {
                            setDismissLoader(true);
                            setDismissLoader(true);
                            if ('message' in res) {
                                setStatusMsg(res.message);
                            } else if ('msg' in res ) {
                                setStatusMsg(res.msg);
                            } else { 
                                setStatusMsg('Account creation failed');
                            }
                            setTimeout(() => {
                                setIsLoading(false);
                                setDismissLoader(false);
                            }, 2000);
                        }
                    });
                }
                else {
                    if (message === '') {
                        setDismissLoader(true);
                        setStatusMsg(invalidMsg);
                    }
                    else {
                        setDismissLoader(true);
                        setStatusMsg(message);
                    }
                    setTimeout(() => {
                        if(isLoading) {
                            setDismissLoader(false);
                            setIsLoading(false);
                        }
                        
                    }, 2000);
                }
         
            }} className="form_edit_device">

                {data.map((input, index)=>{
                    input.ref.current= {value : input.value};
                    return (
                        <div className="art_form_group" key={index}>
                            <label className="art_form_label" htmlFor={`art_form_input_${index}`}>{input.label}</label>
                            {
                              input.element === 'select'? <select className="art_form_input" id={`art_form_input_${index}`} name={input.name} ref={input.ref} onChange={(e)=>{
                                input.value = e.target.value;
                                setData([...data]);
                              }
                              } dir="rtl">
                                {
                                 Object.keys(accountTypes).length &&
                                  accountTypes[selectedUser.privileges.type.toLowerCase()].apply.map((option, index)=>{ 
                                    
                                    if(typeof accountTypes[option.toLowerCase()] !== 'undefined') {
                                      return (
                                          <option key={index} value={accountTypes[option.toLowerCase()].value}>{accountTypes[option.toLowerCase()].name}</option>
                                      )
                                    }
                                    return null;
                                }
                                )}
                                </select> : <input className="art_form_input" id={`art_form_input_${index}`} type={input.type}  value={input.ref.current?.value||input.value} onChange={(e)=>{
                                if(input.name.toLowerCase() === "plate no."){
                                    data[index].value = e.target.value.toUpperCase();
                                }else {
                                    data[index].value = e.target.value;
                                }
                                setData([...data]);
                            }} placeholder={input.label} 
                            onFocus={(e)=>{
                                 if (e.target) { 
                                     let clearBtn = e.target.parentElement.querySelector('.art_clear_btn');
                                     if(clearBtn && e.target.value.trim() !== ''){
                                        clearBtn.classList.add('active');
                                     }
                                 }
                            }}
                            onKeyUp={(e)=>{
                               if (e.target) { 
                                     let clearBtn = e.target.parentElement.querySelector('.art_clear_btn');
                                     if(clearBtn && e.target.value.trim() !== ''){
                                        clearBtn.classList.add('active');
                                     }else {
                                        clearBtn.classList.remove('active');
                                     }
                                 }
                            }}
                            onBlur={(e)=>{
                                 if (e.target) { 
                                     let clearBtn = e.target.parentElement.querySelector('.art_clear_btn');
                                     if(clearBtn){
                                         setTimeout(() => {
                                             clearBtn.classList.remove('active');
                                         }, 1);
                                        
                                     }
                                 }
                            }}
                            disabled={input.disabled}
                            />
                            }
                            
                            <Button className="art_clear_btn" name={<X />} onClick={(e)=>{
                                data[index].value = '';
                                setData([...data]);
                            }} />
                        </div>
                    )
                })}

                <Button className="art_submit_btn" name={"Save"} type="submit" />
            </form>
        </div>
    </div>
  );
}
export default AddAccount;
