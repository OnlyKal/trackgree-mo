import React from "react";
import Header from './Header.jsx'
import HeaderSearch from './HeaderSearch.jsx'
import {ChevronRight} from 'react-feather';
import {  useIndexedDB } from 'react-indexed-db';
import {handleSearch} from './fetchProducts'

export default function Search({navigator, setSearchKeyword, setCurrentMapDevice}) {
    const [recents, setRecents] = React.useState([]);

    const db = useIndexedDB('recents');

    
    let isMounted = React.useRef(true);
    React.useEffect(() => {
        if (isMounted.current) {
            db.getAll().then(recents => {
                if (recents) {
                    setRecents(recents);
                }
            });
        }
        return () => {
            isMounted.current = false;
        };
    // eslint-disable-next-line 
    }, [isMounted]);

    return (
        <div className="art_main">
            <Header children={<HeaderSearch navigator={navigator} db={db} setSearchKeyword={setSearchKeyword} handleSearch={handleSearch}  setCurrentMapDevice={setCurrentMapDevice}/>} navigator={navigator} />
                <div className="art_search_main">
                    { recents.length ?<><div className="art_recents_container">  {recents.slice(0).reverse().map((recent, index) => {
                            return (
                                    <button key={index} className="art_search_item_title" onClick={()=>handleSearch(recent.word, db, setSearchKeyword,navigator, true)}>
                                        <span>{recent.word}</span>
                                        <ChevronRight />
                                    </button>
                            )
                        })}</div> <div className="art_clear_history_container">
                            <button className="art_clear_history_button" onClick={() => { db.clear(); setRecents([]); }}>Clear history</button>
                        </div></>:""
                    }   
                </div>
        </div>
    )
}
