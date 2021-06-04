import React, { useEffect, useState } from 'react'
import DaycareSearchTable from './DaycareSearchTable';

const DaycareSearchPage = (props) => {

    const [allDaycares, setAllDaycares] = useState([]);
    const [parent, setParent] = useState();


    useEffect(() => {
        setParent(props.parent);
        setAllDaycares(props.daycares);
    }, [props])


    console.log(allDaycares);
    console.log(parent);
    return (
        <div>
            <h4>Hello</h4>
            <div>
                <DaycareSearchTable />
            </div>
        </div>
    )
}

export default DaycareSearchPage
