import React from "react"

import { useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Button,
    Icon,
} from "@blueprintjs/core";


import styled from 'styled-components'

import { PeoplePicker } from '@microsoft/mgt-react';



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
margin-bottom: 2rem;
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

const StyledText = styled.p`
display: flex;
margin-left: auto;
margin-right: auto;
font-family:  "Segoe UI", sans-serif;

`

const StyledButton = styled(Button)`
    margin: auto;
    /* margin-top: 1rem; */
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
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

const StyledPeoplePicker = styled(PeoplePicker)`
padding: 1rem;
    display: block;
    padding-left: 2rem;
    padding-right: 2rem;


`



interface Props {

}

export const InitialPanel: React.FunctionComponent<Props> = ({ }) => {


    const dispatch = useAppDispatch()

    const handleClick = (page: string, direction: number) => {
        dispatch(navigationSlice.actions.setContactsPanelStackPage(page))
        dispatch(navigationSlice.actions.setContactsPanelStackDirection(direction))

    }

    interface MSPhone {
        type: string
        number: string
    }

    interface MSEmail {
        address: string
        relevanceScore: number
        selectionLikelihood: string
    }

    interface MSContact {
        displayName: string
        companyName: string
        jobTitle: string
        phones: MSPhone[]
        scoredEmailAddresses: MSEmail[]
    }

    const handleSelection = (e: any) => {

        dispatch(navigationSlice.actions.setMicrosoftContactImportDetails({
            displayName: e.detail[0].displayName,
            companyName: e.detail[0].companyName,
            jobTitle: e.detail[0].jobTitle,
            phones: e.detail[0].phones,
            scoredEmailAddresses: e.detail[0].scoredEmailAddresses,
        }))

        handleClick("addmicrosoft", 1)
    }

    return (
        <StyledPanelContainer>
            <StyledTitleDiv>
                <StyledIcon onClick={() => dispatch(navigationSlice.actions.setContactsPanelDialogOpen(false))} icon="cross" intent="primary" size={24} />
                <StyledTitleText>
                    Create Contact
                </StyledTitleText>
            </StyledTitleDiv>
            <StyledText>
                Create a contact manually:
            </StyledText>
            <StyledButton large={true} intent="success" onClick={() => handleClick("addmanual", 1)}>Manual Contact</StyledButton>
            <StyledText style={{ marginTop: "1rem" }}>
                Or import a contact details from MS Exchange:
            </StyledText>
            <StyledPeoplePicker
                id="people-picker"
                selectionMode="single"
                selectionChanged={(e) => handleSelection(e)}
            ></StyledPeoplePicker>
        </StyledPanelContainer>

    )

}

export default InitialPanel