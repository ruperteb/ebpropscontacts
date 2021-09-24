import * as React from 'react';
import { createRef } from "react"


import { DocumentData } from "firebase/firestore";

import { useAppSelector } from '../../redux/hooks'

import ContactsListHeader from "./ContactsListHeader"
import ContactsListItem from "./ContactsListItem"

import PanelStack from "./addContactPanelStack/PanelStack"
import UpdatePanelStack from "./updateContactPanelStack/UpdatePanelStack"

import AddNotePanelStack from "./addNotePanelStack/AddNoteStack"
import UpdateNotePanelStack from "./updateNotePanelStack/UpdateNoteStack"

import FlipMove from 'react-flip-move';
import AnimatedListItem from "./AnimatedListItem"

import styled from 'styled-components'


interface Props {
  /* propertyData: Query | undefined
  search: string | undefined */
}

const StyledContactsListContainer = styled.div`
padding: 0;
position: relative;
margin-top: 0;
height: 100vh;
width: 90vw;
margin-left: auto;
margin-right: auto;
`

export const ContactsList: React.FunctionComponent<Props> = ({ /* propertyData, search */ }) => {

  const contactsData = useAppSelector((state) => state.navigation.contactsData)

  const contactsIndustryFilter = useAppSelector((state) => state.navigation.contactsIndustryFilter)
  const contactsRegionFilter = useAppSelector((state) => state.navigation.contactsRegionFilter)
  const contactsPriorityFilter = useAppSelector((state) => state.navigation.contactsPriorityFilter)
  const search = useAppSelector((state) => state.navigation.contactsSearch)

  var contactsList = contactsData
  /* var originalProperties = originalPropertyData!.properties! */

  const filterFunction = (contact: DocumentData) => {
    /*  if (filterData?.filterVariables!.suburb!.length !== 0) { if (!filterData?.filterVariables!.suburb?.includes(property.suburb!)) return false }
     if (filterData?.filterVariables!.region!.length !== 0) { if (!filterData?.filterVariables!.region?.includes(property.region!)) return false }
     if (filterData?.filterVariables!.province!.length !== 0) { if (!filterData?.filterVariables!.province?.includes(property.province!)) return false }
     if (filterData?.filterVariables!.buildingType!.length !== 0) { if (!filterData?.filterVariables!.buildingType?.includes(property.buildingType!)) return false }
     if (filterData?.filterVariables!.landlord!.length !== 0) { if (!filterData?.filterVariables!.landlord?.includes(property.contact?.landlordName?.landlordName!)) return false }
     if (filterData?.filterVariables!.vacantGLAMin! !== 0 || filterData?.filterVariables!.vacantGLAMax! !== 0) { if (filterData?.filterVariables!.vacantGLAMin! >= getVacantGLA(property)) return false }
     if (filterData?.filterVariables!.vacantGLAMax! !== 0) { if (filterData?.filterVariables!.vacantGLAMax! <= getVacantGLA(property)) return false }
     if (!checkDatesEqual(filterData?.filterVariables!.earliestOccMin, startDate)) { if (!checkDatesGreaterThanOrEqual(getEarliestOccDate(property), filterData?.filterVariables!.earliestOccMin)) return false }
     if (!checkDatesEqual(filterData?.filterVariables!.earliestOccMax, startDate)) { if (!checkDatesLessThanOrEqual(getEarliestOccDate(property), filterData?.filterVariables!.earliestOccMax)) return false }
     return true */
    if (contactsIndustryFilter.length !== 0) {
      var showIndustry = false
      contact.industry.map((contactIndustry: string) => {
        contactsIndustryFilter.map((filterIndustry) => {
          if (filterIndustry === contactIndustry) {
            if (showIndustry === false) {
              showIndustry = true
            }
          } /* else return false */
        })
      })
      if (showIndustry === false)
        return showIndustry
    }

    if (contactsRegionFilter.length !== 0) {
      var showRegion = false
      contact.region.map((contactRegion: string) => {
        contactsRegionFilter.map((filterRegion) => {
          if (filterRegion === contactRegion) {
            if (showRegion === false) {
              showRegion = true
            }
          } /* else return false */
        })
      })
      if (showRegion === false)
        return showRegion
    }

    if (contactsPriorityFilter.length !== 0) {
      var showPriority = false
      /* contact.priority.map((contactPriority: string) => { */
      contactsPriorityFilter.map((filterPriority) => {
        if (filterPriority === contact.priority) {
          if (showPriority === false) {
            showPriority = true
          }
        } /* else return false */
      })
      /* }) */
      if (showPriority === false)
        return showPriority
    }

    return true
  }

  const filteredContacts = contactsList?.filter(filterFunction);

  const searchSortedContacts = filteredContacts?.filter(contact => {
    return contact?.displayName.toLowerCase().includes(search!.toLowerCase()) || contact?.company.toLowerCase().includes(search!.toLowerCase())
  })

  /* const searchSortedProperties = filteredProperties?.filter(property => {
    if (property !== null && property !== undefined) {
      if (property?.address !== null && property?.address !== undefined) {
        if (property?.suburb !== null && property?.suburb !== undefined) {
          if (property?.region !== null && property?.region !== undefined) {
            if (property?.province !== null && property?.province !== undefined) {
              return property?.propertyName.toLowerCase().includes(search!.toLowerCase()) || property?.address.toLowerCase().includes(search!.toLowerCase()) || property?.suburb.toLowerCase().includes(search!.toLowerCase()) || property?.region.toLowerCase().includes(search!.toLowerCase()) || property?.province.toLowerCase().includes(search!.toLowerCase())
            }
          }
        }
      }
    }
  }) */

  const flipMoveStyles = {
    display: "flex",
    flexFlow: "column wrap",
    width: "100%",
    /* marginTop: "2rem", */


    /*  width: "35%" */
  }

  return (
    <StyledContactsListContainer>

      <ContactsListHeader></ContactsListHeader>


      <FlipMove enterAnimation={"elevator"} /* onFinish={forceCheck} */ style={flipMoveStyles}>
        {searchSortedContacts?.map((contact) => {
          return (



            <AnimatedListItem key={contact.id} ref={createRef()}>

              <ContactsListItem key={contact.id} index={contact.id} contact={contact}> </ContactsListItem>

            </AnimatedListItem>



          )
        })}

      </FlipMove>

      <PanelStack></PanelStack>
      <UpdatePanelStack></UpdatePanelStack>
      <AddNotePanelStack></AddNotePanelStack>
      <UpdateNotePanelStack></UpdateNotePanelStack>


    </StyledContactsListContainer >


    /* <div style={{ marginTop: 180, zIndex: 0 }}>
  </div> */

  );
};

export default ContactsList