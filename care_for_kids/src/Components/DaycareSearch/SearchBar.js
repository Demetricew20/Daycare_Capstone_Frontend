import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    select: {
        width: '17rem',
        marginLeft: '1rem',

    },
    inputLabel: {
        marginLeft: '5rem',
        marginRight: '1rem',
        position: 'relative',
        top: '30px'
    },
    textField: {
        position: 'relative',
        top: '15px',
        width: '20rem'
    }
    }));

function SearchBar() {

    const classes = useStyles();
    return (
        <div style={{display: 'flex'}}>
            <div>
                <FormControl className={classes.select}>
                    <InputLabel htmlFor="radius">Search By Radius</InputLabel>
                    <Select
                    native
                    name="radius"
                    // value={child1.age_group}
                    // onChange={handleChild1Change}
                    input={<Input id="radius" />}
                    >
                    <option value={''}></option>
                    <option value={"15"}>15 Miles</option>
                    <option value={"30"}>30 Miles</option>
                    </Select>
                </FormControl>
            </div>

            <div style={{display: 'flex'}}>
                <InputLabel className={classes.inputLabel}>Search By City/State</InputLabel>
                <TextField
                className={classes.textField}
                placeholder="i.e. Anchorage, AK"
                
                />
            </div>

        </div>
    )
}

export default SearchBar
