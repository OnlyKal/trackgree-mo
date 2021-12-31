
import React,{ useEffect, useState } from "react";
import Header from '../Header.jsx'
import HeaderEditDevice from '../HeaderEditDevice.jsx';
import {fetchAccountTypes,} from '../fetchProducts'
import Loader from "../Loader.jsx";
import QrCodeImage from "../../assets/images/qrscann.png";
import {fetchModelData,addDevice} from './DeviceApi'
import GetIMEIScannedBar from './ScanCodeCamera'
import parse from 'html-react-parser'





function AddNewDeviceForm({navigator, setShowBottomBar, selectedUser, setSelectedUser }){
    
    selectedUser = selectedUser || JSON.parse(localStorage.getItem('user'));
    const [accountTypes, setAccountTypes] = React.useState({});
    let previousPage = localStorage.getItem('previousPage');
    previousPage = (previousPage === null ? 'home' : previousPage);

    const [modelData,setModelData]=useState([]); 
    const [serviceData,setServiceData]=useState([]); 
    const [accountData,setaccountData]=useState([]); 
    const [applicationData,setapplicationData]=useState([]); 

    useEffect(() => {    
        fetchModelData('model').then(model=> setModelData(model.data))
        fetchModelData('application').then(app=> {setapplicationData(app.data.data)        })
        fetchModelData('account').then(account=> {
           var allAccounts=[]
           for (var acnt in account.data.accounts){
              allAccounts.push(account.data.accounts[acnt])
           }
           setaccountData(allAccounts)
        })
        fetchModelData('service').then(service=> {
            var allServices=[]
            for(var obj in service.data){
              allServices.push(service.data[obj])
            }
            setServiceData(allServices)
            console.log(serviceData)
        })
       

        setShowBottomBar(false);
        fetchAccountTypes(selectedUser.privileges.type).then(accountTypes => {
          if(accountTypes.status === 'success') {
            let ops = {};
            accountTypes.data.forEach(type => {
              ops[type.name.toLowerCase()] = type;
            });                     
            setAccountTypes(ops);
          }
        });
        return () => {
          return null
        }
   
      }, []);   


    
  // STYLE OF COMPONENTS
  
   let style={
          main:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            padding:'0px 15px 0px 15px',
            height:'44px',
            alignItems:'center',
            borderBottom:'solid 1px',
            borderColor:' rgba(210,210,208,255)'
          },
          value:{
            fontSize:'12px',
            color:'gray',
            fontWeight:'500'
          },
          scanComp:{
              backgroundColor:'rgba(7,113,19,255)',
              padding:'2px 3px 2px 3px',
              borderRadius:'5px',
              display:'flex',
              marginLeft:'10px'
          },
          application:{
               margin:'10px 13px',
               display:'flex',
               flexWrap:'wrap',
               subApp:{
                    margin:'3px 3px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    width:'29px',
                    height:'29px',
                    backgroundColor:'#E3E0DE',
                    borderRadius:'9px',
                    padding:'5px'

               }
          },
          select:{
              flex:'1',
              padding:'0px 3px',
              margin:'0px 5px',
              height:'100%',
              background:'transparent',
              border:'0px',
              textAlign:'right',
              outline:'none',
          },
          btn:{
               backgroundColor:'rgba(7,113,19,255)',
               color:'white',
               margin:'10% 24%',
               textAlign:'center',
               padding:'10px',
               borderRadius:'20px',
          }

          
   }


   const [applications,setApp]=useState('Car')
    function ButtonNewDevice(){
            var imei=document.getElementById('imeis');
            var model=document.querySelector('#models');
            var subscription=document.querySelector('#subscription');
            var account=document.querySelector('#accounts');
            let data={
                  imei:imei!=null?(imei.value).substring(0,imei.value.length-1):null,
                  model:model!=null?model.value:null,
                  subscription:subscription!=null?subscription.value:null,
                  account:account!=null?account.value:null,
                  application:applications
            }
            return <div style={style.btn} onClick={()=>addDevice(data)}>Save Device</div>
   }

   function ElementModel({styleoF}){
        return <div>
                <div style={styleoF}> 
                  <a>{'Model'}</a>
                  <select className="" id="models" style={style.select}>
                   {
                     modelData!=undefined&&modelData!=null?modelData.map((model,index)=>{return  <option key={index} value={model.id}>{model.name}</option>}):null
                   }
                </select>            
              </div>
        </div>
    }
    function ElementServiceType ({styleoF}){
        return <div>
                <div style={styleoF}> 
                  <a>{'Service Type'}</a>
                  <select className="" id="subscription" style={style.select}>
                   {
                      serviceData!=undefined&& serviceData!=null?serviceData.map((data,index)=>{
                                  {return  <option key={index} value={data.type}>{data.name}</option>}
                      }):null
                   }
                </select>            
              </div>
        </div>
    }
    function ElementAccount ({styleoF}){
        return <div>
                <div style={styleoF}> 
                  <a>{'To Account'}</a>
                  <select className="" id="accounts" style={style.select}>
                   {
                      accountData!=undefined&& accountData!=null?accountData.map((data,index)=>{
                                  {return  <option key={index} value={data.id}>{data.username}</option>}
                      }):null
                   }
                </select>            
              </div>
        </div>
    }

  
  
   const [colorCar,setcolorCar]=useState('#119921')
   const [colorTaxi,setcolorTaxi]=useState('#607D8B')
   const [colorPassenger,setcolorPassenger]=useState('#607D8B')
   const [colorSchoolBus,setcolorSchoolBus]=useState('#607D8B')
   const [colorMixer,setcolorMixer]=useState('#607D8B')
   const [colorPolice,setcolorPolice]=useState('#607D8B')
   const [colorPickup,setcolorPickup]=useState('#607D8B')
   const [colorMotoCycle,setcolorMotoCycle]=useState('#607D8B')
   const [colorPoliceMoto,setcolorPoliceMoto]=useState('#607D8B')
   const [colorTricycle,setcolorTricycle]=useState('#607D8B')
   const [colorunManned,setcolorunManned]=useState('#607D8B')
   const [colorGolf,setcolorGolf]=useState('#607D8B')
   const [colorShip,setcolorShip]=useState('#607D8B')
   const [colorTractor,setcolorTractor]=useState('#607D8B')
   const [colorPerson,setcolorPerson]=useState('#607D8B')
   const [colorCow,setcolorCow]=useState('#607D8B')
   const [colorOuther,setcolorOuther]=useState('#607D8B')

   function ElementApplication(){
    const app=applicationData
        return <div style={style.application}>
                  <div name='car'  style={style.application.subApp} onClick={()=>{ 
                              setApp(app[0].title)
                              setcolorCar('#119921')
                              setcolorTaxi('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[0]!=undefined&&app[0]!=null?parse(app[0].mapIcon.replace("#607D8B",`${colorCar}`)):null}
                 </div>
                      <div style={style.application.subApp} onClick={()=>{ 
                              setApp(app[1].title)
                              setcolorTaxi('#119921')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[1]!=undefined&&app[1]!=null?parse(app[1].mapIcon.replace("#607D8B",`${colorTaxi}`)):null}
                  </div>
                   <div style={style.application.subApp} onClick={()=>{ 
                              setApp(app[2].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#119921')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[2]!=undefined&&app[2]!=null?parse(app[2].mapIcon.replace("#607D8B",`${colorPassenger}`)):null}
                  </div>
                    <div style={style.application.subApp} onClick={()=>{ 
                              setApp(app[3].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#119921')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[3]!=undefined&&app[3]!=null?parse(app[3].mapIcon.replace("#607D8B",`${colorSchoolBus}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                              setApp(app[4].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#119921')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[4]!=undefined&&app[4]!=null?parse(app[4].mapIcon.replace("#607D8B",`${colorMixer}`)):null}
                  </div>
                 <div style={style.application.subApp} onClick={()=>{ 
                     setApp(app[5].title)
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#119921')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[5]!=undefined&&app[5]!=null?parse(app[5].mapIcon.replace("#607D8B",`${colorPolice}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[6].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#119921')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[6]!=undefined&&app[6]!=null?parse(app[6].mapIcon.replace("#607D8B",`${colorPickup}`)):null}
                  </div>
                   <div style={style.application.subApp} onClick={()=>{ 
                       setApp(app[7].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#119921')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[7]!=undefined&&app[7]!=null?parse(app[7].mapIcon.replace("#607D8B",`${colorMotoCycle}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[8].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#119921')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[8]!=undefined&&app[8]!=null?parse(app[8].mapIcon.replace("#607D8B",`${colorPoliceMoto}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[9].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#119921')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[9]!=undefined&&app[9]!=null?parse(app[9].mapIcon.replace("#607D8B",`${colorTricycle}`)):null}
                  </div>
                
                  <div style={style.application.subApp} onClick={()=>{ 

setApp(app[10].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#119921')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[10]!=undefined&&app[10]!=null?parse(app[10].mapIcon.replace("#607D8B",`${colorunManned}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[11].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#119921')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[11]!=undefined&&app[11]!=null?parse(app[11].mapIcon.replace("#607D8B",`${colorGolf}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[12].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#119921')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[12]!=undefined&&app[12]!=null?parse(app[12].mapIcon.replace("#607D8B",`${colorShip}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[13].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#119921')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[13]!=undefined&&app[13]!=null?parse(app[13].mapIcon.replace("#607D8B",`${colorTractor}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[14].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#119921')
                              setcolorCow('#607D8B')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[14]!=undefined&&app[14]!=null?parse(app[14].mapIcon.replace("#607D8B",`${colorPerson}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[15].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#119921')
                              setcolorOuther('#607D8B')
                  }}>
                       {app[15]!=undefined&&app[15]!=null?parse(app[15].mapIcon.replace("#607D8B",`${colorCow}`)):null}
                  </div>
                  <div style={style.application.subApp} onClick={()=>{ 
                      setApp(app[16].title)
                              setcolorTaxi('#607D8B')
                              setcolorCar('#607D8B')
                              setcolorPassenger('#607D8B')
                              setcolorSchoolBus('#607D8B')
                              setcolorMixer('#607D8B')
                              setcolorPolice('#607D8B')
                              setcolorPickup('#607D8B')
                              setcolorMotoCycle('#607D8B')
                              setcolorPoliceMoto('#607D8B')
                              setcolorTricycle('#607D8B')
                              setcolorunManned('#607D8B')
                              setcolorGolf('#607D8B')
                              setcolorShip('#607D8B')
                              setcolorTractor('#607D8B')
                              setcolorPerson('#607D8B')
                              setcolorCow('#607D8B')
                              setcolorOuther('#119921')
                  }}>
                       {app[16]!=undefined&&app[16]!=null?parse(app[16].mapIcon.replace("#607D8B",`${colorOuther}`)):null}
                  </div>  {/* */}
        </div>
   }
  

    // COMPONENT AND  QR CODE  SCANNER FROM CAMERA 

   const [visibilityScanBar,setVisibilityScanBAr]=useState('none')
   const [IMEICode,setIMEICode]=useState('')
   let allDevices=''
   function IMEIElementDevice ({title,styleoF,valueOf}){
          const BarState=()=>setVisibilityScanBAr('flex')
          return <div>
                        <div style={styleoF}> 
                          <a>{title}</a>
                          <div style={{display:'flex','alignItems':'center'}}>     
                                <textarea style={style.select} id="imeis" name="imeis" rows="2" cols="50" placeholder="IMEI Codes" defaultValue= {valueOf}/>
                                <div style={style.scanComp} onClick={()=>BarState()}><img src={QrCodeImage} width={'22'} style={{margin:'3px'}}/></div>  
                          </div>        
                      </div>
                </div>
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const [statusMsg, setStatusMsg] = React.useState("Loading ...");
    const [dismissLoader, setDismissLoader] = React.useState(false);
    
    return <div className="art_main art_main_initial">
            <Header children={<HeaderEditDevice navigator={navigator} name={"Add new device"} back={previousPage} setShowBottomBar={setShowBottomBar} setSelectedUser={setSelectedUser} /> } navigator={navigator} />
            {isLoading && (dismissLoader)&& <Loader text={statusMsg} dismiss={setIsLoading}/>}
            {isLoading && (!dismissLoader)&& <Loader text={statusMsg} />}

            <div>
                            
                 <ElementModel styleoF={style.main}/>
                 <ElementServiceType styleoF={style.main}/>
                 <ElementAccount styleoF={style.main}/>
                 <IMEIElementDevice title={'IMEI Code'} valueOf={IMEICode} styleoF={style.main}/>
                 {visibilityScanBar=='flex'?<GetIMEIScannedBar visibility={visibilityScanBar} onUpdate={(err,result)=>{if(result){
                     console.log(result.text)
                     allDevices=document.getElementById('imeis').value+=result.text+','
                     setIMEICode(allDevices)
                     setVisibilityScanBAr('none')
                 }
                  else console.log(err)}}/>:null}
                 {applicationData!=undefined&& applicationData!=null?<ElementApplication/>:null}
                 <ButtonNewDevice/>
          </div>

    </div>
}

export default AddNewDeviceForm
