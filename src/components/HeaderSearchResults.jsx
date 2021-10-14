import React from 'react';

import {ReactComponent as Back} from '../assets/images/back.svg';
import Button from './Button.jsx';


function HeaderSearchResults({navigator, search, db, setSearchKeyword,handleSearch}) {
// const searchRef = React.useRef();
// const handleChangeSearchKeyword = (e) => {
//   setSearchKeyword(e.target.value);
// }
  return (
    <>
            <div className="art_option">
                <Button onClick={()=>{
                  navigator('search')
                }} className="art_null art_back_btn" children={<Back />} />
            </div>

            {/* <div className="art_option">
              <form action="" className="art_search_form"  onSubmit={(e)=>{
                e.preventDefault();
                handleSearch(searchRef.current.value, db, setSearchKeyword,navigator);
              }
              }>
                <div className="art_search_inpu_co">
                  
                <input type="search" name="search"  id="search"className="art_input_header" placeholder="IMEI(last 5 digits)/Device name" ref={searchRef} value={search||''} onChange={handleChangeSearchKeyword} />
                </div>
              </form>
            </div> */}
            <div className="art_option">
              <div className="art_search_inpu_co_b">
                <div className="art_search_inpu_b">
                  <span>{search}</span>
                </div>
              </div>
            </div>
        </>
  );
}

export default HeaderSearchResults;
