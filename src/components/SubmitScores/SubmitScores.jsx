import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SubmitScoresItem from '../SubmitScoresItem/SubmitScoresItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        marginTop: 30,
        marginBottom: 30
    },
    input: {
        marginTop: 10,
        marginBottom: 5
    },
    title: {
      marginTop: 30
    }
})

function SubmitScores() {
    const classes = useStyles();
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

    const handleChange = (event) => {
        setIsSubmitted(!isSubmitted);
        console.log(isSubmitted);
    };

    //function for formatting date
    function formatDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString();
    }//end formatDate

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
            <Typography variant="h6" style={{marginLeft: 20}}>My Climbs This Week</Typography>
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div>
            <center>
            <Button className={classes.btn} variant="outlined" onClick={goBack} size="large">BACK</Button>
            <Button className={classes.btn} variant="outlined" onClick={handleClickOpen} size="large">SUBMIT CLIMB</Button>
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