import React, { useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';


function SubmitScoresItem({score}) {
    const [isSubmitted, setIsSubmitted] = useState(true);

    const handleChange = (event) => {
        setIsSubmitted(event.target.checked);
        console.log(isSubmitted);
    };

    //function for formatting date
    function formatDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString();
    }//end formatDate

    return(
        <TableRow>
            <TableCell>
                <Checkbox 
                onChange={handleChange} 
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}>
                </Checkbox>
            </TableCell>
            <TableCell align="right">{formatDate(score.date)}</TableCell>
            <TableCell align="right">{score.climbGrade}</TableCell>
            <TableCell align="right">{score.climbScore}</TableCell>
        </TableRow>
    )
}

export default SubmitScoresItem;