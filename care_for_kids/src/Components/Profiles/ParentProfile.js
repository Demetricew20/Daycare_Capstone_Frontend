import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Image from '../../Assets/daycare_room.jpg';
import { TextField } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Select from '@material-ui/core/Select';
import serviceLayer from '../../Service/serviceLayer';
import jwtDecode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#F6F5F3',
        opacity: '.90',
        position: 'relative',
        top: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        marginLeft: '20rem',
        marginRight: '20rem',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#B200FF',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
    },
    icon: {
        color: '#5EBA7D',
        cursor: 'pointer',
    },
    select: {
        width: '17rem',
        position: 'relative',
        right: '30px',
        top: '10px',

    },
    add_child: {
        color: 'black',

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#B200FF',
        fontWeight: 'bolder',
        color: '#EDE9E1'
    },
    }));


export default function DaycareProfile() {
    const classes = useStyles();

    const [user, setUser] = useState();

    const [parent, setParent] = useState({
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        children: [],
    });
    const [child1, setChild1] = useState({
        id: '',
        name: '',
        age_group: '',
        url: '',
        added: false
    })
    const [child2, setChild2] = useState({
        id: '',
        name: '',
        age_group: '',
        url: '',
        added: false
    })
    const [child3, setChild3] = useState({
        name: '',
        age_group: '',
        url: '',
        added: false
    })
    const [child4, setChild4] = useState({
        name: '',
        age_group: '',
        url: '',
        added: false
    })

    const [ageGroups, setAgeGroups] = useState([])
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    })

    const jwt = localStorage.getItem('token');

    useEffect(() => {
        getAgeGroups();
        if(jwt){
            const userInfo = jwtDecode(jwt);
            setUser(userInfo);
        }
    }, [jwt])

    let childArray = [child1, child2, child3, child4]
    childArray.map(child => {
        if (child.age_group === "Infant (Younger than 12 months)"){
            child.url = "http://127.0.0.1:8000/age_groups/1/"
        }
        else if (child.age_group === "Young Toddler (1-2 years)"){
            child.url = "http://127.0.0.1:8000/age_groups/2/"
        }
        else if (child.age_group === "Older Toddler (2-3 years)"){
            child.url = 'http://127.0.0.1:8000/age_groups/3/'
        }
        else if (child.age_group === "Preschooler (3-5 years)"){
            child.url = 'http://127.0.0.1:8000/age_groups/4/'
        }
    })

    async function getAgeGroups(){
        try{
            const response = await serviceLayer.getAllAgeGroups();
            setAgeGroups(response.data);
        }
        catch(err){
            console.log('Request for Age Groups invalid', err);
        }
    }

    const handleParentChanges = (e) => {
        setParent({
            ...parent,
            [e.target.name]: e.target.value
        })
    }

    // **** NEEDS TO BE REFACTORED *** \\\\

    const handleChild1Change = (e) => {
        setChild1({
            ...child1,
            [e.target.name]: e.target.value
        })
    }
    const handleChild2Change = (e) => {
        setChild2({
            ...child2,
            [e.target.name]: e.target.value
        })
    }
    const handleChild3Change = (e) => {
        setChild3({
            ...child3,
            [e.target.name]: e.target.value
        })
    }
    const handleChild4Change = (e) => {
        setChild4({
            ...child4,
            [e.target.name]: e.target.value
        })
    }
    // **** NEEDS TO BE REFACTORED *** \\\\

    const selectAgeGroup1 = () => {
        
        return (
            <FormControl className={classes.select}>
                <InputLabel htmlFor="age_group">Age Group</InputLabel>
                <Select
                name="age_group"
                value={child1.age_group}
                onChange={handleChild1Change}
                input={<Input id="age_group" />}
                >
                {ageGroups && ageGroups.map((groups, i) => {
                    return (
                        <MenuItem key={i} value={groups.group_name}>{groups.group_name}</MenuItem>
                        
                    )
                    
                })}
                </Select>
            </FormControl>
        )
    }
    const selectAgeGroup2 = () => {
        
        return (
            <FormControl className={classes.select}>
                <InputLabel htmlFor="age_group">Age Group</InputLabel>
                <Select
                name="age_group"
                value={child2.age_group}
                onChange={handleChild2Change}
                input={<Input id="age_group" />}
                >
                {ageGroups && ageGroups.map((groups, i) => {
                    return (
                        <MenuItem key={i} value={groups.group_name}>{groups.group_name}</MenuItem>
                        
                    )
                    
                })}
                </Select>
            </FormControl>
        )
    }
    const selectAgeGroup3 = () => {
        
        return (
            <FormControl className={classes.select}>
                <InputLabel htmlFor="age_group">Age Group</InputLabel>
                <Select
                name="age_group"
                value={child3.age_group}
                onChange={handleChild3Change}
                input={<Input id="age_group" />}
                >
                {ageGroups && ageGroups.map((groups, i) => {
                    return (
                        <MenuItem key={i} value={groups.group_name}>{groups.group_name}</MenuItem>
                        
                    )
                    
                })}
                </Select>
            </FormControl>
        )
    }
    const selectAgeGroup4 = () => {
        
        return (
            <FormControl className={classes.select}>
                <InputLabel htmlFor="age_group">Age Group</InputLabel>
                <Select
                name="age_group"
                value={child4.age_group}
                onChange={handleChild4Change}
                input={<Input id="age_group" />}
                >
                {ageGroups && ageGroups.map((groups, i) => {
                    return (
                        <MenuItem key={i} value={groups.group_name}>{groups.group_name}</MenuItem>
                        
                    )
                    
                })}
                </Select>
            </FormControl>
        )
    }

    async function handleSubmit(e) {
        debugger;
        e.preventDefault();

        if(child1.age_group){
            const data = {
                name: child1.name,
                age_group: child1.url
            }
            try{
                let response = await serviceLayer.createChild(data);
                console.log('child1', response);
                child1.url = `http://127.0.0.1:8000/child/${response.data.id}/`;
            }
            catch(err){
                console.log('child1', err);
            }
        }
        if(child2.age_group){
            const data = {
                name: child2.name,
                age_group: child2.url
            }
            try{
                let response = await serviceLayer.createChild(data);
                console.log('child2', response);
                child2.url = `http://127.0.0.1:8000/child/${response.data.id}/`;
            }
            catch(err){
                console.log('child2', err);
                
            }
        }
        if(child3.age_group){
            const data = {
                name: child3.name,
                age_group: child3.url
            }
                
            try{
                let response = await serviceLayer.createChild(data);
                console.log('child3', response);
                child3.url = `http://127.0.0.1:8000/child/${response.data.id}/`;
            }
            catch(err){
                console.log('child3', err);
            }
        }
        if(child4.age_group){
            const data = {
                name: child4.name,
                age_group: child4.url
            }
            try{
                let response = await serviceLayer.createChild(data);
                console.log('child4', response);
                child4.url = `http://127.0.0.1:8000/child/${response.data.id}/`;
            }
            catch(err){
                console.log('child4', err);
            }
        }
        
        childArray.forEach(child => {
            if(child.age_group){
                parent.children.push(child.url);
            }
        })

        const parentData = {
            user: user.user_id,
            street_address: parent.street_address,
            city: parent.city,
            state: parent.state,
            zip_code: parent.zip_code,
            child: parent.children,
        }
        try{
            let response = await serviceLayer.createParent(parentData);
            console.log(response);
            window.location.href = '/view-parent-profile';
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className={classes.root}>
        <Paper className={classes.paper} >
        <div style={{textAlign: 'center'}}><h1>Create Your Profile</h1></div>
            <form className={classes.form} noValidate>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={2}/>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="street_address"
                    label="Street Address"
                    name="street_address"
                    value={parent.street_address}
                    onChange={handleParentChanges}
                    autoComplete="street_address"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    value={parent.city}
                    onChange={handleParentChanges}
                    autoComplete="city"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    //inputProps={{max: '3'}}
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    value={parent.state}
                    onChange={handleParentChanges}
                    autoComplete="state"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Zip"
                    name="zip_code"
                    value={parent.zip_code}
                    onChange={handleParentChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={2}/>
                    {/* Child */}
                    <Grid item xs={2}/>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child1.name}
                    onChange={handleChild1Change}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <Grid item xs={3}>
                    {selectAgeGroup1()}
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option1: true}) }>
                                {options.option1 === true  ? <></>
                                : 
                                <span style={{display: 'flex'}}><AddBoxIcon className={classes.icon}/><span style={{display: 'flex', marginLeft: '1rem'}}>Add Child</span></span>
                                
                                }
                            </span>
                        </div>
                    </Grid>
                    {options.option1 === true ? 
                    <>
                    <Grid item xs={2}/>
                    {/* Child */}
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child2.name}
                    onChange={handleChild2Change}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    {selectAgeGroup2()}
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option2: true}) }>
                                {options.option2 === true  ? <></>
                                : 
                                <span style={{display: 'flex'}}><AddBoxIcon className={classes.icon}/><span style={{display: 'flex', marginLeft: '1rem'}}>Add Child</span></span>
                                
                                }
                            </span>
                        </div>
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    {options.option2 === true ? 
                    <>
                    <Grid item xs={2}/>
                    {/* Child */}
                    <Grid item xs={3}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child3.name}
                    onChange={handleChild3Change}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    {selectAgeGroup3()}
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option3: true}) }>
                                {options.option3 === true  ? <></>
                                :  
                                <span style={{display: 'flex'}}><AddBoxIcon className={classes.icon}/><span style={{display: 'flex', marginLeft: '1rem'}}>Add Child</span></span>
                                }
                            </span>
                        </div>
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    {options.option3 === true ? 
                    <>
                    <Grid item xs={1}/>
                    <Grid item xs={2}/>
                    {/* Child */}
                    <Grid item xs={3}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child4.name}
                    onChange={handleChild4Change}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    {selectAgeGroup4()}
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Button fullWidth variant="contained" color="primary" type="submit" onClick={handleSubmit} className={classes.submit}>Submit</Button>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={1} />
                </Grid>
            </form>
        </Paper>
        </div>

    )
}


