import React from "react"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { navigationSlice } from '../redux/slices/navigationSlice';

import {
    Button,
    H5,
    Icon,
    IconSize,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Spinner,
    Switch,
    Tag,
    Card,
    Elevation,
} from "@blueprintjs/core";

import styled from 'styled-components'




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

const StyledInputGroup = styled(InputGroup)`
margin: 1rem;
`

const StyledButton = styled(Button)`
    margin: auto;
    /* margin-top: 1rem; */
    display: flex;
`

const StyledStatusText = styled.p`
height: 1rem;
margin: auto;
color: red;
`




interface Props {

}

export const Header: React.FunctionComponent<Props> = ({ }) => {

    const auth = getAuth();
    
    console.log(auth.currentUser?.displayName)

    const dispatch = useAppDispatch()

    return (
        <StyledNavigationContainer>
            <StyledLeftDiv>
                <StyledLoginText>Logged In:</StyledLoginText>
                <StyledUserText>{auth.currentUser?.displayName}</StyledUserText>
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