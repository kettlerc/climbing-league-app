import {useSelector} from 'react-redux';
import { useState } from 'react';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'
import Checkbox from '@material-ui/core/Checkbox';

function AddClimb() {
    const user = useSelector((store) => store.user);
    const teams = useSelector((store) => store.team);

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

    return (
        <div className="container">
            <div>
                <img src={user.photo} alt="" />
                <h2>{user.firstName} {user.lastName}</h2>
                <h3>{user.flashLevel}</h3>
                <h3>{user.teamId}</h3>
            </div>
            <form>
                <div>
                    <select 
                        value={climbType}
                        required
                        onChange={(event) => setClimbType(event.target.value)}>
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
                <button onClick={submitClimb}>SUBMIT CLIMB</button>
            </form>
        </div>
    )
}

export default AddClimb;