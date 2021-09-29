import React from "react"
import { getAuth, signOut, updateProfile } from "firebase/auth";

import {
    Button,
} from "@blueprintjs/core";

import styled from 'styled-components'

import { Login } from '@microsoft/mgt-react';


const StyledNavigationContainer = styled.div`
display: grid;
grid-template-columns: 1fr 4fr 1fr;
height: 100px;
box-shadow: rgb(0 0 0 / 24%) -1px 1px 3px 1px;

`

const StyledTitleDiv = styled.div`

grid-column-start: 2;
display: flex;

`

const StyledLeftDiv = styled.div`

grid-column-start: 1;
display: flex;
flex-direction: column;
padding: 1rem;

`
const StyledLoginText = styled.p`
font-family:  "Segoe UI", sans-serif;
font-size: 0.8rem;
margin: auto;
`

const StyledUserText = styled.p`
font-family:  "Segoe UI", sans-serif;
font-size: 1rem;
margin: auto;
`

const StyledRightDiv = styled.div`

grid-column-start: 3;
display: flex;

`

const StyledTitleText = styled.h1`
font-family:  "Segoe UI", sans-serif;
margin: auto;
/* margin-bottom: 1rem; */
/* text-transform: uppercase; */
`


const StyledButton = styled(Button)`
    margin: auto;
    /* margin-top: 1rem; */
    display: flex;
`

const StyledLogin = styled(Login)`
    display: flex;
    margin: auto;
`

interface Props {

}

export const Header: React.FunctionComponent<Props> = ({ }) => {

    const auth = getAuth();
    

    /* console.log("current user",auth.currentUser?.email)
    if (auth.currentUser) {
        if(auth.currentUser?.email === "mark@ellisbrown.co.za")
        updateProfile(auth.currentUser, { displayName: "Mark Ellis Brown" })
    } */

    return (
        <StyledNavigationContainer>
            <StyledLeftDiv>
                <StyledLoginText>Microsoft Account:</StyledLoginText>
                {/* <StyledUserText>{auth.currentUser?.displayName}</StyledUserText> */}
                <StyledLogin></StyledLogin>
            </StyledLeftDiv>

            <StyledTitleDiv>
                <StyledTitleText>Contact Database</StyledTitleText>
            </StyledTitleDiv>
            <StyledRightDiv>
                <StyledButton large={true} rightIcon="log-out" intent="primary" text="Logout" onClick={() => signOut(auth)}></StyledButton>
            </StyledRightDiv>

        </StyledNavigationContainer>

    )

}

export default Header