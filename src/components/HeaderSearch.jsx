import React from 'react';
import {ReactComponent as Back} from '../assets/images/back.svg';
import Button from './Button.jsx';
import { Search } from 'react-feather'


function HeaderSearch({navigator, db, setSearchKeyword, handleSearch}) {
  let formContainer = React.createRef();
  let searchRef = React.createRef();
  return (
    <>
            <div className="art_option">
                <Button onClick={()=>navigator('home')} className="art_null art_back_btn" children={<Back />} />
            </div>
            <div className="art_option">
              <form action="" className="art_search_form" ref={formContainer} onSubmit={(e)=>{
                e.preventDefault();
                handleSearch(searchRef.current.value, db, setSearchKeyword,navigator);
              }
              }>
                <div className="art_search_inpu_co">
                  <label htmlFor={"search"}><Search /></label>
                  <input type="search" name="search"  id="search" className="art_input_header" placeholder="IMEI(last 5 digits)/Device name" ref={searchRef} autoFocus={true} />
                </div>
              </form>
            </div>
        </>
  );
}

export default HeaderSearch;
