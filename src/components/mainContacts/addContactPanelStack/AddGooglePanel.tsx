import React from "react"
import { collection, addDoc,  } from "firebase/firestore";
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
    if (props.selectProps.placeholder === "Industry") {
        placeholder = "Industry"
    }
    if (props.selectProps.placeholder === "Region") {
        placeholder = "Region"
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
    if (props.selectProps.placeholder === "Industry") {
        icon = "office"
    }
    if (props.selectProps.placeholder === "Region") {
        icon = "globe"
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

export const AddGooglePanel: React.FunctionComponent<Props> = ({ }) => {

    const googleContactsImportDetails = useAppSelector((state) => state.navigation.googleContactsImportDetails)

    interface ContactDetails {
        name?: string,
        position?: string,
        company?: string,
        address?: string,
        mobile?: string,
        office?: string,
        email?: string,
        industry: string[],
        region: string[]
    }

    const [contactDetails, setContactDetails] = React.useState<ContactDetails>({
        name: googleContactsImportDetails.name,
        position: googleContactsImportDetails.position,
        company: googleContactsImportDetails.company,
        address: "",
        mobile: googleContactsImportDetails.mobile,
        office: googleContactsImportDetails.office,
        email: googleContactsImportDetails.email,
        industry: [],
        region: []
    })

    const dispatch = useAppDispatch()


    const contactsData = useAppSelector((state) => state.navigation.contactsData)

    var contactIndustryData = contactsData.map((contact: any) => { return contact.industry })
    
    let combinedContactIndustryData: any = []

    contactIndustryData.map((contact) => {
        contact.map((industry:any) => {
            combinedContactIndustryData = [...combinedContactIndustryData, industry]
        })
    })
    
    var distinctIndustries:string[] = Array.from(new Set(combinedContactIndustryData.map((industry: string) => { return industry })))
   
    var formattedIndustries  = distinctIndustries.map((industry) => {
        return { value: industry, label: industry }
    })

    var contactRegionData = contactsData.map((contact: any) => { return contact.region })

    let combinedContactRegionData: any = []

    contactRegionData.map((contact) => {
        contact.map((region:any) => {
            combinedContactRegionData = [...combinedContactRegionData, region]
        })
    })
    
    var distinctRegions:string[] = Array.from(new Set(combinedContactRegionData.map((region: string) => { return region })))
    
    var formattedRegions = distinctRegions.map((region) => {
        return { value: region, label: region }
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
            maxHeight: "175px"
        }),
        /* singleValue: (provided:any, state:any) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        } */
    }

    const onSelectIndustry =
        (value: any, actionType: any) => {
            var tempIndustryFilter = contactDetails.industry
            if (actionType.action === "select-option") {

                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.industry.findIndex(x => x === item);
                    if (index === -1) {
                        tempIndustryFilter = [...tempIndustryFilter, item]
                    }
                })
            }
            if (actionType.action === "create-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: any) => {
                    var index = contactDetails.industry.findIndex(x => x === item);
                    if (index === -1) {
                        tempIndustryFilter = [...tempIndustryFilter, item]
                    }
                })
            }
            if (actionType.action === "remove-value") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                tempIndustryFilter = valuesArray
            }
            if (actionType.action === "clear") {
                tempIndustryFilter = []
            }

            setContactDetails({ ...contactDetails, industry: tempIndustryFilter })
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


    const submitContact = async () => {
        await addDoc(collection(db, "beauhaus"), {
            displayName: contactDetails.name ? contactDetails.name : "",
            displayName_lowerCase: contactDetails.name ? contactDetails.name.toLowerCase() : "",
            position: contactDetails.position,
            company: contactDetails.company,
            company_lowerCase: contactDetails.company?.toLowerCase(),
            address: contactDetails.address,
            mobile: contactDetails.mobile,
            office: contactDetails.office,
            email: contactDetails.email,
            industry: contactDetails.industry,
            region: contactDetails.region,
            priority: "normal",
        })
            .then((result) => {
                if (result.id) {
                    /*  setSuccess(true) */
                    notify()
                }

            })
        dispatch(navigationSlice.actions.setContactsPanelDialogOpen(false))
    }

    const handleClick = (page: string, direction: number) => {
        dispatch(navigationSlice.actions.setContactsPanelStackPage(page))
        dispatch(navigationSlice.actions.setContactsPanelStackDirection(direction))

    }

    

    return (
        <StyledPanelContainer>
            <StyledTitleDiv>
            <StyledIcon onClick={() => handleClick("selectgoogle", -1)} icon="arrow-left" intent="primary" size={24} />
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
                key="industry"
                isMulti
                placeholder="Industry"
                styles={customSelectStyles}
                //@ts-ignore
                menuPortalTarget={document.querySelector(".bp3-dialog")}
                options={formattedIndustries}
                onChange={onSelectIndustry}
                value={contactDetails.industry.map((industry) => { return { value: industry, label: industry } })}
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
                menuPortalTarget={document.querySelector(".bp3-dialog")}
                options={formattedRegions}
                onChange={onSelectRegion}
                value={contactDetails.region.map((region) => { return { value: region, label: region } })}
            />

            <StyledButton large={true} intent="success" onClick={() => submitContact()}>Submit</StyledButton>
        </StyledPanelContainer>
        /* <div style={{ display: "flex", margin: "auto" }}>
            Input
            <Button onClick={() => handleClick("initial", -1)}>Back</Button>
            
        </div> */

    )

}

export default AddGooglePanel