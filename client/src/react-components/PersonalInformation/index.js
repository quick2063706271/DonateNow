import React from "react";
import "./styles.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

class PersonalInformation extends React.Component {
    render() {
        return(
            <div>
                <Box component="form" 
                sx={{ display: 'flex', flexWrap: 'wrap', '& .MuiTextField-root': { m: 1 }, pl: '170px', pt: '100px'}}
                noValidate
                autoComplete="off"
                >
                    <div className="personalInformation">
                        <TextField
                        className="inputField"
                        label="Username"
                        defaultValue="John2022"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        
                        <TextField
                        className="inputField"
                        label="Password"
                        defaultValue="John2022"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Date Of Birth"
                        defaultValue="1990-01-01"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <TextField
                        className="inputField"
                        label="Gender"
                        defaultValue="Male"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Address 1"
                        defaultValue="1 King St W, Toronto, ON M5C 1T4"
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        sx={{width: '41.5ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Address 2"
                        defaultValue="4650 Eglinton Ave W, Etobicoke, ON M9R 4C8"
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        sx={{width: '41.5ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Phone number"
                        defaultValue="123-456-7890"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <TextField
                        className="inputField"
                        label="E-mail"
                        defaultValue="John2022@gmail.com"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Preference"
                        defaultValue="Books, Travel"
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        sx={{width: '41.5ch' }}
                        />
                        <br />
                        <TextField
                        id="outlined-read-only-input"
                        label="Biography"
                        defaultValue="I enjoy reading books and travelling and travelling and travelling and travelling."
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        sx={{width: '41.5ch' }}
                        />
                    </div>
                </Box>
            </div>
        )
    }
  }


export default PersonalInformation;