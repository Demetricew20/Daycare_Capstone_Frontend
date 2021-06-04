import React, { useEffect, useState } from 'react'
import DaycareSearchTable from './DaycareSearchTable';
import Image from '../../Assets/open_daycare.jpg';
import serviceLayer from '../../Service/serviceLayer';


const DaycareSearchPage = (props) => {

    const [allDaycares, setAllDaycares] = useState([]);
    const [reviews, setReviews] = useState();
    const [parent, setParent] = useState();

    // async function getReviews(){
    //     try{
    //         const response = await serviceLayer.getAllReviews();
    //         setReviews(response.data);
    //     }
    //     catch(err){
    //         console.log('SearchPage', err);
    //     }
    // }


    useEffect(() => {
        setParent(props.parent);
        setAllDaycares(props.daycares);
    }, [props])


    console.log(allDaycares);
    console.log(parent);
    console.log(reviews);

    return (
        <div>
            {allDaycares && 
            allDaycares.map((daycare, i) => {
                return (
                    <div key={i} style={{marginTop: '2rem'}}>
                    <DaycareSearchTable 
                    daycare={daycare}
                    daycareName={daycare.name} 
                    description={daycare.description} 
                    cardImage={Image} 
                    rating={daycare.avg_rating} 
                    street_address={daycare.street_address}
                    city={daycare.city}
                    state={daycare.state}
                    />
                    </div>
                )
            })
            }
        </div>
    )
}

export default DaycareSearchPage
