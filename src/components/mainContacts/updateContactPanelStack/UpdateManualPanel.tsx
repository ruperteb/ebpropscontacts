import React from "react"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseSetup"
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Button,
    Icon,
    IconName,
    InputGroup,
} from "@blueprintjs/core";


import styled from 'styled-components'

import Select, { components } from 'react-select'
import CreatableSelect from 'react-select/creatable';

import { ToastContainer, toast } from 'react-toastify';


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

const StyledInputGroup = styled(InputGroup)`
margin: 0.5rem;
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

const StyledToastDiv = styled.div`
display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`

const StyledToastSpan = styled.span`
    display: flex;
    margin: auto;
`

const StyledToastButton = styled(Button)`
    margin: auto;
    /* margin-top: 1rem; */
    display: flex;
    
`

const Placeholder = (props: any) => {
    var placeholder = ""
    if (props.selectProps.placeholder === "Sector") {
        placeholder = "Sector"
    }
    if (props.selectProps.placeholder === "Region") {
        placeholder = "Region"
    }
    if (props.selectProps.placeholder === "Type") {
        placeholder = "Type"
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
    let icon: IconName = "office"
    if (props.selectProps.placeholder === "Sector") {
        icon = "office"
    }
    if (props.selectProps.placeholder === "Region") {
        icon = "globe"
    }
    if (props.selectProps.placeholder === "Type") {
        icon = "tag"
    }
    return (
        //@ts-ignore
        <components.ValueContainer {...props}>
            <Icon style={{ display: "flex", marginRight: "12px", marginLeft: "4px", marginTop: "auto", marginBottom: "auto", color: "#5c7080" }} icon={icon} size={16} />
            <StyledValueContainerDiv style={{ display: "flex" }}>{children}</StyledValueContainerDiv>
        </components.ValueContainer>
    )
};




interface Props {

}

export const AddManualPanel: React.FunctionComponent<Props> = ({ }) => {

    const selectedContact = useAppSelector((state) => state.navigation.selectedContact)

    interface ContactDetails {
        name: string,
        position: string,
        company: string,
        address: string,
        mobile: string,
        office: string,
        email: string,
        sector: string[],
        region: string[],
        type: string[],
    }

    const [contactDetails, setContactDetails] = React.useState<ContactDetails>({
        name: selectedContact.displayName,
        position: selectedContact.position,
        company: selectedContact.company,
        mobile: selectedContact.mobile,
        office: selectedContact.office,
        address: selectedContact.address,
        email: selectedContact.email,
        sector: selectedContact.sector,
        region: selectedContact.region,
        type: selectedContact.type
    })

    const dispatch = useAppDispatch()

    const contactsData = useAppSelector((state) => state.navigation.contactsData)

    var contactSectorData = contactsData.map((contact: any) => { return contact.sector })
    
    let combinedContactSectorData: any = []

    contactSectorData.map((contact) => {
        contact.map((sector:any) => {
            combinedContactSectorData = [...combinedContactSectorData, sector]
        })
    })
    
    var distinctSectors:string[] = Array.from(new Set(combinedContactSectorData.map((sector: string) => { return sector })))

   /*  var distinctIndustries = Array.from(new Set(contactsData.map((contact: any) => { return contact.industry.map((industry: any) => { return industry }) }))) */
   
    var formattedSectors  = distinctSectors.map((sector) => {
        return { value: sector, label: sector }
    })

    var contactRegionData = contactsData.map((contact: any) => { return contact.region })

    let combinedContactRegionData: any = []

    contactRegionData.map((contact) => {
        contact.map((region:any) => {
            combinedContactRegionData = [...combinedContactRegionData, region]
        })
    })
    
    var distinctRegions:string[] = Array.from(new Set(combinedContactRegionData.map((region: string) => { return region })))
    /* var distinctRegions = Array.from(new Set(contactsData.map((contact: any) => contact.region))) */
    var formattedRegions = distinctRegions.map((region) => {
        return { value: region, label: region }
    })

    var contactTypeData = contactsData.map((contact: any) => { return contact.type })

    let combinedContactTypeData: any = []

    contactTypeData.map((contact) => {
        contact.map((type:any) => {
            combinedContactTypeData = [...combinedContactTypeData, type]
        })
    })
    
    var distinctTypes:string[] = Array.from(new Set(combinedContactTypeData.map((type: string) => { return type })))
    
    var formattedTypes = distinctTypes.map((type) => {
        return { value: type, label: type }
    })

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
            maxHeight: "125px"
        }),
        /* singleValue: (provided:any, state:any) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        } */
    }

    const onSelectSector =
        (value: any, actionType: any) => {
            var tempSectorFilter = contactDetails.sector
            if (actionType.action === "select-option") {

                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.sector.findIndex(x => x === item);
                    if (index === -1) {
                        tempSectorFilter = [...tempSectorFilter, item]
                    }
                })
            }
            if (actionType.action === "create-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.sector.findIndex(x => x === item);
                    if (index === -1) {
                        tempSectorFilter = [...tempSectorFilter, item]
                    }
                })
            }
            if (actionType.action === "remove-value") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                tempSectorFilter = valuesArray
            }
            if (actionType.action === "clear") {
                tempSectorFilter = []
            }

            setContactDetails({ ...contactDetails, sector: tempSectorFilter })
        }

    const onSelectRegion =
        (value: any, actionType: any) => {
            var tempRegionFilter = contactDetails.region
            if (actionType.action === "select-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.region.findIndex(x => x === item);
                    if (index === -1) {
                        tempRegionFilter = [...tempRegionFilter, item]
                    }
                })
            }
            if (actionType.action === "create-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.region.findIndex(x => x === item);
                    if (index === -1) {
                        tempRegionFilter = [...tempRegionFilter, item]
                    }
                })
            }
            if (actionType.action === "remove-value") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                tempRegionFilter = valuesArray
            }
            if (actionType.action === "clear") {
                tempRegionFilter = []
            }

            setContactDetails({ ...contactDetails, region: tempRegionFilter })
        }

        const onSelectType =
        (value: any, actionType: any) => {
            var tempTypeFilter = contactDetails.type
            if (actionType.action === "select-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.type.findIndex(x => x === item);
                    if (index === -1) {
                        tempTypeFilter = [...tempTypeFilter, item]
                    }
                })
            }
            if (actionType.action === "create-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.type.findIndex(x => x === item);
                    if (index === -1) {
                        tempTypeFilter = [...tempTypeFilter, item]
                    }
                })
            }
            if (actionType.action === "remove-value") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                tempTypeFilter = valuesArray
            }
            if (actionType.action === "clear") {
                tempTypeFilter = []
            }

            setContactDetails({ ...contactDetails, type: tempTypeFilter })
        }

    const handleToastClose = () => {
        dispatch(navigationSlice.actions.setContactsUpdatePanelDialogOpen(false))


    }

    const ToastMessage = () => {
        return (
            <StyledToastDiv>
                <StyledToastSpan>Success</StyledToastSpan>
                <StyledToastButton large={true} intent="success" onClick={() => handleToastClose()}>Close</StyledToastButton>
            </StyledToastDiv>

        );
    }

    const notify = () => toast.success(<ToastMessage ></ToastMessage>, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });

    const docRef = doc(db, "contacts", selectedContact.id);

    const submitContact = async () => {
        await setDoc(docRef, {
            displayName: contactDetails.name,
            displayName_lowerCase: contactDetails.name.toLowerCase(),
            position: contactDetails.position,
            company: contactDetails.company,
            company_lowerCase: contactDetails.company.toLowerCase(),
            mobile: contactDetails.mobile,
            office: contactDetails.office,
            address: contactDetails.address,
            email: contactDetails.email,
            sector: contactDetails.sector,
            region: contactDetails.region,
            type: contactDetails.type,
        }, { merge: true })
            .then(() => {

                notify()
            }
            ).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        dispatch(navigationSlice.actions.setContactsUpdatePanelDialogOpen(false))
    }

    return (
        <StyledPanelContainer>
            <StyledTitleDiv>
                <StyledIcon onClick={() => dispatch(navigationSlice.actions.setContactsUpdatePanelDialogOpen(false))} icon="cross" intent="primary" size={24} />
                <StyledTitleText>
                    Contact Details
                </StyledTitleText>
            </StyledTitleDiv>
            {/* <StyledText>
                Create a contact manually:
            </StyledText> */}
            <StyledInputGroup
                large={true}
                placeholder="Name"
                /* rightElement={lockButton} */
                leftIcon={"person"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.name}
                onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Position"
                /* rightElement={lockButton} */
                leftIcon={"badge"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.position}
                onChange={(e) => setContactDetails({ ...contactDetails, position: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Company"
                /* rightElement={lockButton} */
                leftIcon={"briefcase"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.company}
                onChange={(e) => setContactDetails({ ...contactDetails, company: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Address"
                /* rightElement={lockButton} */
                leftIcon={"map-marker"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.address}
                onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Mobile No"
                /* rightElement={lockButton} */
                leftIcon={"mobile-phone"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.mobile}
                onChange={(e) => setContactDetails({ ...contactDetails, mobile: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Office No"
                /* rightElement={lockButton} */
                leftIcon={"phone"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.office}
                onChange={(e) => setContactDetails({ ...contactDetails, office: e.target.value })}
            />
            <StyledInputGroup
                large={true}
                placeholder="Email Address"
                /* rightElement={lockButton} */
                leftIcon={"envelope"}
                /* small={small} */
                type={"text"}
                value={contactDetails?.email}
                onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
            />
            <CreatableSelect
                /* ref={suburbRef} */
                components={{ Placeholder, Input, ValueContainer }}

                isClearable
                key="sector"
                isMulti
                placeholder="Sector"
                styles={customSelectStyles}
                //@ts-ignore
                menuPortalTarget={document.querySelector(".bp3-portal")}
                options={formattedSectors}
                onChange={onSelectSector}
                value={contactDetails.sector.map((sector) => { return { value: sector, label: sector } })}
            />
            <CreatableSelect
                /* ref={suburbRef} */
                components={{ Placeholder, Input, ValueContainer }}

                isClearable
                key="region"
                isMulti
                placeholder="Region"
                styles={customSelectStyles}
                //@ts-ignore
                menuPortalTarget={document.querySelector(".bp3-portal")}
                options={formattedRegions}
                onChange={onSelectRegion}
                value={contactDetails.region.map((region) => { return { value: region, label: region } })}
            />
            <CreatableSelect
                /* ref={suburbRef} */
                components={{ Placeholder, Input, ValueContainer }}

                isClearable
                key="type"
                isMulti
                placeholder="Type"
                styles={customSelectStyles}
                //@ts-ignore
                menuPortalTarget={document.querySelector(".bp3-portal")}
                options={formattedTypes}
                onChange={onSelectType}
                value={contactDetails.type.map((type) => { return { value: type, label: type } })}
            />

            <StyledButton large={true} intent="success" onClick={() => submitContact()}>Submit</StyledButton>
        </StyledPanelContainer>
        /* <div style={{ display: "flex", margin: "auto" }}>
            Input
            <Button onClick={() => handleClick("initial", -1)}>Back</Button>
            
        </div> */

    )

}

export default AddManualPanel