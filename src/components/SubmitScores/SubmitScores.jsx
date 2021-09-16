import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SubmitScoresItem from '../SubmitScoresItem/SubmitScoresItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';


function SubmitScores() {
    const history = useHistory();
    const dispatch = useDispatch();
    const scores = useSelector((store) => store.score);
    const user = useSelector((store) => store.user);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        dispatch({
        type: 'FETCH_RECENT_CLIMBS',
        payload: user.id
        });
    }, [dispatch]);

    const onSubmitScores = () => {
        dispatch({
            type: 'SUBMIT_SCORES',
            payload: isSubmitted
        })
        history.push('/');
    }

    //functions to open and close dialog box
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //function to return to home page
    const goBack = () => {
        history.push('/user');
    }//end goBack

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
                    <TableBody >
                        {scores.map((score) => (
                            <SubmitScoresItem
                                key={score.id} 
                                score={score}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div>
            <center>
            <Button variant="outlined" onClick={goBack}>BACK</Button>
            <Button variant="outlined" onClick={handleClickOpen}>SUBMIT CLIMB</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>{"Would you like to submit your scores?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Selected scores will be shown here</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={onSubmitScores} color="primary" autoFocus>
                            Submit Scores
                        </Button>
                    </DialogActions>
            </Dialog>
            </center>
        </div>
        </>
    )
}

export default SubmitScores;