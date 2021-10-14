import React from 'react';
import {ReactComponent as Home } from '../assets/images/bottomBarIcons/Home.svg';
import {ReactComponent as List } from '../assets/images/bottomBarIcons/List.svg';
// import {ReactComponent as Alert } from '../assets/images/bottomBarIcons/Alerts.svg';
import {ReactComponent as Profile } from '../assets/images/bottomBarIcons/Profile.svg';
import {ReactComponent as HomeFilled } from '../assets/images/bottomBarIcons/filled/HomeFilled.svg';
import {ReactComponent as ListFilled } from '../assets/images/bottomBarIcons/filled/ListFilled.svg';
// import {ReactComponent as AlertFilled } from '../assets/images/bottomBarIcons/filled/AlertsFilled.svg';
import {ReactComponent as ProfileFilled } from '../assets/images/bottomBarIcons/filled/ProfileFilled2.svg';
import { Plus, Search } from 'react-feather';
import Menu from './Modal/Menu';
import AddGroup from './AddGroup';
// import ImportDevice from './ImportDevice';
// import CreateAccount from './CreateAccount';

function handleAdd(showMenu,menuElements, setShowAddGroup,   /*setShowImportDevice, setShowCreateAccount, */navigator) {
  
  let _menuElements = [
    // {
    //   name: 'Import new device',
    //   handleClick:(e)=> setShowImportDevice(true),
    // },
    { 
        name: "Add new group",
        handleClick:()=> setShowAddGroup(true),
    },
    {
        name: 'Create new account',
        handleClick:()=> {
          navigator('addaccount')
          // setShowCreateAccount(true)
        },
    },
  ];
  showMenu(true);menuElements(_menuElements);
}

function BottomBar({navigator,currentTab}) {
  // Button elements [home, list, alert, profile]
  const [showMenu, setShowMenu] = React.useState(false);
  const [menuElements, setMenuElements] = React.useState([]);
  const [showAddGroup, setShowAddGroup] = React.useState(false);
  // const [showImportDevice, setShowImportDevice] = React.useState(false);
  // const [showCreateAccount, setShowCreateAccount] = React.useState(false);
  

  currentTab = currentTab.toLowerCase();

  let buttonElements = [
    {
      title: "Home",
      icon: Home,
      iconFilled: HomeFilled,
      onClick: () => {
        navigator('Map')
      },
      status: currentTab === 'map' ? 'filled' :'' ,
      className: ''
    },
    {
      title: "List",
      icon: List,
      iconFilled: ListFilled,
      onClick: () => {
        navigator('Home');
      },
      status: currentTab === 'home' ? 'filled' :'' ,
      className: ''
    },
    {
      title: "",
      icon: Plus,
      iconFilled: Plus,
      onClick:()=> handleAdd(setShowMenu,setMenuElements, setShowAddGroup, /* setShowImportDevice, */  /* setShowCreateAccount, */navigator),
      status: '',
      className: 'add_btn'
    },
    // {
    //   title: "Alert",
    //   icon: Alert,
    //   iconFilled: AlertFilled,
    //   onClick: () => {},
    //   status: currentTab === 'alert' ? 'filled' :'' ,
    //   className: ''
    // },
    {
      title: "Search",
      icon: Search,
      iconFilled: Search,
      onClick: () => {
        navigator('Search');
      },
      status: currentTab === 'search' ? 'filled' :'' ,
      className: currentTab === 'search' ? 'filled' :''
    },
    {
      title: "Profile",
      icon: Profile,
      iconFilled: ProfileFilled,
      onClick: () => {
        navigator('Profile');
      },
      status: currentTab === 'profile' ? 'filled' :'' ,
      className: ''
    }
  ];

  return (
    <div className="art_bottom_nav">

    {<Menu showMenu={setShowMenu} show={showMenu} navigator={navigator} elements={menuElements} /> }
    { showAddGroup && <AddGroup show={showAddGroup} setShow={setShowAddGroup} />}
    {/* { showImportDevice && <ImportDevice show={showImportDevice} setShow={setShowImportDevice} />} */}
    {/* { showCreateAccount && <CreateAccount show={showCreateAccount} setShow={setShowCreateAccount} />} */}
      {
        buttonElements.map((button, index) => {
          return (
            <div className={"art_bottom_nav_button "+button.className+' '+button.status} onClick={button.onClick} key={index}>
              {
                button.status === 'filled' ? <button.iconFilled className="art_bottom_nav_button_icon filled" /> : <button.icon className="art_bottom_nav_button_icon" />
              }
              {
                button.title !== '' ? <span className="art_bottom_nav_button_title">{button.title}</span> : ''
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default BottomBar;
