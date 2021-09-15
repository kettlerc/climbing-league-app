import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';

function AddClimb() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    
    //local state for the form
    const [climbType, setClimbType] = useState('');
    const [value, setValue] = useState(0.1);
    const [grade, setGrade] = useState('5.7');
    const [isFlash, setIsFlash] = useState(false);
    const [isOnSight, setIsOnSight] = useState(false);
    const [isBonus, setIsBonus] = useState(false);
    const [bonusPoints, setBonusPoints] = useState(0);
    const [scoreOne, setScoreOne] = useState(10);
    const [score, setScore] = useState(10);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [date, setDate] = useState('2008-11-11');
    const [open, setOpen] = useState(false);


    //parameters for choose climb dropdown
    const chooseClimbType = (event, climbType) => {
        setClimbType(climbType);
        if (climbType === 'Auto Belay') {
            setScoreOne(10);
        } 
        else if (climbType === 'Top Rope') {
            setScoreOne(11);
        } 
        else if (climbType === 'Lead'){
            setScoreOne(12);
        }
        return score;
    }//end chooseClimbType

    //function to compare climb grade against flash level
    const compareGrade = () => {
        if((value * 10) > user.gradeLevel){
            let newScore = (value * 10) - user.gradeLevel;
            setScore(scoreOne + newScore);
        } else {
            setScore(scoreOne);
        }
        return score;
    }//end compareGrade

    //variables and parameters for circular input
    const stepValue = v => Math.round(v * 10) / 10
    const min = 0.1
    const max = 0.9
    const valueWithinLimits = v => Math.min(Math.max(v, min), max)
    const changeValue = v => {
        setValue(stepValue(v));
        compareGrade();
        switch(value) {
            case 0.1:
                setGrade('5.7')
                break;
            case 0.2:
                setGrade('5.8')
                break;
            case 0.3:
                setGrade('5.9')
                break;
            case 0.4:
                setGrade('5.10')
                break;
            case 0.5:
                setGrade('5.11-')
                break;
            case 0.6:
                setGrade('5.11+')
                break;
            case 0.7:
                setGrade('5.12-')
                break;
            case 0.8:
                setGrade('5.12+')
                break;
            case 0.9:
                setGrade('5.13-')
                break;
            }
        }

    //function for adding extra bonus points
    const checkBonusPoints = (event, bonusPoints) => {
        setBonusPoints(bonusPoints);
        console.log('bonus points:', bonusPoints);
        if('Flash'){
            setScore(score + 1);
        }
        if('OnSight'){
            setScore(score + 1);
        } 
        if('Bonus'){
            setScore(score + 1);
        }  
    }//end checkBonusPoints

    //submit climb function
    const submitClimb = () => {
        compareGrade();
        let climb = {
            climbType,
            climbGrade: grade,
            isFlash,
            isOnSight,
            isBonus,
            isSubmitted,
            climbScore: score,
            date: date,
            climberId: user.id
        }
        console.log(climb);

        dispatch({
            type: 'ADD_CLIMB',
            payload: climb
        });

        history.push('/user');
    }//end submitClimb

    //function to return to home page
    const goBack = () => {
        history.push('/user');
    }//end goBack

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container">
            <form>
                <center>
                    <div>
                        <ToggleButtonGroup
                            value={climbType}
                            exclusive
                            onChange={chooseClimbType}
                        >
                            <ToggleButton value="Auto Belay">AUTO BELAY</ToggleButton>
                            <ToggleButton value="Top Rope">TOP ROPE</ToggleButton>
                            <ToggleButton value="Lead">LEAD</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        <CircularInput
                            value={valueWithinLimits(value)}
                            onChange={changeValue}
                            radius={70}>
                                <CircularTrack className="circularTrack"/>
                                <CircularProgress className="circularProgress"/>
                                <CircularThumb className="circularThumb"/>
                                <text 
                                    x={70} 
                                    y={70} 
                                    textAnchor="middle" 
                                    dy="0.3em"
                                    fontSize="35" 
                                    fontWeight="bold">
                                    {grade}
                                </text>
                        </CircularInput>
                    </div>
                    <div>
                        <ToggleButtonGroup
                            value={bonusPoints}
                            onChange={checkBonusPoints}
                        >
                            <ToggleButton value="Flash">FLASH</ToggleButton>
                            <ToggleButton value="OnSight">ON SIGHT</ToggleButton>
                            <ToggleButton value="Bonus">BONUS</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        <Typography 
                            variant="h4"
                            align="center"
                        >SCORE: {score}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="outlined" onClick={goBack}>BACK</Button>
                        <Button variant="outlined" onClick={handleClickOpen}>SUBMIT CLIMB</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}>
                            <DialogTitle>{"Would you like to add this climb?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>TYPE OF CLIMB: {climbType}</DialogContentText>
                                <DialogContentText>GRADE: {grade}</DialogContentText>
                                <DialogContentText>FLASH: {isFlash}</DialogContentText>
                                <DialogContentText>ON SIGHT: {isOnSight}</DialogContentText>
                                <DialogContentText>TOTAL SCORE: {score}</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={submitClimb} color="primary" autoFocus>
                                    Add Climb
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </center>
            </form>
        </div>
    )
}

export default AddClimb;