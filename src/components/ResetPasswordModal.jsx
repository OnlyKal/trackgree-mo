
import React from 'react';
import { resetAccountPassword } from './fetchProducts';

function ResetPasswordModal({show=false, setShow, selectedUser, setSelectedUser, setStatusMsg, setIsLoading, setDismissLoader}) {

    let submitBtn = React.useRef('');
    
    return (
        <div className={show?"art_menu_modal art_create_group_modal":"art_menu_modal art_create_group_modal "}>
            <div className="modal-content" >
                <div className="modal-header">
                    <h2>{"Reset Password : "} <span>{(selectedUser.account_name.trim()!==''?selectedUser.account_name: selectedUser.username)}</span></h2>
                    <button type="button" className="close" onClick={()=>{
                        setShow(false);
                    }} >&times;</button>
                </div>
                <div className="modal-body">
                    {
                        "Are you sure you want to reset this account's password?"
                    }
                </div>
                <div className="modal-footer">
                    
                    <button className="art_set_group_modal_cancel" onClick={()=>{
                            setShow(false);
                    }} type="reset">{"Cancel"}</button>
                    <button className="art_set_group_modal_save" ref={submitBtn} type="button" onClick={()=>{
  
                        setIsLoading(true);
                        setStatusMsg("Resetting...");
                        submitBtn.current.disabled = true;
                        submitBtn.current.innerHTML = "Resetting...";
                        resetAccountPassword({id: selectedUser.id}).then((data) => {
                            
                                submitBtn.current.disabled = false;
                                submitBtn.current.innerHTML = "Reset";
                                setDismissLoader(true);
                                setTimeout(() => {
                                    if(show) setShow(false);
                                }, 2500);
                            if(data.status === "success") {
                                if ('message' in data) {
                                    setStatusMsg(data.message);
                                }else if('msg' in data) {
                                    setStatusMsg(data.msg);
                                } else {
                                    setStatusMsg("Account password was successfully reset");
                                }
                            }else {
                                if ('message' in data) {
                                    setStatusMsg(data.message);
                                }else if('msg' in data) {
                                    setStatusMsg(data.msg);
                                } else {
                                    setStatusMsg("Error resetting password");
                                }
                            }

                            // setTimeout(()=>{
                            //     submitBtn.current.disabled = false;
                            //     setIsLoading(false);
                            //     setDismissLoader(true);
                            //     setShow(false);
                            //     setStatusMsg("");
                            // } ,2000);
                        });

                    }}>{"Reset"}</button> 
                    
                    
                </div>
            </div>
        </div>
    );
}
export default ResetPasswordModal;
