import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import serviceLayer from '../../Service/serviceLayer';
import {makeStyles} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
    },
    icon: {
        color: '#5EBA7D',
        cursor: 'pointer',
    },
    }));


function DaycareDetails(props) {
    const [daycares, setDaycares] = useState([]);
    const [daycare, setDaycare] = useState();
    const [options, setOptions] = useState({switch: false})

    const classes = useStyles();

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
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            console.log('No Id Found');
        }
    }

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
                    <TableRow>
                        <TableCell >{group.group}</TableCell>
                        <TableCell>${group.minCost}</TableCell>
                        <TableCell>${group.maxCost}</TableCell>
                    </TableRow>
                ))
            )
    }
    }

    console.log(daycare);

    return (
        <div>
            <Paper className={classes.paper}>
                <div className={classes.usersName}>                    
                    <div>
                        <span>{daycare && daycare.name}</span>
                    </div>
                </div>
                <div className={classes.bodyLinks}>
                    <a style={{marginRight: '50px', cursor: 'pointer'}} onClick={() => setOptions({switch: false})}>Daycare Info</a>
                    <a style={{marginLeft: '50px', cursor: 'pointer'}} onClick={()=>setOptions({switch: true})}>Programs</a>
                </div>
                {daycare && !options.switch ? 
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
                {daycare && options.switch ?
                <TableContainer>
                    <Table style={{marginTop: '3rem'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Programs</TableCell>
                                <TableCell>Min Cost</TableCell>
                                <TableCell>Max Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {mapGroups()}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <></> }
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

export default DaycareDetails
