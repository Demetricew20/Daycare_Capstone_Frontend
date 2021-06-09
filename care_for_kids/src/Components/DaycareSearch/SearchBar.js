import { Button, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import serviceLayer from '../../Service/serviceLayer';
import SearchIcon from '@material-ui/icons/Search';

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
    },
    icon: {
        color: '#60B0F4',
        fontSize: '1.75rem',
        padding: 0,
        margin: 0,
        position: 'relative',
        top: '20px',
        cursor: 'pointer',
    }
    }));

function SearchBar(props) {

    const [daycares, setDaycares] = useState([]);
    const [ageGroups, setAgeGroups] = useState([])
    const [selectedAgeGroup, setSelectedAgeGroup] = useState();
    const [selectedRadius, setSelectedRadius] = useState();
    const [location, setLocation] = useState();

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        setDaycares(props.daycares);
    }, [props])

    async function getGroups(){
        try{
            const response = await serviceLayer.getAllAgeGroups();
            setAgeGroups(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleAgeGroupChange = (e) => {
        setSelectedAgeGroup(e.target.value);
    }
    const handleRadiusChange = (e) => {
        setSelectedRadius(e.target.value);
    }
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const mapGroups = () => {
        return (
            ageGroups.map((group, i) => {
                return(
                    <>
                    <option key={i} value={group.group_name}>{group.group_name}</option>
                    </>
                )
            })
        )
    }

    props.callbackRadiusSearch(selectedRadius);
    props.callbackAgeGroupSearch(selectedAgeGroup);

    const classes = useStyles();
    return (
        <div style={{display: 'flex'}}>
            <div>
                <FormControl className={classes.select}>
                    <InputLabel htmlFor="radius">Search By Available Age Group</InputLabel>
                    <Select
                    native
                    name="radius"
                    value={selectedAgeGroup}
                    onChange={handleAgeGroupChange}
                    input={<Input id="radius" />}
                    >
                    <option aria-label="None" value="" />
                    {mapGroups()}
                    </Select>
                </FormControl>
            </div>

            {/* <div>
                <FormControl className={classes.select}>
                    <InputLabel htmlFor="radius">Search By Radius</InputLabel>
                        <Select
                        native
                        name="radius"
                        value={selectedRadius}
                        onChange={handleRadiusChange}
                        input={<Input id="radius" />}
                        >
                        <option value={''}></option>
                        <option value={"15"}>15 Miles</option>
                        <option value={"30"}>30 Miles</option>
                        </Select>
                </FormControl>
            </div> */}

            <div style={{display: 'flex'}}>
                <InputLabel className={classes.inputLabel}>Search By City/State</InputLabel>
                    <TextField
                    className={classes.textField}
                    onChange={handleLocationChange}
                    placeholder="i.e. Anchorage, AK"
                    />
                    <SearchIcon 
                    className={classes.icon}
                    onClick={() => props.callbackToSearchPage(location)}
                    />
            </div>



        </div>
    )
}

export default SearchBar
