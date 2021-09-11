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
    };

    const onSubmitScores = () => {
        dispatch({
            type: 'SUBMIT_SCORES',
        })
        history.push('/');
    }

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
                    <TableRow key={score.climbScore}>
                    <TableCell><Checkbox 
                                onChange={handleChange} 
                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}>
                                    </Checkbox>
                    </TableCell>
                    <TableCell align="right">{score.date}</TableCell>
                    <TableCell align="right">{score.climbGrade}</TableCell>
                    <TableCell align="right">{score.climbScore}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        <div>
            <Button variant="outlined" onClick={onSubmitScores}>SUBMIT SCORES</Button>
        </div>
        </>
    )
}

export default SubmitScores;