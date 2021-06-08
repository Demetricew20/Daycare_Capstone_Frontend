import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import jwtDecode from 'jwt-decode';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import serviceLayer from '../../Service/serviceLayer';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        // backgroundImage: `url(${Image})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'top',
        justifyContent: 'center',
    },
    paper: {
        position: 'relative',
        top: '100px',
        height: '58vh',
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

    const location = useLocation();
    const [parent, setParent] = useState(null);
    const [allParents, setAllParents] = useState([]);
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

    const getParents = () => {
        serviceLayer.getAllParents()
        .then(response => {
            console.log(response);
            setAllParents(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const  getParentById = () => {
        allParents.forEach(p => {
            if (p.user === user.user_id){
                setParent(p);
                setChildren(p.child);
            }
        })
    }

    const getChildrenData = () => {
        if (user){
            if (children[0]){
                serviceLayer.getChild(children[0])
                .then(response => {
                    setChild1(response.data);
                })
            }
            if (children[1]){
                serviceLayer.getChild(children[1])
                .then(response => {
                    setChild2(response.data);
                })
            }
            if (children[2]){
                serviceLayer.getChild(children[2])
                .then(response => {
                    setChild3(response.data);
                })
            }
            if (children[3]){
                serviceLayer.getChild(children[3])
                .then(response => {
                    setChild4(response.data);
                })
            }
        }
    }

    useEffect(() => {
        getToken();
        if(location.state){
            setParent(location.state.parent);
        }
        getParentById();
        getChildrenData();
    }, [allParents])

    useEffect(() => {
        getParents();
    }, [props])

    let arr = [child1, child2, child3, child4]

    if (child1, child2, child3, child4){
        arr.forEach(c => {
            if (c.age_group === "http://127.0.0.1:8000/age_groups/1/"){
                c.age_group = "Infant (Younger than 12 months)"
            }
            else if (c.age_group ==="http://127.0.0.1:8000/age_groups/2/" ){
                c.age_group = "Young Toddler (1-2 years)"
                
            }
            else if (c.age_group === 'http://127.0.0.1:8000/age_groups/3/' ){
                c.age_group = "Older Toddler (2-3 years)"
            }
            else if (c.age_group === 'http://127.0.0.1:8000/age_groups/4/'){
                c.age_group = "Preschooler (3-5 years)"
            }
        })

    }


    const mapChild = () => {
        if (child1 && child2 && child3 && child4){
            return (
                arr.map((c, i) => (
                    <ul key={i} style={{listStyleType: 'none'}}>
                        <li>{c.name}</li>
                        <li>{c.age_group}</li>
                    </ul>
                ))
            )
    }
    }


    const classes = useStyles();
    console.log(child1)
    console.log(child2)
    console.log(child3)

    return (
        <div className={classes.root}>
            <div className={classes.pageTitle}><h1>My Profile</h1></div>
            <Paper className={classes.paper}>
                <div style={{textAlign: 'center'}}>
                    <AccountCircleIcon color="action" className={classes.avatar}/>
                </div>
                <div className={classes.usersName}>                    
                <div>
                    <span>{user && user.first_name}</span>
                    <span style={{marginLeft: '30px'}}>{user && user.last_name}</span>
                </div>
                </div>
                <div className={classes.bodyLinks}>
                    <a style={{marginRight: '10px', cursor: 'pointer'}} onClick={() => setOptions({switch: false})}>Account</a>
                    <a style={{marginLeft: '10px', cursor: 'pointer'}} onClick={()=>setOptions({switch: true})}>Children</a>
                </div>
                {user && parent && !options.switch ? 
                <div>
                    <ul style={{listStyleType: 'none'}}>
                        <li>Address: {parent.street_address}</li>
                        <li>Username: {user.username}</li>
                        <li>Email: {user.email}</li>
                    
                    </ul>
                </div>
                :<></>}
                {user && parent && options.switch ? 
                <div>
                    {mapChild()}
                </div>
                :<></>}
            </Paper>
        </div>
    )
}
