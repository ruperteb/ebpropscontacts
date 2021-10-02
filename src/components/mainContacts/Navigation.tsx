import React from "react"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import {
    Button,
    InputGroup,
} from "@blueprintjs/core";

import { Classes, Popover2 } from "@blueprintjs/popover2";

import Select from 'react-select'

import styled from 'styled-components'

/* import SelectRegion from "./select/SelectRegion";

import * as Regions from "./select/regions"; */


const StyledNavigationContainer = styled.div`
display: grid;
grid-template-columns: 1fr 4fr 1fr;
height: 100px;
/* box-shadow: rgb(0 0 0 / 24%) -1px 1px 3px 1px; */

`

const StyledCenterDiv = styled.div`

grid-column-start: 2;
display: flex;

`

const StyledLeftDiv = styled.div`

grid-column-start: 1;
display: flex;

`

const StyledRightDiv = styled.div`

grid-column-start: 3;
display: flex;

`

const StyledSearchInputGroup = styled(InputGroup)`
margin: auto;
margin-left: auto;
margin-right: 1rem;
height: fit-content;
width: 300px;
`

const StyledButton = styled(Button)`
    margin: auto;
    /* margin-top: 1rem; */
    display: flex;
`

const StyledPopoverContentDiv = styled.div`
background-color: white;
padding: 1rem;
display: flex;
    flex-direction: column;
`

const StyledPopoverContainerDiv = styled.div`
    margin: auto;
    /* margin-top: 1rem; */
   /*  display: flex;
    flex-direction: column; */
`

const StyledPopoverHeading = styled.h4`
    display:flex;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
`


interface Props {

}

