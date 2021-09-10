import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


function AddClimb() {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    
    //local state for the form
    const [climbType, setClimbType] = useState('');
    const [value, setValue] = useState(0.1);
    const [grade, setGrade] = useState('5.7');
    const [isFlash, setIsFlash] = useState(false);
    const [isOnSight, setIsOnSight] = useState(false);
    const [isBonus, setIsBonus] = useState(false);
    const [bonusPoints, setBonusPoints] = useState(0);
    const [score, setScore] = useState(10);

    const compareGrade = () => {
        if((value * 10) > user.gradeLevel){
            console.log('is this working???', value, user.gradeLevel);
            let newScore = (value * 10) - user.gradeLevel;
            setScore(score + newScore);
        }
        return score;
    }

    //variables and parameters for circular input
    const stepValue = v => Math.round(v * 10) / 10
    const min = 0.1
    const max = 0.9
    const valueWithinLimits = v => Math.min(Math.max(v, min), max)
    const changeValue = v => {
        setValue(stepValue(v));
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

    const checkBonusPoints = (event, bonusPoints) => {
        setBonusPoints(bonusPoints);
        if('Flash'){
            setIsFlash(true);
            setScore(score + 1);
        }
        if('OnSight'){
            setIsOnSight(true);
            setScore(score + 1);
        } 
        if('Bonus'){
            setIsBonus(true);
            setScore(score + 1);
        }  
    }

    //parameters for choose climb dropdown
    const chooseClimbType = (event, climbType) => {
        setClimbType(climbType);
        if ('Auto Belay') {
            setScore(score);
        } 
        if ('Top Rope') {
            setScore(score + 1);
        } 
        if ('Lead'){
            setScore(score + 2);
        }
        return score;
    }

    //submit climb function
    const submitClimb = () => {
        compareGrade();
        let climb = {
            climbType,
            grade,
            isFlash,
            isOnSight,
            isBonus,
            score
        }
        console.log(climb);
    }

    const goBack = () => {
        history.push('/user');
    }

    return (
        <div className="container">
            <form>
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
                        radius={50}>
                            <CircularTrack className="circularTrack"/>
                            <CircularProgress className="circularProgress"/>
                            <CircularThumb className="circularThumb"/>
                            <text 
                                x={50} 
                                y={50} 
                                textAnchor="middle" 
                                dy="0.3em"
                                fontSize="25" 
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
                    <h2>SCORE: {score}</h2>
                </div>
                <div>
                <Button variant="outlined" onClick={goBack}>BACK</Button>
                <Button variant="outlined" onClick={submitClimb}>SUBMIT CLIMB</Button>
                </div>
            </form>
        </div>
    )
}

export default AddClimb;