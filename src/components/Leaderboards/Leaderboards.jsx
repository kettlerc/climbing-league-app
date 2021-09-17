import { useHistory } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';


function Leaderboards() {
    const history = useHistory();

    //function to return to home page
    const goBack = () => {
        history.push('/user');
    }//end goBack

    return (
        <>
        <div>
            <center>
                <Typography variant="h4" style={{marginTop: 20, marginLeft: 20}}>LEADERBOARDS</Typography>
            </center>
        </div>
        <div>
            <Typography variant="h5" style={{marginTop: 20, marginLeft: 20}}>TEAMS</Typography>
        </div>
        <TableContainer component={Paper}>
            <Table aria-label="recent scores">
                <TableHead>
                    <TableRow>
                        <TableCell>PLACE</TableCell>
                        <TableCell>TEAM</TableCell>
                        <TableCell>SCORE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    <TableRow>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">HARD ROCK</TableCell>
                        <TableCell align="right">164</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">2</TableCell>
                        <TableCell align="right">ROCK CRUSHERS</TableCell>
                        <TableCell align="right">158</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">3</TableCell>
                        <TableCell align="right">WE CLIMB GOOD</TableCell>
                        <TableCell align="right">152</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <div>
            <Typography variant="h5" style={{marginTop: 20, marginLeft: 20}}>INDIVIDUALS</Typography>
        </div>
        <TableContainer component={Paper}>
            <Table aria-label="recent scores">
                <TableHead>
                    <TableRow>
                        <TableCell>PLACE</TableCell>
                        <TableCell>NAME</TableCell>
                        <TableCell>SCORE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    <TableRow>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">CURTIS KETTLER</TableCell>
                        <TableCell align="right">164</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">2</TableCell>
                        <TableCell align="right">ALEX HONOLD</TableCell>
                        <TableCell align="right">158</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">3</TableCell>
                        <TableCell align="right">SYLVESTER STALLONE</TableCell>
                        <TableCell align="right">152</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <center>
            <Button variant="outlined" onClick={goBack} size="large" style={{marginTop: 30}}>BACK</Button>
        </center>
        </>
    )
}

export default Leaderboards;