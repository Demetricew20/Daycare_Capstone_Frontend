import React, { useEffect, useState } from 'react'
import DaycareSearchTable from './DaycareSearchTable';
import Image from '../../Assets/open_daycare.jpg';
import Map from '../../Components/Maps/Map'
import serviceLayer from '../../Service/serviceLayer';
import GoogleAPIWrapper from '../Maps/GoogleAPIWrapper';
import {makeStyles} from '@material-ui/core/styles';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({

    map: {
        height: '600px',
        width: '600px',
        position: 'absolute',
        top: '17%',
        right: '5%'
    }
 }))

const DaycareSearchPage = (props) => {

    const [allDaycares, setAllDaycares] = useState([]);
    const [location, setLocation] = useState();
    const [radius, setRadius] = useState();
    const [ageGroup, setAgeGroup] = useState();
    const [reviews, setReviews] = useState();
    const [parent, setParent] = useState();

    useEffect(() => {
        setParent(props.parent);
        setAllDaycares(props.daycares);
    }, [props])


    console.log(allDaycares);
    console.log(parent);
    console.log(reviews);

    const locationCallback = (dataFromChild) => {
        setLocation(dataFromChild);
    }

    const radiusCallback = (dataFromChild) => {
        setRadius(dataFromChild);
    }

    const ageGroupCallback = (dataFromChild) => {
        setAgeGroup(dataFromChild);
    }

    const classes = useStyles();

    return (
        <div>
            <div style={{marginTop: '2rem'}}>
                <SearchBar daycares={props.daycares} 
                callbackToSearchPage={locationCallback} 
                callbackRadiusSearch={radiusCallback}
                callbackAgeGroupSearch={ageGroupCallback}  
                />
            </div>
            {/* <div className={classes.map}><Map parent={parent} /></div> */}
            {allDaycares && 
            allDaycares.map((daycare, i) => {
                return (
                    <div key={i} style={{marginTop: '2rem'}}>
                        <DaycareSearchTable 
                        daycare={daycare}
                        daycare_id={daycare.id}
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
