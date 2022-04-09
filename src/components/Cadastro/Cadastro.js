import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DateFnsUtils from '@date-io/date-fns';
import ptBR from "date-fns/locale/pt-BR"; 
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const Cadastro = () => {
    const paperStyle = { padding: 20, width: 450, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Cadastro</h2>
                </Grid>
                <TextField label='Nome' placeholder='Nome' fullWidth required />
                <TextField label='Sobrenome' placeholder='Sobrenome' fullWidth required />
                <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                    <DateTimePicker
                        locale={ptBR}
                        fullWidth
                        autoOk
                        ampm={false}
                        disableFuture
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="Data de nascimento"
                        format="dd/MM/yyyy"
                        required
                    />
                </MuiPickersUtilsProvider>
                <TextField label='Email' placeholder='Email' fullWidth required />
                <TextField label='Senha' placeholder='Senha' type='password' fullWidth required />

                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Cadastrar</Button>      
            </Paper>
        </Grid>
    )
}

export default Cadastro
