import React from 'react';
import { addGroup } from './fetchProducts';

function AddGroup({show=false, setShow,}) {

    let form = React.useRef('');
    let groupName = React.useRef('');
    let groupDescription = React.useRef('');
    let submitBtn = React.useRef('');



  return (
    <div className={show?"art_menu_modal art_create_group_modal":"art_menu_modal art_create_group_modal "}>
        <form className="modal-content" ref={form} onSubmit={(e)=>{
            e.preventDefault();
            if(groupName.current.value.trim() !== ''){
                submitBtn.current.disabled = true;
                submitBtn.current.innerText = 'Creating...';
                addGroup(groupName.current.value, groupDescription.current.value).then(data=>{
                    data = data.data;
                    
                    if(data.status === "success"){
                        submitBtn.current.innerText = 'Create';
                        submitBtn.current.disabled = false;
                        form.current.reset();
                        setShow(false);
                    }
                    else {
                        submitBtn.current.innerText = 'Create';
                        submitBtn.current.disabled = false;
                        if('msg' in data ) alert(data.msg);
                        if ('message' in data) alert(data.message)
                            
                    }
                });
            }
        }}>
            <div className="modal-header">
                <h2>{"Create New Group"}</h2>
                <button type="button" className="close" onClick={()=>{
                    setShow(false);
                }} >&times;</button>
            </div>
            <div className="modal-body">
              
                 
                <div className="form-group">
                    <label htmlFor="groupName">{'Group Name'}</label>
                    <input type="text" className="form-control" id="groupName" placeholder="Enter Group Name" ref={groupName} />
                </div>
                <div className="form-group">
                    <label htmlFor="groupDescription">{"Group Description"}</label>
                    <textarea type="text" className="form-control" id="groupDescription" placeholder="Enter Group Description" ref={groupDescription}></textarea>
                </div>
                        
                
            </div>
            <div className="modal-footer">
               
                     <button className="art_set_group_modal_cancel" onClick={()=>{
                        setShow(false);
                    }} type="reset">{"Cancel"}</button>
                     <button className="art_set_group_modal_save" ref={submitBtn} type="submit">{"Create"}</button> 
               
                
            </div>
        </form>
    </div>
  );
}

export default AddGroup;
