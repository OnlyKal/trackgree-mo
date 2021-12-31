import React from 'react';

function TabButton({title, Icon, status}) {
  return (
    <div className="tabButtonContainer">
        {status !== '' && <span className="art_tab_btn_status"></span>}
      <button className="art_nav_btn">
          {Icon}
          <span className="art_btn_title">{title}</span>
      </button>
    </div>
  );
}

export default TabButton;
