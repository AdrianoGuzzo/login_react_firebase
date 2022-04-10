import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Redirect } from "react-router-dom";

const Login = () => {
    const errorMessageStyle = { color: "red" }
    const paperStyle = { padding: 20, maxWidth: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [uid, setUid] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState({
        email: {
            value: '',
            error: false
        },
        password: {
            value: '',
            error: false
        },
    });

    const updateField = (target) => setData(data => {
        var _data = { ...data }
        _data[target.name].value = target.value;
        _data[target.name].error = !target.value;
        return _data;
    })

    const login = () => {
        const auth = getAuth();
        //valida email e senha estão vazios
        if (!data.email.value || !data.password.value) {
            let _data = { ...data }
            _data.email.error = !_data.email.value
            _data.password.error = !_data.password.value
            setData(_data)
            return;
        }
        setButtonDisabled(true)
        //autentica usuario pelo email e senha
        signInWithEmailAndPassword(auth, data.email.value, data.password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                setUid(user.uid)
                setButtonDisabled(false)
            })
            .catch((error) => {
                setButtonDisabled(false)
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/invalid-email':
                        setErrorMessage('Este email não existe')
                        return;
                    case 'auth/wrong-password':
                        setErrorMessage('Senha incorreta')
                        return;
                }                
                setErrorMessage(error.message)
            });
    }


    if (uid)
        return (<Redirect to={`/principal/${uid}`} />)

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <TextField label='Email' placeholder='Email' name='email' fullWidth value={data.email.value} error={data.email.error} required
                    onChange={(input) => updateField(input.target)} />
                <TextField label='Senha' placeholder='Senha' name='password' type='password' fullWidth value={data.password.value} error={data.password.error} required
                    onChange={(input) => updateField(input.target)} />
                <FormControl fullWidth>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={login} disabled={buttonDisabled} fullWidth>Entrar</Button>
                    {errorMessage && <FormHelperText style={errorMessageStyle}>{errorMessage}</FormHelperText>}
                </FormControl>

                <Link to="/cadastro" >
                    Criar nova conta
                </Link>
            </Paper>
        </Grid>
    )
}

export default Login
