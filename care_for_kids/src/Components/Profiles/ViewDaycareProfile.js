import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import jwtDecode from 'jwt-decode';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import serviceLayer from '../../Service/serviceLayer';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '110vh',
        // backgroundImage: `url(${Image})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'top',
        justifyContent: 'center',
    },
    paper: {
        position: 'relative',
        top: '100px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '5rem',
        marginRight: '5rem',
        zIndex: '1',

    },
    profileContent: {
        marginTop: '10rem',
    }
    ,
    bodyLinks: {
        marginTop: '2rem',
    }
    ,
    usersName: {
        fontSize: '2rem',

    },
    pageTitle: {
        textAlign: 'center',

    },
    avatar: {
        position: 'relative',
        fontSize: '20rem',
        zIndex: '4',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
    },
    icon: {
        color: '#5EBA7D',
        cursor: 'pointer',
    },
    }));

export default function ViewParentProfile(props) {

    const [daycare, setDaycare] = useState(null);
    const [allDaycares, setAllDaycares] = useState([]);
    const [children, setChildren] = useState([])
    const [child1, setChild1] = useState()
    const [child2, setChild2] = useState()
    const [child3, setChild3] = useState()
    const [child4, setChild4] = useState()
    const [user, setUser] = useState(null);
    const [options, setOptions] = useState({switch: false})

    function getToken() {
        const jwt = localStorage.getItem('token')
        try{
            const user = jwtDecode(jwt);
            setUser(user);
            } catch {}
        }

    const getDaycares = () => {
        serviceLayer.getAllDaycares()
        .then(response => {
            setAllDaycares(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const  getDaycareById = () => {
        allDaycares.forEach(d => {
            if (d.user === user.user_id){
                setDaycare(d);
            }
        })
    }

    useEffect(() => {
        getToken();
        getDaycareById();

    }, [allDaycares])

    useEffect(() => {
        getDaycares();
    }, [props])

    let ageGroupArray = [];
    let count = 0;

    while (count <=  0){
        if(daycare){
            daycare.age_groups.forEach(age => {
                if (age === "http://127.0.0.1:8000/age_groups/1/"){
                    age = "Infant (Younger than 12 months)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_infant, maxCost: daycare.max_cost_infant});
                }
                else if (age ==="http://127.0.0.1:8000/age_groups/2/" ){
                    age = "Young Toddler (1-2 years)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_youth_T, maxCost: daycare.max_cost_youth_T });
                    
                }
                else if (age === 'http://127.0.0.1:8000/age_groups/3/' ){
                    age = "Older Toddler (2-3 years)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_old_T, maxCost: daycare.max_cost_old_T});
                }
                else if (age === 'http://127.0.0.1:8000/age_groups/4/'){
                    age = "Preschooler (3-5 years)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_preschool, maxCost: daycare.max_cost_preschool});
                }
            })
    
        }
        count = 1
    }



    const mapGroups = () => {
        if (daycare){
            return (
                ageGroupArray.map((group, i) => ( 
                    <tr>
                        <td >{group.group}</td>
                        <td>{group.minCost}</td>
                        <td>{group.maxCost}</td>
                    </tr>
                ))
            )
    }
    }
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.pageTitle}><h1>Daycare Profile</h1></div>
            <Paper className={classes.paper}>
                <div style={{textAlign: 'center'}}>
                    <AccountCircleIcon color="action" className={classes.avatar}/>
                </div>
                <div className={classes.usersName}>                    
                    <div>
                        <span>{daycare && daycare.name}</span>
                    </div>
                </div>
                <div className={classes.bodyLinks}>
                    <a style={{marginRight: '50px', cursor: 'pointer'}} onClick={() => setOptions({switch: false})}>Daycare Info</a>
                    <a style={{marginLeft: '50px', cursor: 'pointer'}} onClick={()=>setOptions({switch: true})}>Programs</a>
                </div>
                {user && daycare && !options.switch ? 
                <>
                <div style={{textAlign: 'center', marginTop: '3rem'}}>
                    <span>Description</span>
                    <p>{daycare && daycare.description}</p>
                </div>
                <div>
                    <ul style={{listStyleType: 'none'}}>
                        <li>Address: {daycare.street_address}, {daycare.city}, {daycare.state}</li>
                    </ul>
                </div>
                </>
                : <></>}
                <div>
                {user && daycare && options.switch ?
                    <table style={{marginTop: '3rem'}}>
                        <tr>
                            <th>Programs</th>
                            <th>Min Cost</th>
                            <th>Max Cost</th>
                        </tr>
                        <tbody>
                                {mapGroups()}
                        </tbody>
                    </table>
                : <></>}
                </div>
                {/* {user && daycare && options.switch ? 
                <div>
                    {mapChild()}
                </div>
                :<></>} */}
            </Paper>
        </div>
    )
}
