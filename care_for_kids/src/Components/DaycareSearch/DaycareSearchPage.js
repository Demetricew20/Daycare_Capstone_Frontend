import React, { useEffect, useState } from 'react'
import DaycareSearchTable from './DaycareSearchTable';
import Image from '../../Assets/open_daycare.jpg';
import serviceLayer from '../../Service/serviceLayer';

const DaycareSearchPage = (props) => {

    const [allDaycares, setAllDaycares] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [parent, setParent] = useState();

    async function getReviews(){
        try{
            const response = await serviceLayer.getAllReviews();
            setReviews(response.data);
        }
        catch(err){
            console.log('SearchPage', err);
        }
    }


    useEffect(() => {
        setParent(props.parent);
        setAllDaycares(props.daycares);
        getReviews();
    }, [props])


    console.log(allDaycares);
    console.log(parent);
    console.log(reviews);

    return (
        <div>
            <h4>Hello</h4>
            {allDaycares && 
            allDaycares.map((daycare, i) => {
                return (
                    <div key={i} style={{marginTop: '2rem'}}>
                    <DaycareSearchTable daycareName={daycare.name} description={daycare.description} cardImage={Image} />
                    </div>
                )
            })
            }
        </div>
    )
}

export default DaycareSearchPage