export const Navigation: React.FunctionComponent<Props> = ({ }) => {

    const dispatch = useAppDispatch()

    const contactsData = useAppSelector((state) => state.navigation.contactsData)

    const search = useAppSelector((state) => state.navigation.contactsSearch)

    const handleSetSearch = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {

            dispatch(navigationSlice.actions.setContactsSearch(e.target.value))
        }, [search])

    const contactsSectorFilter = useAppSelector((state) => state.navigation.contactsSectorFilter)
    const contactsRegionFilter = useAppSelector((state) => state.navigation.contactsRegionFilter)
    const contactsTypeFilter = useAppSelector((state) => state.navigation.contactsTypeFilter)
    const contactsPriorityFilter = useAppSelector((state) => state.navigation.contactsPriorityFilter)

    var contactSectorData = contactsData.map((contact: any) => { return contact.sector })
    
    let combinedContactSectorData: any = []

    contactSectorData.map((contact) => {
        contact.map((sector:any) => {
            combinedContactSectorData = [...combinedContactSectorData, sector]
        })
    })
    
    var distinctSectors:string[] = Array.from(new Set(combinedContactSectorData.map((sector: string) => { return sector })))
   
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

    const priorityOptions = [
        { value: 'high', label: 'High' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'normal', label: 'Normal' },
       
    ]

    const customSelectStyles = {
        /*  option: (provided:any, state:any) => ({
           ...provided,
           borderBottom: '1px dotted pink',
           color: state.isSelected ? 'red' : 'blue',
           padding: 20,
         }), */
        control: (provided: any, state: any) => ({
            // none of react-select's styles are passed to <Control />
            ...provided,
            width: 400,
            height: "fit-content"
        }),
        container: (provided: any, state: any) => ({
            // none of react-select's styles are passed to <Control />
            ...provided,
            width: 400,
            marginTop: "1rem",
            height: "fit-content"
        }),
        /* singleValue: (provided:any, state:any) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        } */
    }

    const onSelectSector = React.useCallback(
        (value: any, actionType: any) => {
            var tempSectorFilter = contactsSectorFilter
            if (actionType.action === "select-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: string) => {
                    var index = contactsSectorFilter.findIndex(x => x === item);
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

            dispatch(navigationSlice.actions.setContactsSectorFilter(tempSectorFilter))
        }, [contactsSectorFilter])

    const onSelectRegion = React.useCallback(
        (value: any, actionType: any) => {
            var tempRegionFilter = contactsRegionFilter
            if (actionType.action === "select-option") {
                var valuesArray = value.map((item: any) => {
                    return item.value
                })
                valuesArray.map((item: string) => {
                    var index = contactsRegionFilter.findIndex(x => x === item);
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

            dispatch(navigationSlice.actions.setContactsRegionFilter(tempRegionFilter))
        }, [contactsRegionFilter])

        const onSelectType = React.useCallback(
            (value: any, actionType: any) => {
                var tempTypeFilter = contactsTypeFilter
                if (actionType.action === "select-option") {
                    var valuesArray = value.map((item: any) => {
                        return item.value
                    })
                    valuesArray.map((item: string) => {
                        var index = contactsTypeFilter.findIndex(x => x === item);
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
    
                dispatch(navigationSlice.actions.setContactsTypeFilter(tempTypeFilter))
            }, [contactsTypeFilter])

        const onSelectPriority = React.useCallback(
            (value: any, actionType: any) => {
                var tempPriorityFilter = contactsPriorityFilter
                if (actionType.action === "select-option") {
                    var valuesArray = value.map((item: any) => {
                        return item.value
                    })
                    valuesArray.map((item: string) => {
                        var index = contactsPriorityFilter.findIndex(x => x === item);
                        if (index === -1) {
                            tempPriorityFilter = [...tempPriorityFilter, item]
                        }
                    })
                }
                if (actionType.action === "remove-value") {
                    var valuesArray = value.map((item: any) => {
                        return item.value
                    })
                    tempPriorityFilter = valuesArray
                }
                if (actionType.action === "clear") {
                    tempPriorityFilter = []
                }
    
                dispatch(navigationSlice.actions.setContactsPriorityFilter(tempPriorityFilter))
            }, [contactsPriorityFilter])

    const [showFilterPopup, setShowFilterPopup] = React.useState(false)

    

    const handleAddContact = () => {
        dispatch(navigationSlice.actions.setContactsPanelDialogOpen(true))

    }

    const handleInteraction = (nextOpenState: boolean) => {
        setShowFilterPopup(nextOpenState);
    }

    return (
        <StyledNavigationContainer>
            <StyledLeftDiv>

            </StyledLeftDiv>

            <StyledCenterDiv>
                <StyledSearchInputGroup
                    large={true}
                    placeholder="Search"
                    /* rightElement={lockButton} */
                    leftIcon={"search"}
                    /* small={small} */
                    type={"search"}
                    value={search}
                    onChange={handleSetSearch}
                />

                <StyledPopoverContainerDiv style={{ marginRight: 0, marginLeft: 0 }}>
                    <Popover2
                        content={
                            <StyledPopoverContentDiv>
                                <StyledPopoverHeading>Contacts Filters</StyledPopoverHeading>
                                <Select
                                    /* ref={suburbRef} */
                                    key="sector"
                                    isMulti
                                    placeholder="Sector"
                                    styles={customSelectStyles}
                                    options={formattedSectors}
                                    onChange={onSelectSector}
                                    value={contactsSectorFilter.map((sector) => { return { value: sector, label: sector } })}

                                />
                                <Select
                                    /* ref={suburbRef} */
                                    key="region"
                                    isMulti
                                    placeholder="Region"
                                    styles={customSelectStyles}
                                    options={formattedRegions}
                                    onChange={onSelectRegion}
                                    value={contactsRegionFilter.map((region) => { return { value: region, label: region } })}
                                />
                                <Select
                                    /* ref={suburbRef} */
                                    key="type"
                                    isMulti
                                    placeholder="Type"
                                    styles={customSelectStyles}
                                    options={formattedTypes}
                                    onChange={onSelectType}
                                    value={contactsTypeFilter.map((type) => { return { value: type, label: type } })}
                                />
                                <Select
                                    /* ref={suburbRef} */
                                    key="priority"
                                    isMulti
                                    placeholder="Priority"
                                    styles={customSelectStyles}
                                    options={priorityOptions}
                                    onChange={onSelectPriority}
                                    value={contactsPriorityFilter.map((priority) => { return { value: priority, label: priority[0].toUpperCase() + priority.substring(1) } })}
                                />
                                
                            </StyledPopoverContentDiv>
                        }
                        interactionKind="click"
                        isOpen={showFilterPopup}
                        onInteraction={showFilterPopup => handleInteraction(showFilterPopup)}
                        placement="bottom"
                    >
                        <Button large={true} rightIcon="filter" intent="primary" text="Filter" />
                    </Popover2>
                </StyledPopoverContainerDiv>
                <StyledButton style={{ marginLeft: "1rem" }} large={true} rightIcon="add" intent="primary" text="Add Contact" onClick={handleAddContact}></StyledButton>




            </StyledCenterDiv>
            <StyledRightDiv>

            </StyledRightDiv>

        </StyledNavigationContainer>

    )

}

export default Navigation