import React from 'react';
import Products from './Products.jsx';
import Button from '../components/Button.jsx';
import {ChevronRight} from 'react-feather';

function handleClick(e,name, groupContainer, length,setActiveGroup, navigator) {
  e.preventDefault();

  if(length > 0) {
    let totalMargin = (8*length) - 8;
    let elementsHeight = (66+totalMargin) * length;
    let Timer ;

    clearTimeout(Timer);

    if (groupContainer.current&&groupContainer.current.classList.contains('active') ) {
        groupContainer.current.style.maxHeight = 1+ 'px';

        setActiveGroup('', name);
        groupContainer.current.classList.remove('active');
        e.currentTarget.classList.remove('active');
    }  else { 
        if(groupContainer&&groupContainer.current ) {
            // for(let i = 0; i < elementsHeight; i++) {
            //         // setTimeout((current) => {
            //                 groupContainer.current.style.maxHeight = i + 'px';
            //         // }, i * 0.1, groupContainer.current);
            // }
            groupContainer.current.style.maxHeight =  elementsHeight+ 'px';
            Timer = setTimeout((current) => {
                if(current.classList.contains('active')) {
                    current.style.maxHeight = 'initial';
                    clearTimeout(Timer);
                }
            }, elementsHeight*10, groupContainer.current);

            setActiveGroup('active', name);
            groupContainer.current.classList.add('active');
            e.currentTarget.classList.add('active');
        }
    }
  }
}

function setActiveGroup(status, name) {
  localStorage.setItem('activeGroup'+parseGroupName(name), status);
}
function parseGroupName(groupName='') {
  groupName = String(groupName);
  
  groupName = groupName.split(' ').join('_');
  return groupName;
}

function ProductGroup({products, name="Default Group", showMenu, menuElements, index, setviewDevice, navigator, showGroups, setShowGroups,setSelectedGroupDevice,  setCurrentMapDevice, }) {
    let groupContainer = React.useRef();
    let activeGroup = localStorage.getItem('activeGroup'+parseGroupName(name)) === null? undefined: localStorage.getItem('activeGroup'+parseGroupName(name));

  return (
    <div className={"art_groups_co "}>
      
      <Button name={name} className={index === 0&&typeof activeGroup === "undefined"?"art_group_btn active": "art_group_btn "+activeGroup} onClick={(e)=>handleClick(e, name, groupContainer, products.length, setActiveGroup)} beforeContent={<ChevronRight />} afterContent={<span>{"( "+ products.length + " )"}</span>} />

      <div className={index === 0&&typeof activeGroup === "undefined"?"product-group active": "product-group "+activeGroup} ref={groupContainer}>
      {products.length > 0 ? products.map((product, index)=>{
        return (
            <Products key={product.imei+index} status={product.status||"nodata"} speed={product.speed&&product.status?product.speed: product.statusTime} product={product} showMenu={showMenu} menuElements={menuElements} setviewDevice={setviewDevice} navigator={navigator} showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice} setCurrentMapDevice={setCurrentMapDevice} />
             )
          }) : ''}
          </div>
    </div>
  );
}

export default ProductGroup;
