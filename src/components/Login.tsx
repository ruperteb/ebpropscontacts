import React from "react"
import { getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


import {
    Button,
    InputGroup,
    Card,
    Elevation,
} from "@blueprintjs/core";

import styled from 'styled-components'



const StyledLoginContainer = styled.div`
display: grid;
grid-template-columns: 3fr 2fr 3fr;

`

const StyledCard = styled(Card)`
position: relative;
grid-column-start: 2;
margin-top: 3rem;
display: flex;
flex-direction: column;
flex-wrap: wrap;
`

const StyledH2 = styled.h2`
font-family: 'Bodoni Moda', serif;
margin: auto;
margin-bottom: 1rem;
text-transform: uppercase;
`

const StyledInputGroup = styled(InputGroup)`
margin: 1rem;
`

const StyledButton = styled(Button)`
    margin: auto;
    margin-top: 1rem;
    display: flex;
`

const StyledStatusText = styled.p`
height: 1rem;
margin: auto;
color: red;
`




interface Props {

}

export const Login: React.FunctionComponent<Props> = ({ }) => {

    const auth = getAuth();

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [status, setStatus] = React.useState("")

    /* const [credential, setCredential] = React.useState<string>() */

    /* console.log(credential)

    console.log(email, password) */

    




    const handleSignInWithEmailAndPassword = () => {
        setStatus("")
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                /* setStatus("Success") */
                // Signed in 
                const user = userCredential.user;


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code)
                if (errorCode === "auth/user-not-found") {
                    setStatus("Error: User not found")
                }
                if (errorCode === "auth/wrong-password") {
                    setStatus("Error: Incorrect password")
                }
            });
    }




    const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <StyledLoginContainer>
            <StyledCard /* interactive={true} */ elevation={Elevation.TWO}>
                <StyledH2>Login</StyledH2>
                <StyledInputGroup

                    large={true}
                    placeholder="Enter your email..."
                    /* rightElement={lockButton} */
                    leftIcon={"envelope"}
                    /* small={small} */
                    type={"text"}
                    value={email}
                    onChange={handleSetEmail}
                />
                <StyledInputGroup

                    large={true}
                    placeholder="Enter your password..."
                    /* rightElement={lockButton} */
                    leftIcon={"key"}
                    /* small={small} */
                    type={/* showPassword ? "text" :  */"password"}
                    value={password}
                    onChange={handleSetPassword}
                />

                <StyledStatusText>{status !== "" ? status : ""}</StyledStatusText>

                <StyledButton large={true} onClick={handleSignInWithEmailAndPassword} rightIcon="log-in" intent="primary" text="Submit"></StyledButton>


            </StyledCard>


        </StyledLoginContainer>

    )

}

export default Login