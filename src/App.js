import React, {useEffect, useState} from 'react';
import  Login  from './components/LoginForm.jsx';
import  Home  from './components/Home.jsx';
import  Search  from './components/Search.jsx';
import  SearchResults from './components/SearchResults.jsx';
import  DeviceDetails from './components/DeviceDetails.jsx';
import  EditDevice from './components/EditDevice.jsx';
import "./assets/styles/main.css";
import {API} from './config';
import axios from 'axios'
import { DBConfig } from './components/recentSearchDBConfig';
import { initDB } from 'react-indexed-db';
import { useIsMounted } from './components/UseIsMounted.js';
import BottomBar from './components/BottomBar.jsx';
import LogRocket from 'logrocket';
import Command from './components/Command.jsx';
import AddAccount from './components/AddAccount.jsx';
import Accounts from './components/Accounts.jsx';
import Profile from './components/Profile.jsx';
import Map from './components/Map.jsx';

try {
  LogRocket.init('yk4gzw/trackgree-mo');
  initDB(DBConfig);
} catch (error) {
  console.error(error);
}


/**
 * Get the token from local storage and verify that is not expired.
 * @returns {Promise<string> || Promise<object>}
 */
async function getToken() {
  let token = localStorage.getItem('token')?.split('"').join('');

  if (token) {
    // verify token
    return axios.post(API+'/verify-token', {
      token
      }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
      }).then(response => {
        response.data = {...response.data,token}
        return response.data;
      });
    
  }

  return null;
}

// "VeLauNaEv1" 
async function handleLogin (event, username, password, remember , setlLoading, setError) {
  let response = await  axios.post(API+'/login',{ "username":username, "password":password, "remember":remember}
  ).catch(error => {
    setlLoading(false);
    setError("error");
    console.log(error);
    return{data: {
      status: "error",
      msg: "There was Network error while trying to login. Please try again"
    }};
  });

  response = response.data;
    
  if (response.status === 'success') {
    return response.token;
  } else {
    return  response;
  }
} 

function App() {
  const [_token, setToken] = useState(null);
  const [currentPage, _setPage] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [viewDevice, setviewDevice] = useState({});
  const [showBottomBar, setShowBottomBar] = useState(true);

  const isMounted = useIsMounted();
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem('user')) 
  );
  // Save previous page to session storage
  const setPage = (page) => {
    
    if ( currentPage.trim() !== '' && (currentPage.toLowerCase() !== "editdevice" )) {
      localStorage.setItem('previousPage', currentPage);
    } else {
      localStorage.setItem('previousPage', 'map');
    }
    localStorage.setItem('currentPage', page);
    _setPage(page);
  }
const [currentMapDevice, setCurrentMapDevice] = useState('all');
  useEffect(() => {
    if(isMounted.current){
      _token === null && getToken().then(verifiedToken =>{
          if(verifiedToken&&verifiedToken.status === 'success') {
            setToken(verifiedToken.token);
            localStorage.setItem('user', JSON.stringify( verifiedToken.data));

            // get previous page from localStorage
            let currentPage = localStorage.getItem('currentPage');
            
            if (currentPage&& currentPage.trim() !== '' && ( currentPage.toLowerCase() === "editdevice" || currentPage.toLowerCase() === "command" || currentPage.toLowerCase() === "devicedetails")) {
             currentPage = 'Map'
            }else {
              currentPage === null && (currentPage = 'Map') && localStorage.setItem('currentPage', 'Map');
            }
            if (currentPage.toLowerCase() === "login" && _token !== '') {
              currentPage = 'Map'
            }
            setPage(currentPage);
          } else {
            setToken("");  
            setPage("login");
          }
      }).catch(error =>{
          setToken("");
          setPage("login");
          console.error(error);
      });
      document.title = 'Trackgree';
      document.title = currentPage[0]?.toUpperCase()+currentPage?.slice(1)?.toLowerCase()+' | Trackgree'||'Trackgree';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted,currentPage]);

  if(!showBottomBar ) {
    document.documentElement.style.setProperty('--bottombarBorderHeight', '0px');
    document.documentElement.style.setProperty('--bottombarHeight', '0px');
  }else {
    document.documentElement.style.setProperty('--bottombarBorderHeight', '1px');
    document.documentElement.style.setProperty('--bottombarHeight', 'calc(var(--initialBottomBarHeight) + var(--bottombarBorderHeight))');
  }
  
  if(_token !== ''){
    return (
      <div className="App">
        {/* HOME/DEVICES */}
        { (currentPage.toLowerCase() === "map") ? <Map  navigator={setPage} setviewDevice={setviewDevice} setShowBottomBar={setShowBottomBar} setCurrentMapDevice={setCurrentMapDevice} currentTab={currentMapDevice} /> : "" }
        { (currentPage.toLowerCase() === "home") ? <Home  navigator={setPage} setviewDevice={setviewDevice} setShowBottomBar={setShowBottomBar} setCurrentMapDevice={setCurrentMapDevice} /> : "" }
        {/* SEARCH FIELD */}
        { (currentPage.toLowerCase() === "search") ? <Search  navigator={setPage} setSearchKeyword={setSearchKeyword} setviewDevice={setviewDevice} setShowBottomBar={setShowBottomBar} /> : "" }
        {/* SEARCH RESULTS */}
        { (currentPage.toLowerCase() === "searchresults") ? <SearchResults  navigator={setPage} search={searchKeyword} setSearchKeyword={setSearchKeyword} setviewDevice={setviewDevice} setShowBottomBar={setShowBottomBar}  setCurrentMapDevice={setCurrentMapDevice} /> : "" }
        {/* DEVICE DETAILS */}
        { (currentPage.toLowerCase() === "devicedetails") ? <DeviceDetails navigator={setPage} search={searchKeyword} setSearchKeyword={setSearchKeyword} setviewDevice={setviewDevice} device={viewDevice} currentPage={currentPage} setShowBottomBar={setShowBottomBar} /> : "" }
        {/* EDIT DEVICE DETAILS */}
        { (currentPage.toLowerCase() === "editdevice") ? <EditDevice navigator={setPage} search={searchKeyword} setSearchKeyword={setSearchKeyword} setviewDevice={setviewDevice} device={viewDevice} setShowBottomBar={setShowBottomBar} /> : "" }
        {/* ACCOUNT */}
        { (currentPage.toLowerCase() === "accounts") ? <Accounts navigator={setPage} setShowBottomBar={setShowBottomBar}  setSelectedUser={setSelectedUser} /> : "" }
        {/* ADD ACCOUNT */}
        { (currentPage.toLowerCase() === "addaccount") ? <AddAccount navigator={setPage} setShowBottomBar={setShowBottomBar} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> : "" }
        {/* COMMAND */}
        { (currentPage.toLowerCase() === "command") ? <Command navigator={setPage} search={searchKeyword} setSearchKeyword={setSearchKeyword} setviewDevice={setviewDevice} device={viewDevice} setShowBottomBar={setShowBottomBar} /> : "" }
        {/* COMMAND */}
        { (currentPage.toLowerCase() === "profile") ? <Profile navigator={setPage}   /> : "" }
        {/* SHOW BOTTOM NBAR */}
        { showBottomBar && <BottomBar navigator={setPage} currentTab={currentPage} setShowBottomBar={setShowBottomBar} /> }
      </div>
    );
  }
  return  _token ==="" ? <div className="App"> <Login handleSubmit={handleLogin} navigator={setPage} />  </div>: '';
}

export default App;
