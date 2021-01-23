import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles, API_BASE_URL } from '../utils';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';

export default function SignUp() {
  const classes = useStyles();
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateofbirth] = useState("2017-05-24");
  const [city, setCity] = useState("");
  const [statename, setStatename] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    console.log('date: ', firstname, lastname, email, password, dateofbirth, role, city, statename);
    const dob = dateofbirth.split("-");
    const DOBtime = new Date(dob[2], dob[1] - 1, dob[0]);
    axios.post(`${API_BASE_URL}/users/`, {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      role: role,
      state: statename,
      city: city,
      date_of_birth: DOBtime
    });
    e.preventDefault();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          //autoFocus
          /><TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          //autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            id="date"
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dateofbirth}
            onChange={date => setDateofbirth(date.target.value)}
          />
          <InputLabel id="demo-controlled-open-select-label" margin="normal">Role</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            margin="normal"
            label="Role"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={role}
            onChange={handleChange}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Manager"}>Manager</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="City"
            id="city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="state"
            label="State"
            id="state"
            value={statename}
            onChange={e => setStatename(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
