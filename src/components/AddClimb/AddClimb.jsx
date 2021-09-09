import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


function AddClimb() {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    
    //local state for the form
    const [climbType, setClimbType] = useState('');
    const [value, setValue] = useState(0.1);
    const [grade, setGrade] = useState('5.7');
    const [isFlash, setIsFlash] = useState(false);
    const [flashChecked, setFlashChecked] = useState(false);
    const [isOnSight, setIsOnSight] = useState(false);
    const [onSightChecked, setOnSightChecked] = useState(false);
    const [isBonus, setIsBonus] = useState(false);
    const [bonusChecked, setBonusChecked] = useState(false);
    const [score, setScore] = useState(10);

    //parameters for choose climb dropdown
    const chooseClimbType = (event) => {
        setClimbType(event.target.value);
        if (climbType === 'Auto Belay') {
            return score;
        } else if (climbType === 'Top Rope') {
            setScore(score + 1);
        } else if (climbType === 'Lead'){
            setScore(score + 2);
        }
        return score;
    }

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
                compareGrade();
                setGrade('5.7')
                break;
            case 0.2:
                compareGrade();
                setGrade('5.8')
                break;
            case 0.3:
                compareGrade();
                setGrade('5.9')
                break;
            case 0.4:
                compareGrade();
                setGrade('5.10')
                break;
            case 0.5:
                compareGrade();
                setGrade('5.11-')
                break;
            case 0.6:
                compareGrade();
                setGrade('5.11+')
                break;
            case 0.7:
                compareGrade();
                setGrade('5.12-')
                break;
            case 0.8:
                compareGrade();
                setGrade('5.12+')
                break;
            case 0.9:
                compareGrade();
                setGrade('5.13-')
                break;
            }
        }

    //parameters for checkboxes
    const flashCheckbox = () => {
        if( flashChecked === false) {
            setFlashChecked(true);
            setScore(score + 1);
            setIsFlash(true);
        } else {
            setFlashChecked(false);
            setScore(score-1);
            setIsFlash(false);
        }   
        return score;
    }

    const onSightCheckbox = () => {
        if( onSightChecked === false) {
            setOnSightChecked(true);
            setScore(score + 1);
            setIsOnSight(true);
        } else {
            setOnSightChecked(false);
            setScore(score-1);
            setIsOnSight(false);
        }   
        return score;
    }

    const bonusCheckbox = () => {
        if( bonusChecked === false) {
            setBonusChecked(true);
            setScore(score + 1);
            setIsBonus(true);
        } else {
            setBonusChecked(false);
            setScore(score-1);
            setIsBonus(false);
        }   
        return score;
    }

    //submit climb function
    const submitClimb = () => {
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
                    <select 
                        value={climbType}
                        required
                        onChange={chooseClimbType}>
                            <option>CLIMB TYPE</option>
                            <option value="Auto Belay">Auto Belay</option>
                            <option value="Top Rope">Top Rope</option>
                            <option value="Lead">Lead</option>
                    </select>
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
                    <h3>Flash:</h3>
                    <Checkbox 
                        checked={flashChecked}
                        onChange={flashCheckbox}
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                    <h3>On Sight:</h3>
                    <Checkbox 
                        checked={onSightChecked}
                        onChange={onSightCheckbox}
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                    <h3>Bonus:</h3>
                    <Checkbox 
                        checked={bonusChecked}
                        onChange={bonusCheckbox}
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </div>
                <div>
                    <h2>SCORE: {score}</h2>
                </div>
                <Button variant="outlined" onClick={goBack}>BACK</Button>
                <Button variant="outlined" onClick={submitClimb}>SUBMIT CLIMB</Button>
            </form>
        </div>
    )
}

export default AddClimb;