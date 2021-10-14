import React,{ Fragment } from 'react';
import { fetchAccounts, fetchAccountsByID } from './fetchProducts';
import Loader_img from '../assets/images/hug.gif';
import Header from './Header';
import HeaderEditDevice from './HeaderEditDevice';
import AccountTypesIcons from './AccountTypesIcons';
import {ReactComponent as Caret} from '../assets/images/caret-right.svg';
import {ReactComponent as Reset}  from '../assets/images/lock.svg';
import {ReactComponent as AddUser}  from '../assets/images/add_user.svg';
import reactDom from 'react-dom';
import Loader from './Loader';
import ResetPasswordModal from './ResetPasswordModal';

let options = [
  {
    name: 'Reset',
    label: 'reset_password',
    icon: Reset,
    onClick: (navigator, setSelectedUser, user, setResetPassword, setResetPasswordUser) => {
      
      setResetPassword(true);
      setResetPasswordUser(user);
    }
  },{
      name: 'Add User',
      label: 'add_user',
      icon: AddUser,
      onClick: (navigator,setSelectedUser, user, setResetPassword, setResetPasswordUser) => {
        setSelectedUser(user);
        navigator('addaccount');
      }
    }
];

function Accounts({navigator, setShowBottomBar, setSelectedUser}) {
// get user from sessionStorage
  let _user = JSON.parse(sessionStorage.getItem('user'));

  const [user , setUser] = React.useState(_user);
  const [accounts , setAccounts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const isMounted = React.useRef(false);
  // clean up on unmount
  React.useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      setShowBottomBar(false);

      // fetch up on mount
      fetchAccounts().then((data) => {
        if('accounts' in data) {
          setAccounts(data.accounts);
        }
        if('user' in data) {
          setUser(data.user);
        }
        setIsLoading(false);

      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);
  let Icon = '', containerRef = React.useRef(null);
  if(!isLoading && Object.keys(user).length  > 0) {
   Icon = AccountTypesIcons(user.privileges.type);
  }
  if (typeof Icon !== 'object') {
    Icon = AccountTypesIcons('user');
  }

  const [_isLoading, _setIsLoading] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState("Loading ...");
   const [dismissLoader, setDismissLoader] = React.useState(false);


 const [resetPassword, setResetPassword] = React.useState(false);
 const [resetPasswordUser, setResetPasswordUser] = React.useState(user);

  return (
    <div className="art_main art_main_initial">

    <Header children={<HeaderEditDevice navigator={navigator} name={"Accounts"} back={'home'} setShowBottomBar={setShowBottomBar} /> } navigator={navigator} />
    {isLoading && <ArtLoading /> }

    {_isLoading && (dismissLoader)&& <Loader text={statusMsg} dismiss={_setIsLoading}/>}
    {_isLoading && (!dismissLoader)&& <Loader text={statusMsg} />}

    {resetPassword && <ResetPasswordModal show={resetPassword} setShow={setResetPassword} selectedUser={resetPasswordUser} setSelectedUser={setResetPasswordUser} setStatusMsg={setStatusMsg} setIsLoading={_setIsLoading} setDismissLoader={setDismissLoader} />}
    
    <div>
        {
          !isLoading && Object.keys(user).length > 0 &&
        <div className="art_accounts_container">
         <div className="art_account_container">
            {/* Dropdown caret*/}
            {
              user.totalSubAccounts > 0 && <button className="art_account_dropdown active" onClick={(e)=>handleDropdown(e,user.totalSubAccounts, user.id, navigator, setSelectedUser, setResetPassword, setResetPasswordUser )}> <Caret /> </button>
            }
            <button className="art_account_tab" >
              
              {/* Icon */}
              <div className={"art_account_icon "+ user.privileges.type }>
              {typeof Icon === "object" && <Icon />}
              </div>
                  
              <div className="art_account_name">{user.account_name.trim()==='' ? user.username.split(' ').map((e, i)=>{
                  if(i<user.username.split(' ').length-1) {
                      return  <Fragment key={i}>{e}&nbsp;</Fragment>
                  }
                  return e
                })
                 : user.account_name.split(' ').map((e, i)=>{
                  if(i<user.account_name.split(' ').length-1) {
                      return  <Fragment key={i}>{e}&nbsp;</Fragment>
                  }
                  return e
                })
                }</div>
                  <div className="art_account_balance">{'('+user.accountDevices +'/'+ user.totalDevices+')'}</div>
            </button> 
                <div className="art_account_option" >
                      {
                        options.map((option, index) => {
                          return (
                            <button className="art_account_option_button" key={index} onClick={()=>option.onClick(navigator, setSelectedUser, user, setResetPassword, setResetPasswordUser)}>
                              <option.icon />
                            </button>
                          );
                        })
                      } 
                </div>
              </div>
              
              {/* Sub Accounts */}
              {
                (user.totalSubAccounts > 0 && accounts && accounts.length)&&
                <div className="art_account_sub_container active" ref={containerRef}>
                  <RenderAccounts accounts={accounts} navigator={navigator} setSelectedUser={setSelectedUser} setResetPassword={setResetPassword} setResetPasswordUser={setResetPasswordUser} />
                </div>
              }
            </div>
 
      }
    </div>
  


    </div>

  );
}

function RenderAccounts({accounts, navigator, setSelectedUser, setResetPassword, setResetPasswordUser}) {
  let containerRef = React.useRef(null);
  return (
     
     accounts.map((account, index) => {
      let Icon = AccountTypesIcons(account.privileges.type.split(' ').join('_').toLowerCase());
      if (typeof Icon !== 'object') {
        Icon = AccountTypesIcons('user');
      }
      return (
          <div className="art_sub_accounts_container" key={index}>
          <div className="art_account_container">
              {/* Dropdown caret*/}
              {
                account.totalSubAccounts > 0 && <button className="art_account_dropdown" onClick={(e)=>handleDropdown(e,account.totalSubAccounts, account.id, navigator, setSelectedUser,setResetPassword,setResetPasswordUser )}> <Caret /> </button>
              }
            <button className="art_account_tab" key={index}>
              
              {/* Icon */}
              <div className={"art_account_icon "+ account.privileges.type.split(' ').join('').toLowerCase() }>
                {
                  typeof Icon === 'object' && <Icon /> 
                }
              </div>
             
              <div className="art_account_name">{account.account_name.trim()==='' ? account.username.split(' ').map((e, i)=>{
                  if(i<account.username.split(' ').length-1) {
                      return  <Fragment key={i}>{e}&nbsp;</Fragment>
                  }
                  return e
                })
                 : account.account_name.split(' ').map((e, i)=>{
                  if(i<account.account_name.split(' ').length-1) {
                      return  <Fragment key={i}>{e}&nbsp;</Fragment>
                  }
                  return e
                })
                }</div>
              <div className="art_account_balance">{'('+account.accountDevices +'/'+ account.totalDevices+')'}</div>
            </button>
                <div className="art_account_option">
                      {
                        options.map((option, index) => {
                          return (
                            <button className="art_account_option_button" key={index} onClick={()=>option.onClick(navigator, setSelectedUser, account, setResetPassword, setResetPasswordUser)}>
                              <option.icon />
                            </button>
                          );
                        })
                      } 
                </div>
                </div>
          
          {/* Sub Accounts */}
          {
            account.totalSubAccounts > 0 &&
            <div className="art_account_sub_container" ref={containerRef}>
            </div>
          }
        </div>

      );
    })
  )
}

function handleDropdown(e, len, id, navigator, setSelectedUser, setResetPassword, setResetPasswordUser) {
  let subAccount = e.currentTarget.parentElement.parentElement.querySelector('.art_account_sub_container');
  e.currentTarget.classList.toggle('active');

  if(subAccount&&subAccount.classList.contains('active')) {
    for (let i = 0; i < len; i++) {
        if(subAccount.children[i]){
          subAccount.children[i].classList.add('hide');
        }
      setTimeout(() =>  subAccount.classList.remove('active'), 300);
    }
  }
  else {
    if (subAccount &&subAccount.children.length) {
      for (let i = 0; i < len; i++) {
        if(subAccount.children[i]){
          subAccount.children[i].classList.add('active');
        }
        setTimeout(() => subAccount.classList.add('active'), 300);
      }
    } else {
      if(subAccount) {
        subAccount.classList.toggle('active');
        reactDom.render(<ArtLoading />, subAccount);
        
        if(subAccount.querySelector('.art_loading')) {
          fetchAccountsByID(id).then(data => {
            if ('accounts' in data && data.accounts.length > 0) {
              reactDom.render(<RenderAccounts accounts={data['accounts']} navigator={navigator} setSelectedUser={setSelectedUser} setResetPassword={setResetPassword} setResetPasswordUser={setResetPasswordUser} />, subAccount);
            }
          })
        }
       }
    }
  }
}

function ArtLoading() {
  return (<div className="art_loading">
  <img src={Loader_img} alt="Loader gif" /></div>)
}

export default Accounts;
