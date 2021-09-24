import React from "react"


import { useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import {
    Button,
    Icon,
    IconName,
    InputGroup,
    Card,
    Elevation,
} from "@blueprintjs/core";

import styled from 'styled-components'

import Select, { components } from 'react-select'

const StyledCard = styled(Card)`
position: relative;
grid-column-start: 2;
margin-top: 2rem;
display: flex;
flex-direction: column;
flex-wrap: wrap;
`


const StyledInputGroup = styled(InputGroup)`
margin: 0.5rem;
`

const StyledButton = styled(Button)`
    margin: auto;
    margin-top: 0.5rem;
    display: flex;
`

const StyledValueContainerDiv = styled.div`
display: flex;
& > * {
       position: none;
       font-size: 16px;
        /* lineHeight: "40px", */ 
        color: #aeb8c0;
        margin-left: 0px;

    }
`



interface Props {
    contact: gapi.client.people.SearchResult
}

export const GoogleContact: React.FunctionComponent<Props> = ({ contact }) => {

    const dispatch = useAppDispatch()

    var names: any = []

    contact?.person?.names?.map((name) => {
        names = [...names, { displayName: name.displayName, givenName: name.givenName, familyName: name.familyName, displayNameLastFirst: name.displayNameLastFirst }]
    })

    var organizations: any = []

    contact?.person?.organizations?.map((organization) => {
        organizations = [...organizations, { company: organization.name, position: organization.title }]
    })

    var emailAddresses: any = []

    /* contact?.person?.emailAddresses?.map((email) => {
        emailAddresses = [...emailAddresses, { type: email.type, email: email.value }]
    }) */

    contact?.person?.emailAddresses?.map((email) => {
        emailAddresses = [...emailAddresses, { value: email.value, label: email.value }]
    })

    /* console.log(emailAddresses) */

    var phoneNumbers: any = []

    contact?.person?.phoneNumbers?.map((phone) => {
        phoneNumbers = [...phoneNumbers, { value: phone.value, label: phone.value }]
    })

    interface ImportDetails {
        name: string
        email: string
        mobile: string
        office: string
        company: string
        position: string
    }

    const [importDetails, setImportDetails] = React.useState<ImportDetails>({
        name: names[0]?.displayName || "",
        email: emailAddresses[0]?.value || "",
        mobile: phoneNumbers[0]?.value || "",
        office: phoneNumbers[1]?.value || "",
        company: organizations[0]?.company || "",
        position: organizations[0]?.position || "",
    })

    const Placeholder = (props: any) => {
        var placeholder = ""
        if (props.selectProps.placeholder === "Email") {
            placeholder = "Email"
        }
        if (props.selectProps.placeholder === "Mobile") {
            placeholder = "Mobile No"
        }
        if (props.selectProps.placeholder === "Office") {
            placeholder = "Office No"
        }
        return (

            <components.Placeholder  {...props}>
                <p style={{ fontSize: "16px", lineHeight: "40px", color: "#aeb8c0", display: "inline-block", marginBottom: "1px" }}>
                    {placeholder}
                </p>
            </components.Placeholder>


        )
    };


    const Input = (props: any) => {
        return (
            <div style={{ display: "flex" }}>
                <components.Input {...props}>
                </components.Input>
            </div>

        )
    };

    //@ts-ignore
    const ValueContainer = ({ children, ...props }) => {
        let icon: IconName = "envelope"
        if (props.selectProps.placeholder === "Email") {
            icon = "envelope"
        }
        if (props.selectProps.placeholder === "Mobile") {
            icon = "mobile-phone"
        }
        if (props.selectProps.placeholder === "Office") {
            icon = "phone"
        }
        return (
            //@ts-ignore
            <components.ValueContainer {...props}>
                <Icon style={{ display: "flex", marginRight: "12px", marginLeft: "4px", marginTop: "auto", marginBottom: "auto", color: "#5c7080" }} icon={icon} size={16} />
                <StyledValueContainerDiv style={{ display: "flex" }}>{children}</StyledValueContainerDiv>
            </components.ValueContainer>
        )
    };

    const customSelectStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            /* borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20, */

        }),
        control: (provided: any, state: any) => ({
            // none of react-select's styles are passed to <Control />
            ...provided,
            width: "auto",
            height: "fit-content"
        }),
        container: (provided: any, state: any) => ({
            // none of react-select's styles are passed to <Control />
            ...provided,
            width: "auto",
            marginTop: "1rem",
            margin: "0.5rem",
            height: "fit-content"
        }),
        menu: (provided: any, state: any) => ({
            ...provided,
            zIndex: 100000,
            position: "absolute"
            /* borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20, */

        }),
        menuPortal: (provided: any, state: any) => ({
            ...provided,
            zIndex: 100000,

            /* borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20, */

        }),
        menuList: (provided: any, state: any) => ({
            ...provided,
            maxHeight: "175px"
        }),
        /* singleValue: (provided:any, state:any) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        } */
    }

    const onSelectEmail =
        (value: any, actionType: any) => {
            if (actionType.action === "select-option") {
                setImportDetails({ ...importDetails, email: value.value })
            }
            if (actionType.action === "clear") {
                setImportDetails({ ...importDetails, email: "" })
            }
        }

    const onSelectMobile =
        (value: any, actionType: any) => {
            if (actionType.action === "select-option") {
                setImportDetails({ ...importDetails, mobile: value.value })
            }
            if (actionType.action === "clear") {
                setImportDetails({ ...importDetails, mobile: "" })
            }
        }

    const onSelectOffice =
        (value: any, actionType: any) => {
            if (actionType.action === "select-option") {
                setImportDetails({ ...importDetails, office: value.value })
            }
            if (actionType.action === "clear") {
                setImportDetails({ ...importDetails, office: "" })
            }
        }  

    const handleClick = (page: string, direction: number) => {
        dispatch(navigationSlice.actions.setGoogleContactsImportDetails(importDetails))
        dispatch(navigationSlice.actions.setContactsPanelStackPage(page))
        dispatch(navigationSlice.actions.setContactsPanelStackDirection(direction))

    }

    return (

        <StyledCard /* interactive={true} */ elevation={Elevation.TWO}>

            <StyledInputGroup
                large={true}
                placeholder="Name"
                /* rightElement={lockButton} */
                leftIcon={"person"}
                /* small={small} */
                type={"text"}
                value={importDetails.name !== "" ? importDetails.name : undefined}
                onChange={(e) => setImportDetails({ ...importDetails, name: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Position"
                /* rightElement={lockButton} */
                leftIcon={"badge"}
                /* small={small} */
                type={"text"}
                value={importDetails.name !== "" ? importDetails.position : undefined}
                onChange={(e) => setImportDetails({ ...importDetails, position: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Company"
                /* rightElement={lockButton} */
                leftIcon={"briefcase"}
                /* small={small} */
                type={"text"}
                value={importDetails.name !== "" ? importDetails.company : undefined}
                onChange={(e) => setImportDetails({ ...importDetails, company: e.target.value })}
            />
            <Select
                components={{ Placeholder, Input, ValueContainer }}
                isClearable
                key="Email"
                placeholder="Email"
                styles={customSelectStyles}
                //@ts-ignore
                /* menuPortalTarget={document.querySelector(".bp3-dialog")} */
                options={emailAddresses}
                onChange={onSelectEmail}
                value={importDetails.email !== "" ? { value: importDetails.email, label: importDetails.email } : null}
            />
            <Select
                components={{ Placeholder, Input, ValueContainer }}
                isClearable
                key="Mobile"
                placeholder="Mobile"
                styles={customSelectStyles}
               //@ts-ignore
              /*  menuPortalTarget={document.querySelector(".bp3-dialog")} */
                options={phoneNumbers}
                onChange={onSelectMobile}
                value={importDetails.mobile !== "" ? { value: importDetails.mobile, label: importDetails.mobile } : null}
            />
            <Select
                components={{ Placeholder, Input, ValueContainer }}
                isClearable
                key="Office"
                placeholder="Office"
                styles={customSelectStyles}
                //@ts-ignore
                /* menuPortalTarget={document.querySelector(".bp3-dialog")} */
                options={phoneNumbers}
                onChange={onSelectOffice}
                value={importDetails.office !== "" ? { value: importDetails.office, label: importDetails.office } : null}
            />

            <StyledButton large={true} intent="success" onClick={() => handleClick("addgoogle", 1)}>Select</StyledButton>


        </StyledCard>




    )

}

export default GoogleContact