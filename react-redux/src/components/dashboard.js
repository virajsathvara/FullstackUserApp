import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API_BASE_URL } from '../utils';

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  function createData(first_name, email, role, city, state) {
    return { first_name, email, role, city, state };
  }

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        let rows = [];
        res.data.map((user, i) => rows.push(createData(user.first_name, user.email, user.role, user.city, user.state),));
        setRows(rows);
      });
  }, []);
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">ROLE</TableCell>
              <TableCell align="right">CITY</TableCell>
              <TableCell align="right">STATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.email}>
                <TableCell component="th" scope="row">
                  {row.first_name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
