import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import serviceLayer from '../../Service/serviceLayer';

function DaycareDetails(props) {
    const [daycares, setDaycares] = useState([]);
    const [daycare, setDaycare] = useState();

    useEffect(() => {
        setDaycares(props.daycares);
        getDaycare();
    }, [props])

    const location = useLocation();
    let split = location.pathname.split('/');
    let id = split[split.length - 1];

    async function getDaycare(){
        if(id){
            try{
                const response = await serviceLayer.getDaycareById(id)
                setDaycare(response.data);
                console.log(response.data);
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            console.log('No Id Found');
        }
    }

    return (
        <div>
            <h1>Daycare Details</h1>
        </div>
    )
}

export default DaycareDetails
