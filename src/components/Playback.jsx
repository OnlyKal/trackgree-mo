
import React from 'react';
import Header from './Header';
import HeaderEditDevice from './HeaderEditDevice';
import {fetchHistory} from './fetchProducts.js';
import  {ReactComponent as TyleType} from '../assets/images/TyleType.svg'
import  {ReactComponent as DeviceIcon} from '../assets/images/DeviceIcon.svg'
import moment from 'moment'
import 'moment-timezone';
import Button from './Button';
import { Activity, ChevronRight, Clock } from 'react-feather';
import Loader from './Loader';

function Playback({navigator, setdeviceData, device, setShowBottomBar, setSelectedUser}) {
    moment.tz.setDefault(moment.tz.guess(true)||Intl.DateTimeFormat().resolvedOptions().timeZone);

    let timezoneOffset = moment.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('Z');
    // get only timezone offset
    timezoneOffset = timezoneOffset.split(':')[0]; // eg +03

    const [selectedDate, setSelectedDate] = React.useState(
        {
            start : moment().format('YYYY-MM-DD')+ ' 00:00',
            end : moment().format('YYYY-MM-DD HH:mm')
        }
    );

    // get previous page from local storage.add(timezone[0] === '+'?+timezone[1]:-timezone[1], timezone[2])
    let previousPage = localStorage.getItem('previousPage');

    const [isLoading, _setIsLoading] = React.useState(false);
    const [statusMsg, setStatusMsg] = React.useState("Loading ...");
    const setIsLoading = (value) => {
        _setIsLoading(value);
        setStatusMsg(value ? "Loading ..." : "");
    }
    const isMounted = React.useRef(false);
    // hide bottom bar
    React.useEffect(() => {

        isMounted.current = true;
        if (isMounted.current) {
            setShowBottomBar(false);
        }

        return () => {
            isMounted.current = false;
        }

    }, [setShowBottomBar]);


    if (typeof device.statusTime !== 'string') {
        if(isMounted.current){
            setTimeout(() => {
                setShowBottomBar(true);
                if (typeof previousPage === 'string') {
                    navigator(previousPage);
                } else {
                    navigator('map')
                }
            }, 10)
        }
        return null
    }
    
    let historyTabs = [
        {
            title: 'Today',
            icon: 'today',
            onPress: () => {
                let start = moment().format('YYYY-MM-DD')+ ' 00:00';
                let end = moment().format('YYYY-MM-DD HH:mm');
                return {start, end};
            }, 
            active: true
        },
        {
            title: 'Yesterday',
            icon: 'yesterday',
            onPress: () => {
                let start = moment().subtract(1, 'days').format('YYYY-MM-DD')+ ' 00:00';
                let end = moment().subtract(1, 'days').format('YYYY-MM-DD')+ ' 23:59';
                return {start, end};
            },
            active: false
        },
        {
            title: 'This\u00A0Week',
            icon: 'this-week',
            onPress: () => {
                let start = moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')+ ' 00:00';
                let end = moment().format('YYYY-MM-DD HH:mm');
                return {start, end};
            },
            active: false
        },
        {
            title: 'Last\u00A0Week',
            icon: 'last-week',
            onPress: () => {
                
                let startOfweek = moment().startOf('week').subtract(1, "week");
                startOfweek = startOfweek.add(1, 'day').format('YYYY-MM-DD');
                let start = startOfweek + ' 00:00';
                let end = moment().startOf('week').format('YYYY-MM-DD') + ' 23:59';
                
                return {start, end};
            },
            active: false
        },
    ];

    return (
        <div className="art_main art_main_initial">
            <div>
                <Header children={<HeaderEditDevice navigator={navigator} setShowBottomBar={setShowBottomBar} name="Playback" back={previousPage} setSelectedUser={setSelectedUser} /> } navigator={navigator} />

                {isLoading && <Loader text={statusMsg} dismiss={setIsLoading}/>}

                <div className="art_select_main">
                    
                    <div className="art_map_placeholder">
                       <Button className={"art_map_tyles"} children={ <TyleType />  }  /> 
                    </div>

                    <form className="art_history_sector" onSubmit={(e) =>{
                        e.preventDefault();

                        setIsLoading(true);
                        fetchHistory(device.imei, selectedDate.start, selectedDate.end).then((data) =>{
                            
                            if (data.length === 0) {
                                setStatusMsg("No data found");
                                return false;
                            }
                            setIsLoading(false);

                            setdeviceData(data);
                            navigator('history');
                        })

                    }}>
                        <div className="art_history_sector_header">
                            <div className="art_history_sector_tabs">
                                {
                                    historyTabs.map((tab, index) => {
                                        return (
                                            <button className={tab.active?"art_history_sector_tabs_tab active":"art_history_sector_tabs_tab"} key={index} onClick={(e)=>{
                                                setSelectedDate(tab.onPress());
                                                // get parentElement and remove active class to the previous active tab
                                                let parent = e.currentTarget.parentElement;
                                                let activeTab = parent.getElementsByClassName('active')[0];
                                                if(activeTab) activeTab.classList.remove('active');
                                                // add active class to the current tab
                                                let currentTab = document.getElementsByClassName('art_history_sector_tabs_tab')[index];
                                                if (currentTab) currentTab.classList.add('active');
                                                
                                            }} type="button">
                                                {tab.title}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="art_history_sector_content">
                            <div className="art_history_sector_content_date">
                                <div className="art_history_sector_content_date_context">
                                    <span className="art_history_sector_content_date_icon">
                                        <Clock />
                                    </span>
                                    <span className="art_history_sector_content_date_text">{"Start Time"}</span>
                                </div>
                                <div className="art_history_sector_content_date_picker" onClick={() =>{
                                        window.document.getElementById('startTime').click();
                                    }}>
                                    <label htmlFor="startTime">
                                        {
                                            new Date(moment(selectedDate.start)).toLocaleString()
                                        }
                                    </label>
                                    <input type="datetime-local" name="from" id="startTime" value={moment(selectedDate.start).add(Number(timezoneOffset), 'hour').toISOString().replace('.000Z', '')} className="art_date_picker"
                                    onChange={(e) => {
                                        let start = moment(e.target.value).format('YYYY-MM-DD HH:mm');
                                        setSelectedDate({start, end: selectedDate.end});
                                    }}
                                    />
                                    <span className="art_pick_pointer">
                                        <ChevronRight />
                                    </span>
                                </div>
                            </div>
                            <div className="art_history_sector_content_date">
                                <div className="art_history_sector_content_date_context">
                                    <span className="art_history_sector_content_date_icon">
                                        <Clock />
                                    </span>
                                    <span className="art_history_sector_content_date_text">{"End Time"}</span>
                                </div>
                                <div className="art_history_sector_content_date_picker" onClick={(e) =>{
                                    e.currentTarget.querySelector('#endTime').click();
                                    }}>
                                    <label htmlFor="endTime">
                                        {
                                            new Date(moment(selectedDate.end)).toLocaleString()
                                        }
                                    </label>
                                    <input type="datetime-local" name="to" id="endTime" value={moment(selectedDate.end).add(Number(timezoneOffset), 'hours').toISOString().replace('.000Z', '')} 
                                    onChange={
                                        (e) => {
                                            let end = moment(e.target.value).format('YYYY-MM-DD HH:mm');
                                            setSelectedDate({start: selectedDate.start, end: end});
                                        }
                                    } className="art_date_picker"
                                    />
                                    <span className="art_pick_pointer">
                                        <ChevronRight />
                                    </span>
                                </div>
                            </div>
                            <div className="art_history_sector_content_date">
                                <div className="art_history_sector_content_date_context">
                                    <span className="art_history_sector_content_date_icon">
                                        <Activity />
                                    </span>
                                    <span className="art_history_sector_content_date_text">{"Status"}</span>
                                </div>
                                <div className="art_history_sector_content_date_picker">
                                    <label>
                                        {
                                            // return four elements from array
                                           device.status[0].toUpperCase()+device.status.slice(1)+' '+device.statusTime.split(' ').slice(0, 4).join(' ')
                                        }
                                    </label>
                                    
                                </div>
                            </div>
                                 
                        </div>
                        <div className="art_history_sector_content_date art_history_sector_content_device">
                            <div className="art_history_sector_content_date_context">
                                <span className="art_history_sector_content_date_icon">
                                    <DeviceIcon />
                                </span>
                                <span className="art_history_sector_content_date_text">{"Device"}</span>
                            </div>
                            <div className="art_history_sector_content_date_picker">
                                <span>
                                    {
                                       device.name
                                    }
                                </span>
                                
                                <span className="art_pick_pointer">
                                    <ChevronRight />
                                </span>
                            </div>
                        </div>
                        <div className="art_history_sector_footer">
                            <Button className={"art_history_cancel"} name={"Cancel"} onClick={(e)=>{
                                e.preventDefault();
                                if (typeof previousPage === 'string') {
                                    navigator(previousPage);
                                } else {
                                    navigator('home')
                                }
                            }} />

                            <Button className={"art_history_ok"} name={"Ok"} type={"submit"} />
                        </div>
                    </form>
                </div>
        </div>
    </div>
    );
}

export default Playback;
