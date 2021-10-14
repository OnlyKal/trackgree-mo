import React, {useState} from "react";
import Menu from './Modal/Menu.jsx'
import Header from './Header.jsx'
import ProductTabs from './ProductTabs.jsx';
import AllTab from './AllTab.jsx';
import HeaderDevices from './HeaderDevices.jsx';

import Loader_img from '../assets/images/hug.gif';
import SetGroups from "./SetGroups.jsx";

export default function Home({navigator,setviewDevice, setCurrentMapDevice}) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuElements, setMenuElements] = useState([]);
    const [currentTab, _setCurrentTab] = useState('All');
    const [statics, setStatics] = useState({
        all: 0,
        online: 0,
        offline: 0,
        inactive: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showGroups, setShowGroups] = React.useState(false);
    const [selectedGroupDevice, setSelectedGroupDevice] = React.useState({});

    let tabRef = React.useRef();
    const tabCo = React.useRef();   

    let _setCurrentTab_ = React.useRef();
    let setCurrentTab ;

    let isMounted = React.useRef(true);
    React.useEffect(() => {
        if(isMounted.current) {
            _setCurrentTab_.current = (value) => {
            setIsLoading(true);
            _setCurrentTab(value); 
            setIsLoading(false);
        }
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);
    
    setCurrentTab = _setCurrentTab_.current;

    return (

        <div className="art_main" ref={tabCo}>
            {<Menu showMenu={setShowMenu} show={showMenu} navigator={navigator} elements={menuElements} /> }
            <Header children={<HeaderDevices navigator={navigator} />} navigator={navigator} />
            <ProductTabs navigator={navigator} currentTab={currentTab} setCurrentTab={setCurrentTab} statics={statics} setStatics={setStatics} tabRef={tabRef} setIsLoading={setIsLoading} />
            
            {showGroups?<SetGroups show ={showGroups} navigator={navigator} device={selectedGroupDevice} setShowGroups={setShowGroups} />: null}
            
            {isLoading && <div className="art_loading">
                <img src={Loader_img} alt="Loader gif" /></div> }

            {<AllTab showMenu={setShowMenu} currentTab={"All"} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} isActive={currentTab === 'All'}  showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice} setCurrentMapDevice={setCurrentMapDevice}  />}

            {<AllTab showMenu={setShowMenu} currentTab={"Online"} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} isActive={currentTab === 'Online'}  showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice}  setCurrentMapDevice={setCurrentMapDevice} />}

            {<AllTab showMenu={setShowMenu} currentTab={"Offline"} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} isActive={currentTab === 'Offline'} showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice}  setCurrentMapDevice={setCurrentMapDevice} />}
            
            {<AllTab showMenu={setShowMenu} currentTab={"Inactive"} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} isActive={currentTab === 'Inactive'} showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice} />}

            {/* {currentTab === 'All'&&<AllTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} />}
            {currentTab === 'Online'&&<AllTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} />}
            {currentTab === 'Offline'&&<AllTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} />}
            {currentTab === 'Inactive'&&<AllTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading} setviewDevice={setviewDevice} />} */}

            {/* {currentTab === 'All'&&<AllTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics} id={tabRef} active={true} setIsLoading={setIsLoading}/>}
        
            {currentTab === 'Online'&&<OnlineTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics}  id={tabRef} active={true} setIsLoading={setIsLoading}/>}

            {currentTab === 'Offline'&&<OfflineTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics}  id={tabRef} active={true} setIsLoading={setIsLoading}/>}

            {currentTab === 'Inactive'&&<InactiveTab showMenu={setShowMenu} currentTab={currentTab} setCurrentTab={setCurrentTab} menuElements={setMenuElements} navigator={navigator} setStatics={setStatics} statics={statics}  id={tabRef} active={true} setIsLoading={setIsLoading}/>} */}
            
        </div>
    )
}
