import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel } from '@material-ui/core';
import Image from '../../Assets/daycare_toys.jpg';
import { TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Dropdown } from 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '150vh',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        justifyContent: 'center',
    },
    // image: {
    //     backgroundImage: `url(${Image})`,
    //     backgroundColor:
    //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //     backgroundSize: '100%',
    //     backgroundPosition: 'top',
    // },
    paper: {
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
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#60B0F4',
        fontWeight: 'bold',
    },
    }));


export default function DaycareProfile() {
    const classes = useStyles();
    const [daycare, setDaycare] = useState({
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        images: '',
        description: '',
        min_cost: '',
        max_cost: '',
        teacher_child_ratio: '',
        availability: true,
        age_groups: []
    });
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    })



    return (
        <div className={classes.root}>
        <Paper className={classes.paper} >
        <div style={{textAlign: 'center'}}><p><h1>Daycare Profile</h1></p></div>
            <form className={classes.form} noValidate onSubmit>
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
                    // onChange={handleChanges}
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
                    // onChange={handleChanges}
                    autoComplete="description"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={2} />
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
                    // onChange={handleChanges}
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
                    // onChange={handleChanges}
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
                    // onChange={handleChanges}
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
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={2}/>
                    <Grid item xs={2}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Age Group"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Min Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Max Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                            <span onClick={() =>setOptions({...options, option1: true}) }>
                                {options.option1 == true  ? <></>
                                :  
                                <AddBoxIcon color='secondary' style={{cursor: 'pointer'}} />
                                }
                            </span>
                        </div>
                    </Grid>
                    {options.option1 == true ? 
                    <>
                    <Grid item xs={2}/>
                    <Grid item xs={2}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Age Group"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Min Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Max Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                        <span onClick={() =>setOptions({...options, option2: true}) }>
                                {options.option2 == true  ? <></>
                                :  
                                <AddBoxIcon color='secondary' style={{cursor: 'pointer'}} />
                                }
                        </span>
                        </div>
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    {options.option2 == true ? 
                    <>
                    <Grid item xs={2}/>
                    <Grid item xs={2}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Age Group"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Min Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Max Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{marginTop: '30px'}}>
                        <span onClick={() =>setOptions({...options, option3: true}) }>
                                {options.option3 == true  ? <></>
                                :  
                                <AddBoxIcon color='secondary' style={{cursor: 'pointer'}} />
                                }
                        </span>
                        </div>
                    </Grid>
                    </>
                    :
                    <></>
                    }
                    {options.option3 == true ? 
                    <>
                    <Grid item xs={2}/>
                    <Grid item xs={2}>
                    {/* DROPDOWN MENU OF AGE GROUPS */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Age Group"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Min Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip_code"
                    label="Estimated Max Monthly Cost"
                    name="zip_code"
                    value={daycare.zip_code}
                    // onChange={handleChanges}
                    autoComplete="zip_code"
                    autoFocus
                    />
                    </Grid>
                    </>
                    :
                    <></>
                    }
                </Grid>
            </form>
        </Paper>

        </div>

    )
}


