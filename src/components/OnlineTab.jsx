import React from 'react'
import { fetchProducts, fetchProductsContinuously } from './fetchProducts.js';
import ProductGroup from './ProductGroup.jsx';
import { useIsMounted } from './UseIsMounted.js';

function handleDag (e)  {
    console.log(e.screenY);
}

export default  function OnlineTab({id, active, showMenu, menuElements, currentTab, setStatics}) {
    const [products, setProducts] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const isMounted = useIsMounted();

    React.useEffect(() => {
        if (isMounted.current) {
            let Timer = null;

            !products.length && fetchProducts(currentTab).then( (products) => {
        
                setProducts(products['data']);
                setLoading(false);
                clearInterval(Timer);

                Timer = fetchProductsContinuously(Timer,currentTab,  products, setProducts, setLoading, setStatics);
                
            }).catch( (error) => {
                setLoading(false);
                console.log(error);
            });
        }
    // eslint-disable-next-line 
    }, [isMounted]); 
    
    if(loading ) {
        return <div className="loading">Loading...</div>
    }
    return (
        <div className={active ? 'art_tab_main active' : "art_tab_main"} ref={id}  onDragStart={handleDag} >
           
           {Object.keys(products).length > 0 ?Object.keys(products).map((product,index)=>{
               return (<ProductGroup key={product+index} name={[product]} products={products[product]} showMenu={showMenu} menuElements={menuElements} index={index} /> )
          }) : <div className="no_products">No products found</div>}
        </div>
    )
}


