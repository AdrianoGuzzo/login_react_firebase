import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography, Avatar } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import CircularProgress from '@material-ui/core/CircularProgress';

const Principal = ({ db }) => {
    const paperStyle = { padding: 20, maxWidth: 450, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#FF7F00' }
    let { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = doc(db, "user", id);
        getDoc(user).then(result => {
            debugger
            setUser(result.data())
        });

    }, id)
    return (
        <Grid>

            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><PersonIcon /></Avatar>
                    <h2>Perfil</h2>
                </Grid>
                {
                    user ? (<>
                        <Typography variant="h5" gutterBottom>
                            Nome: <b>{user.name} {user.lastname}</b>
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Email: <b>{user.email}</b>
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Data de nascimento: <b>{user.birthDate.toDate().toLocaleDateString()}</b>
                        </Typography>
                    </>
                    ) : <div style={{
                        width: 'fit-content',
                        margin: 'auto'
                    }}>
                        <CircularProgress style={{
                            width: 120,
                            height: 119
                        }} />
                    </div>}
            </Paper>

        </Grid >
    )
}

export default Principal
