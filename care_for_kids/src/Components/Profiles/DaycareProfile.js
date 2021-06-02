import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, FormControl, InputLabel } from '@material-ui/core';
import Image from '../../Assets/daycare_toys.jpg';
import { TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import serviceLayer from '../../Service/serviceLayer';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import jwtDecode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '150vh',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#F6F5F3',
        opacity: '.98',
        position: 'relative',
        top: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        marginLeft: '20rem',
        marginRight: '20rem',

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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#B200FF',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
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
    const [daycare, setDaycare] = useState({
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        images: null,
        description: '',
        min_cost_infant: '',
        max_cost_infant: '',
        min_cost_youth_T: '',
        max_cost_youth_T: '',
        min_cost_old_T: '',
        max_cost_old_T: '',
        min_cost_preschool: '',
        max_cost_preschool: '',
        availability: true,
        age_groups: []
    });
    const [ageGroup1, setAgeGroup1] = useState({ageGroup: null, min_cost: '', max_cost: '', url: ''});
    const [ageGroup2, setAgeGroup2] = useState({ageGroup: null, min_cost: '', max_cost: '', url: ''});
    const [ageGroup3, setAgeGroup3] = useState({ageGroup: null, min_cost: '', max_cost: '', url: ''});
    const [ageGroup4, setAgeGroup4] = useState({ageGroup: null, min_cost: '', max_cost: '', url: ''});

    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    })

    const [ageGroups, setAgeGroups] = useState([])

    const jwt = localStorage.getItem('token');

    useEffect(() => {
        getAgeGroups();
        if(jwt){
            const userInfo = jwtDecode(jwt);
            setUser(userInfo);
        }
    }, [])

    async function getAgeGroups(){
        try{
            const response = await serviceLayer.getAllAgeGroups();
            setAgeGroups(response.data);
        }
        catch(err){
            console.log('Request for Age Groups invalid', err);
        }
    }

    const handleDaycareChanges = (e) => {
        setDaycare({
            ...daycare,
            [e.target.name]: e.target.value
        })
    }

    const handleAgeGroup1Changes = (e) => {
        setAgeGroup1({
            ...ageGroup1,
            [e.target.name]: e.target.value
        })
    }

    const handleAgeGroup2Changes = (e) => {
        setAgeGroup2({
            ...ageGroup2,
            [e.target.name]: e.target.value
        })
    }

    const handleAgeGroup3Changes = (e) => {
        setAgeGroup3({
            ...ageGroup3,
            [e.target.name]: e.target.value
        })
    }

    const handleAgeGroup4Changes = (e) => {
        setAgeGroup4({
            ...ageGroup4,
            [e.target.name]: e.target.value
        })
    }

    const selectAgeGroup1 = () => {
        return (
            <FormControl className={classes.select}>
                <InputLabel htmlFor="ageGroup">Available Age Groups</InputLabel>
                <Select
                name="ageGroup"
                value={ageGroup1.ageGroup}
                onChange={handleAgeGroup1Changes}
                input={<Input id="ageGroup" />}
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
                <InputLabel htmlFor="ageGroup">Available Age Groups</InputLabel>
                <Select
                name="ageGroup"
                value={ageGroup2.ageGroup}
                onChange={handleAgeGroup2Changes}
                input={<Input id="ageGroup" />}
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
                <InputLabel htmlFor="ageGroup">Available Age Groups</InputLabel>
                <Select
                name="ageGroup"
                value={ageGroup3.ageGroup}
                onChange={handleAgeGroup3Changes}
                input={<Input id="ageGroup" />}
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
                <InputLabel htmlFor="ageGroup">Available Age Groups</InputLabel>
                <Select
                name="ageGroup"
                value={ageGroup4.ageGroup}
                onChange={handleAgeGroup4Changes}
                input={<Input id="ageGroup" />}
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

    let ageGroupArray = [ageGroup1, ageGroup2, ageGroup3, ageGroup4]
    ageGroupArray.map(group => {
        if (group.ageGroup === "Infant (Younger than 12 months)"){
            group.url = "http://127.0.0.1:8000/age_groups/1/"
            daycare.min_cost_infant = group.min_cost;
            daycare.max_cost_infant = group.max_cost;
        }
        else if (group.ageGroup === "Young Toddler (1-2 years)"){
            group.url = "http://127.0.0.1:8000/age_groups/2/"
            daycare.min_cost_youth_T = group.min_cost;
            daycare.max_cost_youth_T = group.max_cost;
        }
        else if (group.ageGroup === "Older Toddler (2-3 years)"){
            group.url = 'http://127.0.0.1:8000/age_groups/3/'
            daycare.min_cost_old_T = group.min_cost;
            daycare.max_cost_old_T = group.max_cost;
        }
        else if (group.ageGroup === "Preschooler (3-5 years)"){
            group.url = 'http://127.0.0.1:8000/age_groups/4/'
            daycare.min_cost_preschool = group.min_cost;
            daycare.max_cost_preschool = group.max_cost;
        }
    })


    async function handleSubmit(e){
        debugger
        e.preventDefault();
        
        ageGroupArray.forEach(group => {
            if (group.min_cost && group.max_cost){
                daycare.age_groups.push(group.url);
            }
        })

        console.log(daycare);

        try{
            const data = {
                user: user.user_id,
                name: daycare.name,
                street_address: daycare.street_address,
                city: daycare.city,
                state: daycare.state,
                zip_code: daycare.zip_code,
                images: null,
                description: daycare.description,
                min_cost_infant: daycare.min_cost_infant,
                max_cost_infant: daycare.max_cost_infant,
                min_cost_youth_T: daycare.min_cost_youth_T,
                max_cost_youth_T: daycare.max_cost_youth_T,
                min_cost_old_T: daycare.min_cost_old_T,
                max_cost_old_T: daycare.max_cost_old_T,
                min_cost_preschool: daycare.min_cost_preschool,
                max_cost_preschool: daycare.max_cost_preschool,
                availability: true,
                age_groups: daycare.age_groups
            }
            let response = await serviceLayer.createDaycare(data);
            console.log(response);
            window.location.href = '/view-daycare-profile';
        }
        catch(err){
            console.log('Error creating daycare profile', err)
        }
    }

    return (
        <div className={classes.root}>
        <Paper className={classes.paper} >
        <div style={{textAlign: 'center'}}><h1>Daycare Profile</h1></div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={4}/>
                    <Grid item xs={4}  >
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Daycare Name"
                        name="name"
                        value={daycare.name}
                        onChange={handleDaycareChanges}
                        autoComplete="name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={2} />
                    <Grid item xs={8}  >
                        <TextField
                        variant="outlined"
                        margin="normal"
                        multiline={true}
                        size='medium'
                        rows={10}
                        required
                        fullWidth
                        id="description"
                        label="Daycare Description"
                        placeholder="250 characters max"
                        name="description"
                        value={daycare.description}
                        onChange={handleDaycareChanges}
                        autoComplete="description"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={1} />
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
                        value={daycare.street_address}
                        onChange={handleDaycareChanges}
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
                        value={daycare.city}
                        onChange={handleDaycareChanges}
                        autoComplete="city"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        // inputProps={{max: '3'}}
                        required
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        value={daycare.state}
                        onChange={handleDaycareChanges}
                        autoComplete="state"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="zip_code"
                        label="Zip"
                        name="zip_code"
                        value={daycare.zip_code}
                        onChange={handleDaycareChanges}
                        autoComplete="zip_code"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={2}/>
                    <Grid item xs={3}>
                        {selectAgeGroup1()}
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="min_cost"
                        label="Est. Min Monthly Cost"
                        name="min_cost"
                        value={ageGroup1.min_cost}
                        onChange={handleAgeGroup1Changes}
                        autoComplete="min_cost"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="max_cost"
                        label="Est. Max Monthly Cost"
                        name="max_cost"
                        value={ageGroup1.max_cost}
                        onChange={handleAgeGroup1Changes}
                        autoComplete="max_cost"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option1: true}) }>
                                {options.option1 === true  ? <></>
                                : 
                                <span style={{display: 'flex'}}><AddBoxIcon className={classes.icon}/><span style={{display: 'flex', marginLeft: '1rem'}}>Add Group</span></span>
                                
                                }
                            </span>
                        </div>
                    </Grid>
                    {options.option1 === true ? 
                    <>
                    <Grid item xs={1}/>
                    <Grid item xs={2}/>
                    <Grid item xs={3}>
                        {selectAgeGroup2()}
                    </Grid>
                    <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="min_cost"
                    label="Est. Min Monthly Cost"
                    name="min_cost"
                    value={ageGroup2.min_cost}
                    onChange={handleAgeGroup2Changes}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="max_cost"
                    label="Est. Max Monthly Cost"
                    name="max_cost"
                    value={ageGroup2.max_cost}
                    onChange={handleAgeGroup2Changes}
                    autoComplete="max_cost"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option2: true}) }>
                                {options.option2 === true  ? <></>
                                : 
                                <span style={{display: 'flex'}}><AddBoxIcon className={classes.icon}/><span style={{display: 'flex', marginLeft: '1rem'}}>Add Group</span></span>
                                
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
                    <Grid item xs={2}/>
                    <Grid item xs={3}>
                        {selectAgeGroup3()}
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="min_cost"
                        label="Est. Min Monthly Cost"
                        name="min_cost"
                        value={ageGroup3.min_cost}
                        onChange={handleAgeGroup3Changes}
                        autoComplete="min_cost"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="max_cost"
                        label="Est. Max Monthly Cost"
                        name="max_cost"
                        value={ageGroup3.max_cost}
                        onChange={handleAgeGroup3Changes}
                        autoComplete="max_cost"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={1}>
                    <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option3: true}) }>
                                {options.option3 === true  ? <></>
                                : 
                                <span style={{display: 'flex'}}><AddBoxIcon className={classes.icon}/><span style={{display: 'flex', marginLeft: '1rem'}}>Add Group</span></span>
                                
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
                    <Grid item xs={2}/>
                    <Grid item xs={2}/>
                    <Grid item xs={3}>
                        {selectAgeGroup4()}
                    </Grid>
                    <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="min_cost"
                    label="Est. Min Monthly Cost"
                    name="min_cost"
                    value={ageGroup4.min_cost}
                    onChange={handleAgeGroup4Changes}
                    autoComplete="min_cost"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="max_cost"
                    label="Est. Max Monthly Cost"
                    name="max_cost"
                    value={ageGroup4.max_cost}
                    onChange={handleAgeGroup4Changes}
                    autoComplete="max_cost"
                    autoFocus
                    />
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Button fullWidth variant="contained" type="submit" className={classes.submit} color="primary">Submit</Button>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={1} />
                </Grid>
            </form>
        </Paper>
        </div>

    )
}


