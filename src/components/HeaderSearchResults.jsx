import React from 'react';

import {ReactComponent as Back} from '../assets/images/back.svg';
import Button from './Button.jsx';


function HeaderSearchResults({navigator, search, db, setSearchKeyword,handleSearch}) {
  return (
    <>
      <div className="art_option">
          <Button onClick={()=>{
            navigator('search')
          }} className="art_null art_back_btn" children={<Back />} />
      </div>
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
