import React from 'react'
import Button from './Button.jsx'

function handleStatisticChange(statics={
    all: null,
    online: null,
    offline: null,
    inactive: null,
},tab='all') {
    tab = tab?.toLowerCase();
    
    try {
        if (statics && tab in statics) {
        return `${(statics[tab]!==null?'(':'')}${(statics[tab]!==null?statics[tab]:'')}${(statics[tab]!==null?')':'')}`;}
        return '';
    } catch (e) {
        console.error(e);
        return '';
    }
} 

export default function ProductTabs({statics, setCurrentTab, currentTab,
    setIsLoading}) {
   const handleTabsChange = (e, tabName) => {
        e.currentTarget.parentElement.parentElement.querySelector('.art_btn_tab.active').classList?.remove('active');
        e.currentTarget.classList.add('active');
        setCurrentTab(tabName);

    }
    return (
        <div className="art_product_tab_container">
            <Button className="art_btn_tab active" beforeContent={<span className="art_tabs_title">{`All`}</span>} onClick={e=>handleTabsChange(e, "All")} afterContent={<span>{`${handleStatisticChange(statics,'all')}`}</span>} />
            <Button className="art_btn_tab" beforeContent={<span className="art_tabs_title">{`Online`}</span>}  onClick={e=>handleTabsChange(e, "Online")}  afterContent={<span>{`${handleStatisticChange(statics,'online')}`}</span>} />
            <Button className="art_btn_tab" beforeContent={<span className="art_tabs_title">{`Offline`}</span>} onClick={e=>handleTabsChange(e, "Offline")} afterContent={<span>{`${handleStatisticChange(statics,'offline')}`}</span>} />
            <Button className="art_btn_tab" beforeContent={<span className="art_tabs_title">{`Inactive`}</span>} onClick={e=>handleTabsChange(e, "Inactive")} afterContent={<span>{`${handleStatisticChange(statics,'inactive')}`}</span>} />
        </div>
    )
}
