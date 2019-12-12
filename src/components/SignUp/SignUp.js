import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import signUpStyles from './SignUpStyles.js';
import swal from 'sweetalert';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        The Best Summer App
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default function SignUp() {
    const classes = signUpStyles();

    const [firstName, setFirstName] = React.useState("");
    const [errorFirstNameMsg, setErrorFirstNameMsg] = React.useState("");

    const [lastName, setLastName] = React.useState("");
    const [errorLastNameMsg, setErrorLastNameMsg] = React.useState("");

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
        var re = /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))(?=.{6,})/u;
        if(re.test(password)){
            setErrorPasswordMsg("");
            return true;
        }
        document.getElementById("password").focus();
        setErrorPasswordMsg("Password must contain at least one number, one lowercase letter, one uppercase letter, and a minimum length of 6 characters.");
        return true;
    }

    const validateInternationalNames = (name) =>{
        var re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        return re.test(name);
    }

    const validateFirstName = (name) =>{
        if(firstName===""){
            document.getElementById("firstName").focus();
            setErrorFirstNameMsg("Enter your first name!");
            return false;
        }
        if(!validateInternationalNames(name)){
            document.getElementById("firstName").focus();
            setErrorFirstNameMsg("You have entered an invalid name!");
            return false;
        }
        setErrorFirstNameMsg("");
        return true;
    }

    const validateLastName = (name) =>{
        if(lastName===""){
            document.getElementById("lastName").focus();
            setErrorLastNameMsg("Enter your last name!");
            return false;
        }
        if(!validateInternationalNames(name)){
            document.getElementById("lastName").focus();
            setErrorLastNameMsg("You have entered an invalid name!");
            return false;
        }
        setErrorLastNameMsg("");
        return true;
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if(!(validateFirstName(firstName) && validateLastName(lastName) &&
            validateEmail(email) && validatePassword(password))) return false;

        var listUser = (localStorage.getItem("users")===null)? [] : JSON.parse(localStorage.getItem("users"));
        var canSignUp = true;
        for(var i=0; i<listUser.length; i++){
            if(listUser[i].email === email){
                canSignUp = false; break;
            }
        }

        if(canSignUp){
            var user = { firstName: firstName, lastName: lastName, email: email, password: password}
            swal({
                title: "Good job!",
                text: "You have signed up successfully!!",
                icon: "success",
                timer: 2000,
                button: false,
            }).then(()=>{
                var listUser = (localStorage.getItem("users")===null)? [] : JSON.parse(localStorage.getItem("users"));
                listUser.push(user);
                localStorage.setItem("users", JSON.stringify(listUser));
                localStorage.setItem("loggedUser", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                window.location.href = "/home";
            });
        }else{
            document.getElementById("email").focus();
            swal({
                title: "Ooops!",
                text: "This email is already associated with an account!",
                icon: "error",
                button: false,
                timer: 2000
            });
        }     
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        
                        onChange = {(event)=>{setFirstName(event.target.value)}}
                        onBlur = {(event)=>{validateFirstName(event.target.value)}}
                        error={(errorFirstNameMsg==="")?false:true}
                        helperText={(errorFirstNameMsg==="")?"": errorFirstNameMsg}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange = {(event)=>{setLastName(event.target.value)}}
                        onBlur = {(event)=>{validateLastName(event.target.value)}}
                        error={(errorLastNameMsg==="")?false:true}
                        helperText={(errorLastNameMsg==="")?"": errorLastNameMsg}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
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
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
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
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
      </Container>
    );
  }