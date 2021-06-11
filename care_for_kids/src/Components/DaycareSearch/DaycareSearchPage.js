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
    const [user, setUser] = useState();
    const [selectedDaycare, setSelectedDaycare] = useState();
    const [location, setLocation] = useState();
    const [radius, setRadius] = useState();
    const [ageGroup, setAgeGroup] = useState();
    const [reviews, setReviews] = useState();
    const [parent, setParent] = useState();

    useEffect(() => {
        setParent(props.parent);
        setAllDaycares(props.daycares);
        setUser(props.user);
    }, [props])

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

    let count = 0;
    let age = '';

    while (count <= 0){
        if(ageGroup == "Infant (Younger than 12 months)"){
            age = "http://127.0.0.1:8000/age_groups/1/";
        }
        else if (ageGroup == "Young Toddler (1-2 years)"){
            age = "http://127.0.0.1:8000/age_groups/2/";
        }
        else if (ageGroup == "Older Toddler (2-3 years)"){
            age = "http://127.0.0.1:8000/age_groups/3/";
        }
        else if (ageGroup == "Preschooler (3-5 years)"){
            age = "http://127.0.0.1:8000/age_groups/4/";
        }

        count = 1;
    }

    const searchFilter = () => {

        if(age){
            return(
                allDaycares.map((daycare, i) => {
                    if(daycare.age_groups.includes(age)){
                        return (
                            <div key={i} style={{marginTop: '2rem'}}  onClick={() => setSelectedDaycare(daycare)}>
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
                                user={user}
                                />
                            </div>
                            
                        )
                }
                })
            )
        }
        else if(location){
            return(
                allDaycares.map((daycare, i) => {
                    let address = `${daycare.city}, ${daycare.state}`;
                    if(address.includes(location)){
                        return (
                            <div key={i} style={{marginTop: '2rem'}} onClick={() => setSelectedDaycare(daycare)}>
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
                                user={user}
                                />
                            </div>
                        )
                }
                })
            )
        }
        else{
            return (
                allDaycares.map((daycare, i) => {
                    return (
                        <div key={i} style={{marginTop: '2rem'}} onClick={() => setSelectedDaycare(daycare)}>
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
                            selectedDaycare = {selectedDaycare}
                            user={user}
                            />
                        </div>
                    )
                })
            )
        }
    }

    return (
        <div>
            <div style={{marginTop: '2rem', paddingBottom: '1.25rem'}}>
                <SearchBar daycares={props.daycares} 
                callbackToSearchPage={locationCallback} 
                callbackRadiusSearch={radiusCallback}
                callbackAgeGroupSearch={ageGroupCallback}  
                />
            </div>
            <div className={classes.map}><Map parent={parent} searchLocation={location} radius={radius} />
                
            </div>
            {/* {allDaycares && 
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
            } */}
            {allDaycares && searchFilter()}
            
        </div>
    )
}

export default DaycareSearchPage
