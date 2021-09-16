import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


function SubmitScores() {
    const history = useHistory();
    const dispatch = useDispatch();
    const scores = useSelector((store) => store.score);
    const user = useSelector((store) => store.user);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        dispatch({
        type: 'FETCH_RECENT_CLIMBS',
        payload: user.id
        });
    }, [dispatch]);

    const handleChange = (event) => {
        setIsSubmitted(event.target.checked);
        console.log(isSubmitted);
    };

    const onSubmitScores = () => {
        dispatch({
            type: 'SUBMIT_SCORES',
            payload: isSubmitted
        })
        // history.push('/');
    }

    //function to return to home page
    const goBack = () => {
        history.push('/user');
    }//end goBack

    //function for fomratting date
    function formatDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString();
    }//end formatDate

    return (
        <>
        <div>
            <TableContainer component={Paper}>
            <Table aria-label="recent climbs">
                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>GRADE</TableCell>
                    <TableCell>SCORE</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {scores.map((score) => (
                    <TableRow key={score.id}>
                    <TableCell><Checkbox 
                                onChange={handleChange} 
                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}>
                                </Checkbox>
                    </TableCell>
                    <TableCell align="right">{formatDate(score.date)}</TableCell>
                    <TableCell align="right">{score.climbGrade}</TableCell>
                    <TableCell align="right">{score.climbScore}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        <div>
            <center>
                <Button variant="outlined" onClick={goBack}>BACK</Button>
                <Button variant="outlined" onClick={onSubmitScores}>SUBMIT SCORES</Button>
            </center>
        </div>
        </>
    )
}

export default SubmitScores;