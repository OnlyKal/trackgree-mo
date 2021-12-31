import axios from "axios";
import { API } from "../config";

function fetchProducts(currentTab = '') {
    currentTab = currentTab.toLowerCase();
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));

    let url = API + '/devices/' + currentTab;

    if (selectedUser !== null) {
        if (currentTab.includes('?')) {
            url += '&user_id=' + selectedUser.id;
        } else {
            url += '?user_id=' + selectedUser.id;
        }
    }

    return axios.get(url, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {

        return error;
    });
}

function fetchStats(setStatics = () => null) {
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));

    let url = API + '/devices/stats';

    if (selectedUser !== null) {
        url += '?user_id=' + selectedUser.id;
    }

    return axios.get(url, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        response = response.data;

        if (!('status' in response)) {
            setStatics(response);
        }

    }).catch((error) => {

        return error;
    });
}

function fetchProductsContinuously(Timer, currentTab, products, setProducts, setLoading, setStatics) {
    try {

        fetchStats(setStatics);
        return /* setInterval(() => { */ fetchProducts(currentTab).then((_products) => {
            if ('data' in _products) {
                if (JSON.stringify(products) !== JSON.stringify(_products)) {
                    fetchStats(setStatics)
                    setProducts({});
                    setProducts(_products['data']);
                    setLoading(false);
                }
            }
        }).catch((error) => {

            return error;
        });
    } catch (error) {
        return error;
    }
    /* }, 10000 / 1); */
}

// eslint-disable-next-line no-unused-vars
function scrollSpy() {
    const scroll = window.scrollY;
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const headerHeightHalf = headerHeight / 2;
    const headerHeightQuarter = headerHeight / 4;

    if (scroll > headerHeightHalf) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }

    if (scroll > headerHeightQuarter) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function handleSearch(search, db, setSearchKeyword, navigator, ignoreDB = false) {
    if (search.trim() !== '') {
        if (!ignoreDB) {
            db.add({ word: search }).catch(function(e) {
                if (e.target.error.name !== 'ConstraintError') {
                    console.error(e);
                }
            });
        }
        setSearchKeyword(search);
        navigator('searchResults')
    }
}

function fetchGroups() {
    return axios.get(API + '/groups/get', {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    });
}


function setGroup(imei, groupId) {
    return axios.post(API + '/device/set-group', {
        device_id: imei,
        group_id: groupId,
    }, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    })
}

function addGroup(name, description = '') {
    return axios.post(API + '/groups/add', {
        name,
        description
    }, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    })
}

function sendCommand(imei, commandType, command, protocol, accountPassword = '', serverHost = '', serverPort = '') {
    return axios.post(API + '/device/command/' + imei, {
        commandType,
        command,
        protocol,
        accountPassword,
        serverHost,
        serverPort
    }, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    })
}

// fetch device history
function fetchHistory(imei, from, to) {
    return axios.get(API + '/device/history/' + imei, {
        params: {
            from,
            to
        },
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

function fetchAccounts() {
    return axios.get(API + '/accounts', {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    });
}

function fetchAccountsByID(id) {
    return axios.get(API + '/accounts/id?q=' + id, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    });
}

function fetchAccountTypes(type) {
    return axios.get(API + '/accounts/types?q=' + type, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    });
}

// create account
function createAccount(data) {
    return axios.post(API + '/accounts/create', data, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    })
}

// reset account password
function resetAccountPassword(data) {
    return axios.post(API + '/account/password/reset', data, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    })
}

// update account password
function updateAccountPassword(data) {
    return axios.post(API + '/account/password/change', data, {
        headers: {
            authorization: "bearer " + localStorage.getItem('token').split('"').join('')
        }
    }).then((response) => {
        return response.data;
    })
}

// loggout by clear sessionStorage and localStorage as well as indexedDB
function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
}

function rad(x) {
    return x * Math.PI / 180;
}

function getDistance(p1, p2) {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(p2.lat - p1.lat);
    let dLong = rad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // returns the distance in meter
}


export { fetchProducts, fetchStats, fetchProductsContinuously, handleSearch, sendCommand, fetchGroups, setGroup, addGroup, fetchAccounts, fetchAccountsByID, fetchAccountTypes, createAccount, resetAccountPassword, updateAccountPassword, logout, fetchHistory, getDistance };