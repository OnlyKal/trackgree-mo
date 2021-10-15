import React from 'react';
import Header from './Header.jsx'
import HeaderSearchResults from './HeaderSearchResults.jsx'
import Loader_img from '../assets/images/hug.gif';
import Menu from './Modal/Menu.jsx'
import AllTab from './AllTab.jsx';
import {handleSearch} from './fetchProducts'

import {  useIndexedDB } from 'react-indexed-db';
import SetGroups from './SetGroups.jsx';

function SearchResults({navigator, search, setSearchKeyword,setviewDevice, setCurrentMapDevice }) {
    const [isLoading, setIsLoading] = React.useState(true);
    
    const [showMenu, setShowMenu] = React.useState(false);
    const [menuElements, setMenuElements] = React.useState([]);

    const tabRef = React.useRef(null);

    const [showGroups, setShowGroups] = React.useState(false);
    const [selectedGroupDevice, setSelectedGroupDevice] = React.useState({});

  const db = useIndexedDB('recents');

  return (

    <div className="art_main art_main_search">
    {<Menu showMenu={setShowMenu} show={showMenu} navigator={navigator} elements={menuElements} /> }

    {showGroups?<SetGroups show ={showGroups} navigator={navigator} device={selectedGroupDevice} setShowGroups={setShowGroups} />: null}

        <Header children={<HeaderSearchResults navigator={navigator} search={search} setSearchKeyword={setSearchKeyword} handleSearch={handleSearch} db={db} /> } navigator={navigator} />
        {isLoading && <div className="art_loading">
                <img src={Loader_img} alt="Loader gif" /></div> }

            <AllTab showMenu={setShowMenu} currentTab={"search?q="+search} setCurrentTab={()=>null} menuElements={setMenuElements} navigator={navigator} setStatics={()=>null} statics={{}} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice}isActive={true} showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice} setCurrentMapDevice={setCurrentMapDevice} />
    </div>
  );
}

export default SearchResults;
