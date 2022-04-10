import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DateFnsUtils from '@date-io/date-fns';
import ptBR from "date-fns/locale/pt-BR";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Redirect } from "react-router-dom";



const Register = ({ db }) => {
    const errorMessageStyle = { color: "red" }
    const paperStyle = { padding: 20, maxWidth: 450, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#45b6fe' }
    const btnstyle = { margin: '8px 0' }

    const [data, setData] = useState({
        birthDate: {
            value: new Date(),
            error: false
        },
        name: {
            value: '',
            error: false
        },
        lastname: {
            value: '',
            error: false
        },
        email: {
            value: '',
            error: false
        },
        password: {
            value: '',
            error: false
        },
        confirmPassword: {
            value: '',
            error: false
        },
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const updateField = (target) => setData(data => {
        debugger
        var _data = { ...data }
        _data[target.name].value = target.value;
        _data[target.name].error = !target.value;
        return _data;
    })

    const validation = () => {
        let isValid = true
        let _data = { ...data }
        for (let d in data) {
            var isFieldEmpty = !_data[d].value;
            _data[d].error = isFieldEmpty;
            if (isFieldEmpty)
                isValid = false

        }

        setData(_data);

        if (_data.password.value !== _data.confirmPassword.value) {
            setErrorMessage("A senha esta diferente da confirmação")
            isValid = false
        }

        return isValid;
    }

    const register = () => {
        if (validation()) {
            const auth = getAuth();
            setButtonDisabled(true)
            createUserWithEmailAndPassword(auth, data.email.value, data.password.value)
                .then(async (userCredential) => {
                    setButtonDisabled(false)
                    const user = userCredential.user;
                    const usuario = collection(db, "user");
                    await setDoc(doc(usuario, user.uid), {
                        email: data.email.value,
                        birthDate: data.birthDate.value,
                        name: data.name.value,
                        lastname: data.lastname.value,
                    });
                    setRegisterSuccess(true)

                })
                .catch((error) => {
                    setButtonDisabled(false)
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            setErrorMessage("Email já cadastrado")
                            return;
                    }
                    setErrorMessage(error.message)
                });
        }
    }

    if (registerSuccess)
        return (<Redirect to="/" />)

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><PersonAddIcon /></Avatar>
                    <h2>Cadastro</h2>
                </Grid>
                <TextField label='Nome' name="name" value={data.name.value} placeholder='name' fullWidth required error={data.name.error}
                    onChange={(input) => { updateField(input.target) }} />
                <TextField label='Sobrenome' name="lastname" value={data.lastname.value} placeholder='lastname' fullWidth required error={data.lastname.error}
                    onChange={(input) => { updateField(input.target) }} />
                <MuiPickersUtilsProvider locale={ptBR} name="birthDate" utils={DateFnsUtils}>
                    <DateTimePicker
                        locale={ptBR}
                        fullWidth
                        autoOk
                        ampm={false}
                        disableFuture
                        value={data.birthDate.value}
                        onChange={(date) => updateField({ value: date, name: 'birthDate' })}
                        label="Data de nascimento"
                        format="dd/MM/yyyy"
                        required
                        error={data.birthDate.error}
                    />
                </MuiPickersUtilsProvider>
                <TextField label='Email' name="email" value={data.email.value} placeholder='Email' fullWidth required error={data.email.error}
                    onChange={(input) => { updateField(input.target) }} />
                <TextField label='Senha' name="password" value={data.password.value} placeholder='password' type='password' fullWidth required error={data.password.error}
                    onChange={(input) => { updateField(input.target) }} />
                <TextField label='Confirmar password' name="confirmPassword" value={data.confirmPassword.value} placeholder='Confirmar senha' type='password'
                    fullWidth required error={data.confirmPassword.error} onChange={(input) => { updateField(input.target) }} />
                <FormControl fullWidth>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={register} disabled={buttonDisabled} fullWidth>Cadastrar</Button>
                    {errorMessage && <FormHelperText style={errorMessageStyle}>{errorMessage}</FormHelperText>}
                </FormControl>
            </Paper>
        </Grid>
    )
}

export default Register
