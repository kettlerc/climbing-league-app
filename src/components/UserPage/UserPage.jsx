import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Typography } from '@material-ui/core';

import './userPage.css';


function UserPage() {
  return (
    <div className="container">
      <div>
        <Typography variant="h5" style={{marginTop: 20}}>LEADERBOARD</Typography>
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
        <Typography variant="h5" style={{marginTop: 20}}>RECENT SCORES</Typography>
      </div>
      <TableContainer component={Paper}>
                <Table aria-label="recent scores">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>YOUR SCORE</TableCell>
                            <TableCell>TEAM SCORE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                            <TableRow>
                                <TableCell align="right">WK1</TableCell>
                                <TableCell align="right">45</TableCell>
                                <TableCell align="right">47</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">WK2</TableCell>
                                <TableCell align="right">48</TableCell>
                                <TableCell align="right">43</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">WK3</TableCell>
                                <TableCell align="right">50</TableCell>
                                <TableCell align="right">52</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
      <LogOutButton />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
