import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        marginTop: 30,
        marginBottom: 30
    }
})

function AddClimb() {
    const classes = useStyles();
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
    const [bonuses, setBonuses] = useState([]);
    const [bonusScore, setBonusScore] = useState(0);
    const [typeScore, setTypeScore] = useState(0);
    const [scoreOne, setScoreOne] = useState(10);
    const [score, setScore] = useState(10);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [date, setDate] = useState('1111-11-11');
    const [open, setOpen] = useState(false);

    //function to compare climb grade against flash level
    const compareGrade = (currentValue) => {
        if((currentValue * 10) >= user.gradeLevel){
            let newScore = (currentValue * 10) - user.gradeLevel;
            setScore(scoreOne + newScore);
        } 
        return score;
    }//end compareGrade

    //variables and parameters for circular input
    const stepValue = v => Math.round(v * 10) / 10
    const min = 0.1
    const max = 0.9
    const valueWithinLimits = v => Math.min(Math.max(v, min), max)
    const changeValue = v => {
        console.log('stepvalue:', stepValue(v));
        const currentValue = stepValue(v);
        setValue(currentValue);
        compareGrade(currentValue);
        switch(currentValue) {
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
            date,
            climberId: user.id
        }
        // console.log(climb);

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

    //functions to open and close dialog box
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    //parameters for choose climb dropdown
    const chooseClimbType = (event, climbType) => {
        setClimbType(climbType);
        // console.log('climbtype:', climbType);
        if (climbType !== 'Lead' && climbType === 'Top Rope') {
            setTypeScore(1);
        } 
        else if (climbType === 'Lead' && climbType !== 'Tope Rope'){
            setTypeScore(2);
        }
        else if (climbType !== 'Lead' && climbType !== 'Top Rope') {
            setTypeScore(0);
        }  
    }//end chooseClimbType

    //function for adding extra bonus points
    const checkBonuses = (event, bonuses) => {
        setBonuses(bonuses);
        console.log('bonuses:', bonuses);
        for (let bonus of bonuses) {
            if (bonus === 'Flash'){
                setBonusScore(bonuses.length);
                setIsFlash(true);
            } else if (bonus === 'OnSight'){
                setBonusScore(bonuses.length);
                setIsOnSight(true);
            } else if (bonus === 'Bonus'){
                setBonusScore(bonuses.length);
                setIsBonus(true);
            }
        }
        console.log('flash', isFlash);
    }//end checkBonusPoints


    return (
        <div className="container">
            <form>
                <center>
                    <div>
                        <ToggleButtonGroup
                            className={classes.btn}
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
                            className={classes.btn}
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
                            className={classes.btn}
                            value={bonuses}
                            onChange={checkBonuses}
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
                        >SCORE: {score + bonusScore + typeScore}
                        </Typography>
                    </div>
                    <div className={classes.btn}>
                        <Button variant="outlined" onClick={goBack} size="large">BACK</Button>
                        <Button variant="outlined" onClick={handleClickOpen} size="large">SUBMIT CLIMB</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}>
                            <DialogTitle>{"Would you like to add this climb?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>TYPE OF CLIMB: {climbType}</DialogContentText>
                                <DialogContentText>GRADE: {grade}</DialogContentText>
                                <DialogContentText>BONUSES: {bonuses}</DialogContentText>
                                <DialogContentText>TOTAL SCORE: {score + bonusScore + typeScore}</DialogContentText>
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