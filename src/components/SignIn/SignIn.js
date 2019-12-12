import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import signInStyles from './SignInStyles.js';
import swal from 'sweetalert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © The Best Summer App '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
    const classes = signInStyles();
    const [email, setEmail] = React.useState("");
    const [errorEmailMsg, setErrorEmailMsg] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorPasswordMsg, setErrorPasswordMsg] = React.useState("");

    const validateEmail = (email) => {
        if(email===""){
            document.getElementById("email").focus();
            setErrorEmailMsg("Enter your email!");
            return (false);
        }
        else if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setErrorEmailMsg("");
            return (true);
        }
        document.getElementById("email").focus();
        setErrorEmailMsg("You have entered an invalid email!");
        return (false);
    }

    const validatePassword = (password) =>{
        if(password===""){
            document.getElementById("password").focus();
            setErrorPasswordMsg("Enter your password!");
            return false;
        }
        setErrorPasswordMsg("");
        return true;
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if(validateEmail(email) && validatePassword(password)){
            var listUser = (localStorage.getItem("users")===null)? [] : JSON.parse(localStorage.getItem("users"));
            var user = null
            for(var i=0; i<listUser.length; i++){
                if(listUser[i].email === email && listUser[i].password ===password){
                    user = listUser[i]; break;
                }
            }

            if(user!== null){
                swal({
                    title: "Welcome "+user.firstName+"!",
                    text: "\n",
                    icon: "success",
                    timer: 2000,
                    button: false,
                }).then(()=>{
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    localStorage.setItem("isLoggedIn",true);
                    window.location.href = "/home";
                });
            }else{
                document.getElementById("email").focus();
                swal({
                    title: "Ooops!",
                    text: "Email or Password is incorrect!",
                    icon: "error",
                    button: false,
                    timer: 2000
                })
            }
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmitForm}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            
                            onChange = {(event)=>{setEmail(event.target.value)}}
                            onBlur = {(event)=>{validateEmail(event.target.value)}}
                            error={(errorEmailMsg==="")?false:true}
                            helperText={(errorEmailMsg==="")?"": errorEmailMsg}
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
                            onChange = {(event)=>{setPassword(event.target.value)}}
                            onBlur = {(event)=>{validatePassword(event.target.value)}}
                            error={(errorPasswordMsg==="")?false:true}
                            helperText={(errorPasswordMsg==="")?"": errorPasswordMsg}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
  );
}