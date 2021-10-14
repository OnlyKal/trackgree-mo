import React, {useRef} from 'react'
import Button from '../Button.jsx'

let handleCancelModal = (e, modal, showMenu)=> {
    modal = modal.current;
    modal.classList.add('hide');
    if (typeof showMenu === "function"){
        showMenu(false);
    }
}
let handleShowModal = ( modal)=> {
    modal = modal.current;
    if (modal) {
        modal.classList.remove('hide');
        modal.classList.add('show');
    }
 
}
export default function Menu({showMenu, show, elements,}) {
    const modal = useRef();
    show&&handleShowModal(modal);

    return (
        <div className={show?"art_menu_modal":"art_menu_modal hide"} ref={modal}>
            <span className="art_menu_modal_layer" onClick={e=>handleCancelModal(e, modal,showMenu)}></span>
            <div className="art_menu_modal_content">
                {
                    (elements && elements.length)>0?elements.map((item, index)=>{
                        if(item.product){
                            return (
                                <Button name={item.name} className="art_menu_modal_btn" key={index} onClick={e=>{
                                    item.handleClick(e,item.product);
                                    handleCancelModal(e, modal,showMenu);
                                }} />
                            )
                        } else {
                            return (
                                <Button name={item.name} className="art_menu_modal_btn" key={index} onClick={e=>{
                                    item.handleClick(e);
                                    handleCancelModal(e, modal,showMenu);
                                }} />
                            )
                        }
                    }): ''
                }
            </div>
            <div className="art_menu_modal_footer">
                <Button name="Cancel" className="art_menu_modal_btn" onClick={e=>handleCancelModal(e, modal,showMenu)} />
            </div>
        </div>
    )
}
