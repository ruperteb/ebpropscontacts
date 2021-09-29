import React from "react"

import {
    Icon,
} from "@blueprintjs/core";

import styled from 'styled-components'

const StyledContactContainer = styled.div`
display: grid;
grid-template-columns: calc(1rem + 20px + 15%) 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr;
grid-template-areas: "name position company phone email industry region type";
/* height: 100px; */
border-bottom: 1px solid #c3d0d8;
padding: 0.5rem;
/* box-shadow: rgb(0 0 0 / 24%) -1px 1px 3px 1px; */
transition: all 0.1s ease-in-out;
cursor: pointer;
:hover {
    background-color: #eef6f8;
}

`

const StyledContactDetailsDiv = styled.div`
grid-column-start: 1;
display: flex;
`

const StyledContactNameDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 1;

`

const StyledContactPositonDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 2;

`

const StyledContactCompanyDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 3;

`

const StyledContactPhoneDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 4;

`

const StyledContactEmailDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 5;

`

const StyledContactIndustryDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 6;

`

const StyledContactRegionDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 7;

`

const StyledContactTypeDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 8;

`

const StyledDetailsText = styled.p`
font-family:  "Segoe UI", sans-serif;
margin: auto;
margin-left: 1rem;
font-size: 1.1rem;
/* margin-bottom: 1rem; */
/* text-transform: uppercase; */
`

const StyledIcon = styled(Icon)`
display: flex;
margin: auto;
margin-right: 0;
margin-left: 0;
`




interface Props {

}

export const ContactsListHeader: React.FunctionComponent<Props> = ({ }) => {

    const iconSize = 20

    return (
        <StyledContactContainer>
            <StyledContactNameDiv>
                <StyledIcon icon="person" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Name
                </StyledDetailsText>
            </StyledContactNameDiv>
            <StyledContactPositonDiv>
                <StyledIcon icon="badge" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Position
                </StyledDetailsText>
            </StyledContactPositonDiv>
            <StyledContactCompanyDiv>
                <StyledIcon icon="briefcase" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Company
                </StyledDetailsText>
            </StyledContactCompanyDiv>
            <StyledContactPhoneDiv>
                <StyledIcon icon="mobile-phone" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Mobile
                </StyledDetailsText>
            </StyledContactPhoneDiv>
            <StyledContactEmailDiv>
                <StyledIcon icon="envelope" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Email
                </StyledDetailsText>
            </StyledContactEmailDiv>
            <StyledContactIndustryDiv>
                <StyledIcon icon="office" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Industry
                </StyledDetailsText>
            </StyledContactIndustryDiv>
            <StyledContactRegionDiv>
                <StyledIcon icon="globe" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Region
                </StyledDetailsText>
            </StyledContactRegionDiv>
            <StyledContactTypeDiv>
                <StyledIcon icon="tag" intent="primary" size={iconSize} />
                <StyledDetailsText>
                    Type
                </StyledDetailsText>
            </StyledContactTypeDiv>

        </StyledContactContainer>

    )

}

export default ContactsListHeader