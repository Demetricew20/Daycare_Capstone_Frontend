import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, FormControl, InputLabel } from '@material-ui/core';
import Image from '../../Assets/daycare_room.jpg';
import { TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Dropdown } from 'react-bootstrap';


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
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#B200FF',
        fontWeight: 'bolder',
        color: '#EDE9E1'
    },
    }));


export default function DaycareProfile() {
    const classes = useStyles();
    const [parent, setParent] = useState({
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        child: [],
        availability: true,
        age_groups: []
    });
    const [child, setChild] = useState({
        name: '',
        age_group: null
    })
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    })

    const handleParentChanges = (e) => {
        setParent({
            ...parent,
            [e.target.name]: e.target.value
        })
    }

    const handleChildChanges = (e) => {
        setChild({
            ...child,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className={classes.root}>
        <Paper className={classes.paper} >
        <div style={{textAlign: 'center'}}><p><h1>Create Your Profile</h1></p></div>
            <form className={classes.form} noValidate onSubmit>
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
                    <Grid item xs={4}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child.name}
                    onChange={handleChildChanges}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="age_group"
                    label="Age Group"
                    name="age_group"
                    value={child.age_group}
                    onChange={handleChildChanges}
                    autoComplete="age_group"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option1: true}) }>
                                {options.option1 === true  ? <></>
                                :  
                                <AddBoxIcon className={classes.icon}/>
                                }
                            </span>
                        </div>
                    </Grid>
                    {options.option1 === true ? 
                    <>
                    <Grid item xs={2}/>
                    {/* Child */}
                    <Grid item xs={4}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child.name}
                    onChange={handleChildChanges}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="teacher_child_ratio"
                    label="Age Group"
                    name="teacher_child_ratio"
                    
                    // onChange={handleChanges}
                    autoComplete="teacher_child_ratio"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option2: true}) }>
                                {options.option2 === true  ? <></>
                                :  
                                <AddBoxIcon color='secondary' className={classes.icon}  />
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
                    <Grid item xs={4}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child.name}
                    onChange={handleChildChanges}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="teacher_child_ratio"
                    label="Age Group"
                    name="teacher_child_ratio"
                    
                    // onChange={handleChanges}
                    autoComplete="teacher_child_ratio"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option3: true}) }>
                                {options.option3 === true  ? <></>
                                :  
                                <AddBoxIcon color='secondary' className={classes.icon} />
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
                    {/* Child */}
                    <Grid item xs={4}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Child Name"
                    name="name"
                    value={child.name}
                    onChange={handleChildChanges}
                    autoComplete="name"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="teacher_child_ratio"
                    label="Age Group"
                    name="teacher_child_ratio"
                    
                    // onChange={handleChanges}
                    autoComplete="teacher_child_ratio"
                    autoFocus
                    />
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}>Submit</Button>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={1} />
                </Grid>
            </form>
        </Paper>
        </div>

    )
}


