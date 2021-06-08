import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import serviceLayer from '../../Service/serviceLayer';

const useStyles = makeStyles((theme) => ({
    select: {
        width: '17rem',
        marginLeft: '1rem',

    },
    inputLabel: {
        marginLeft: '2rem',
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

function SearchBar(props) {

    const [daycares, setDaycares] = useState([]);
    const [ageGroups, setAgeGroups] = useState([])

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        setDaycares(props.daycares);
    }, [props])

    async function getGroups(){
        try{
            const response = await serviceLayer.getAllAgeGroups();
            console.log(response.data);
            setAgeGroups(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    console.log(daycares);
    console.log('age groups', ageGroups);

    const mapGroups = () => {
        return (
            ageGroups.map(group => {
                return(
                    <>
                    <option value={group.group_name}>{group.group_name}</option>
                    </>
                )
            })
        )
    }

    const classes = useStyles();
    return (
        <div style={{display: 'flex'}}>
            <div>
                <FormControl className={classes.select}>
                    <InputLabel htmlFor="radius">Search By Available Age Group</InputLabel>
                    <Select
                    native
                    name="radius"
                    // value={child1.age_group}
                    // onChange={handleChild1Change}
                    input={<Input id="radius" />}
                    >
                    <option value={''}></option>
                    {mapGroups()}
                    </Select>
                </FormControl>
            </div>

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
