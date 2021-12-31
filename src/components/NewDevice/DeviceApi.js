import axios from "axios";
import {API} from '../../config';

async function fetchModelData (action){
      let url=''
      if(action==='model')url=API+'/device/models'
      else if(action==='account')url=API+'/accounts'
      else if(action==='service')url=API+'/coins/types'
      else if(action=='application') url=API+'/devices/applications'
      else url=API+'/device/models'
      return  await axios.get(url,{headers:{ authorization: "bearer " + localStorage.getItem('token').split('"').join('')}}).then((response) => {return response;}).catch(err=>{return err});

}
async function addDevice(data){
      let url=API+'/device/add'
      return await axios.post(
            url,data,{
                  headers:{authorization:"bearer " + localStorage.getItem('token').split('"').join('')}
            }
      ).then((response)=>{console.log (response)}).catch((err)=>{console.log (err)})
}

export {fetchModelData,addDevice}
