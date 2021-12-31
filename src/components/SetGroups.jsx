import React, { Fragment }  from 'react';
import { fetchGroups, setGroup } from './fetchProducts';

function SetGroups({device,show=false, setShowGroups,}) {
    let isMounted = React.useRef(false);
    let [groups, setGroups] = React.useState([]);
    let [isLoading, setIsLoading] = React.useState(true);
    let [error, setError] = React.useState(null);
    let [selected, setSelected] = React.useState('0');
    let select = React.useRef('');

    React.useEffect(() => {
        isMounted.current = true;
        if (isMounted.current){
            fetchGroups().then(data => {
                data = data.data;
                    if (isMounted.current) {
                        if(data && data.length > 0){
                        setGroups(data);
                        setIsLoading(false);
                    }
                }
            })
            .catch(err => {
                if (isMounted.current) {
                    setError(err);
                    setIsLoading(false);
                }
            });
        }
        return () => {
            isMounted.current = false;
        };
    }, []);

  return (
    <div className={show?"art_menu_modal art_set_group_modal":"art_menu_modal art_set_group_modal "}>
        <div className="modal-content">
            <div className="modal-header">
                <h2>{"Set Device Group"}</h2>
                <button type="button" className="close" onClick={()=>{
                    setShowGroups(false);
                }} >&times;</button>
            </div>
            <div className="modal-body">
                {isLoading ? <div className="loader"></div> :null}
                {error ? <div className="error">{error}</div> : null}
                {(!isLoading && !error) &&
                    <select className="art_set_group_modal_content" name="group_id" value={selected} ref={select} onChange={(e)=>{
                        e.preventDefault();
                        setSelected(e.target.value);
                    }}>
                        {
                            groups.length > 0 ?
                            groups.map(group => {
                                
                                return (
                                    <Fragment key={group.group_id}>
                                    {
                                        group.group_desc.trim() !== "" ? <optgroup label={group.group_desc}>
                                        <option className="art_set_group_modal_content_item" value={group.group_id}>
                                            {group.group_name}
                                        </option>
                                        </optgroup> : <option className="art_set_group_modal_content_item" value={group.group_id} >
                                            {group.group_name}
                                        </option>
                                    }
                                    
                                    </Fragment>
                                )
                            }) /* && setSelected(_selected) */: <div className="art_set_group_modal_content_item">{"No groups found"}</div>
                           
                        }
                    </select>
                }
                
            </div>
            <div className="modal-footer">
                {
                    groups.length > 0 ? <>
                     <button className="art_set_group_modal_cancel" onClick={()=>{
                        setShowGroups(false);
                    }}>{"Cancel"}</button>
                     <button className="art_set_group_modal_save" onClick={(w)=>{ 
                        w.target.innerText = "Saving...";
                        
                         setGroup(device.imei, select.current.value).then(data => {
                             data = data.data;
                             
                            if(data.status === "success"){
                                w.target.innerText = "Saved";
                                setTimeout(()=>{
                                    setShowGroups(false);
                                },1000);
                            }
                            else {
                                w.target.innerText = "Save";
                                alert("Error saving group");
                            }
                        });

                     }}>{"Save"}</button> 
                    </> : null
                }
            </div>
        </div>
    </div>
  );
}

export default SetGroups;
