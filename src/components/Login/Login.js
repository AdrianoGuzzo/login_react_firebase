import React from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <TextField label='Email' placeholder='Email' fullWidth required />
                <TextField label='Senha' placeholder='Senha' type='password' fullWidth required />
                {/* <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                /> */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Entrar</Button>
                <Link to="/cadastro" >
                    Criar nova conta
                </Link>
            </Paper>
        </Grid>
    )
}

export default Login
