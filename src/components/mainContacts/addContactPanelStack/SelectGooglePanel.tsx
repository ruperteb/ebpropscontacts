import React from "react"

import { useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Icon,
} from "@blueprintjs/core";

import styled from 'styled-components'

import GoogleContactsList from "../../googleContacts/GoogleContactsList"


const StyledPanelContainer = styled.div`
display: flex;
flex-direction: column;
/* margin: 1rem; */
padding: 1rem;
width: 100%;
/* border: 1px solid; */

`

const StyledTitleDiv = styled.div`
display: flex;
margin-bottom: 1rem;
/* margin-top: 0.5rem; */
width: 100%;
background-color: #eef6f8;
position: relative;
`

const StyledTitleText = styled.h2`
display: flex;
margin-left: auto;
margin-right: auto;
padding-bottom: 0.5rem;
padding-top: 0.5rem;
margin-bottom: 0;
margin-top: 0;
font-family:  "Segoe UI", sans-serif;
`

const StyledIcon = styled(Icon)`
display: flex;
margin: auto;
margin-right: 1rem;
margin-left: 1rem;;
cursor: pointer;
position: absolute;
align-items: center;
    height: 100%;
    margin-left: 0.5rem;
`


interface Props {

}

export const SelectGooglePanel: React.FunctionComponent<Props> = ({ }) => {


    const dispatch = useAppDispatch()

    const handleClick = (page: string, direction: number) => {
        dispatch(navigationSlice.actions.setContactsPanelStackPage(page))
        dispatch(navigationSlice.actions.setContactsPanelStackDirection(direction))

    }

    return (
        <StyledPanelContainer>
            <StyledTitleDiv>
                <StyledIcon onClick={() => handleClick("initial", -1)} icon="arrow-left" intent="primary" size={24} />
                <StyledTitleText>
                    Google Contact
                </StyledTitleText>
            </StyledTitleDiv>
           
            <GoogleContactsList></GoogleContactsList>

        </StyledPanelContainer>

    )

}

export default SelectGooglePanel