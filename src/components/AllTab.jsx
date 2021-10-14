/* eslint-disable no-unused-vars */
import React from 'react'
import ProductGroup from './ProductGroup.jsx';
import { fetchProducts, fetchProductsContinuously, fetchStats } from './fetchProducts.js';


export default  function AllTab({id, active,isActive, showMenu, menuElements, currentTab, setStatics,setIsLoading, setviewDevice, navigator,  showGroups, setShowGroups,setSelectedGroupDevice, setCurrentMapDevice }) {
    let [products, setProducts] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState("No Device found");

    const isMounted = React.useRef(true);

    React.useEffect(() => {
        let Timer = null;
        if(isMounted.current){

            try {
                !Object.keys(products).length && fetchStats(setStatics) && fetchProducts(currentTab).then( (products) => {
                    
                    if('data' in products) {
                        setProducts(products['data']);
                        setLoading(false);
                        setIsLoading(false);

                        clearInterval(Timer);
                        Timer = setInterval(() => fetchProductsContinuously(Timer,currentTab,  products, setProducts, setLoading, setStatics).catch( (error)=>{
                            throw new Error(error)
                        }), 10000/1);
                    } else {
                        if('status' in products  ) {
                            if(products['status'] === 'error' || products['status'] === 'failure'){
                                setErrorMessage(products.message);
                                throw products.message
                            }
                        }
                    }
                })
            } catch (error) {
                clearInterval(Timer);
                console.group("Network");
                console.error(error);
                console.groupEnd();
            }
        }
        return () => {
            clearInterval(Timer);
            isMounted.current = false;
        };
    // eslint-disable-next-line 
    }, [isMounted]);
    

    products = products || {};
    
    if(loading || products === null||products === undefined) {
        return ''
    }

    return (
        <div className={isActive ? 'art_tab_main active' : "art_tab_main"} ref={id} datatab={currentTab} >
          
           {isActive && (Object.keys(products).length > 0) ?Object.keys(products).map((product,index)=>{
               return (<ProductGroup key={product+index} name={[product]} products={products[product]} showMenu={showMenu} menuElements={menuElements} index={index} setviewDevice={setviewDevice} navigator={navigator} showGroups={showGroups} setShowGroups={setShowGroups} setSelectedGroupDevice={setSelectedGroupDevice}  setCurrentMapDevice={setCurrentMapDevice} /> )
          }) : <div className="no_products">{errorMessage}</div>}
           
             {/* <Products status="moving" showMenu={showMenu}/>
            <Products status="stopped"  showMenu={showMenu}/>
            <Products status="offline"  showMenu={showMenu}/>
            <Products status="idling"  showMenu={showMenu}/>
            <Products status="static"  showMenu={showMenu}/>
            <Products status="nodata"  showMenu={showMenu}/> */}
        </div>
    )
}


