import React, { } from "react"
import { createRef } from "react"
import { collection, query, DocumentData, doc, getDocs, deleteDoc, orderBy, updateDoc } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import { db } from "../../firebaseSetup"

import {
    Button,
    Icon,
    Menu,
    MenuItem,

} from "@blueprintjs/core";

import { ContextMenu2, Popover2, Tooltip2 } from "@blueprintjs/popover2";

import { motion, AnimatePresence } from "framer-motion";


import styled from 'styled-components'

import FlipMove from 'react-flip-move';
import AnimatedListItem from "./AnimatedListItem"

import NotesListItem from "./NotesListItem";




const StyledOuterContainer = styled.div`
display: flex;
flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
`

interface StyledContactContainerProps {
    contextMenuActive: boolean
}

const StyledContactContainer = styled(motion.div) <StyledContactContainerProps>`
display: grid;
grid-template-columns: calc(1rem + 20px) 15% 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr;
grid-template-areas: "priority name position company phone email industry region type";
/* height: 100px; */
border-bottom: 1px solid #c3d0d8;
padding: 0.5rem;
/* box-shadow: rgb(0 0 0 / 24%) -1px 1px 3px 1px; */
transition: all 0.1s ease-in-out;
cursor: pointer;
background-color: ${props => props.contextMenuActive === true ? "#eef6f8 !important" : "white"}
}  
:hover {
    background-color: #eef6f8 !important;
}
`

const StyledContactDetailsDiv = styled.div`
grid-column-start: 1;
display: flex;
min-width: 0;
`

const StyledContactPriorityDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 1;

`

const StyledContactNameDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 2;

`

const StyledContactPositonDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 3;

`

const StyledContactCompanyDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 4;

`

const StyledContactPhoneDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 5;

`

const StyledContactEmailDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 6;

`

const StyledContactIndustryDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 7;

.bp3-popover2-target:focus {
    outline: 0px !important;
}

`

const StyledContactRegionDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 8;

.bp3-popover2-target:focus {
    outline: 0px !important;
}

`

const StyledContactTypeDiv = styled(StyledContactDetailsDiv)`
grid-column-start: 9;

`

const StyledDetailsText = styled.p`
font-family:  "Segoe UI", sans-serif;
margin: auto;
margin-left: calc(1rem + 20px);
font-size: 1rem;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    :focus {
        outline: 0px !important; 
    }
`

const StyledDetailsTextName = styled(StyledDetailsText)`
margin-left: 0px;
`

const StyledPriorityDiv = styled.div`
width: calc(1rem + 20px);
display: flex;
`

interface StyledPriorityCircleProps {
    priority: string
    isOpen: boolean
}

const StyledPriorityCircle = styled.div<StyledPriorityCircleProps>`
height: 18px;
width: 18px;
border: ${props => {
        switch (props.priority) {
            case "high":
                return "1px solid black"

            case "intermediate":
                return "1px solid black"

            case "normal":
                if (props.isOpen === true) {
                    return "1px solid black"
                } else return "0px solid black"


            default:
                return "0px solid black"
        }
    }};
border-radius: 100%;
transition: all 0.2s ease-in-out;
margin-top: auto;
margin-bottom: auto;
:hover {
    transform: scale(1.1);
    border: 1px solid black;
}
${StyledPriorityDiv}:hover & {
    border: 1px solid black;
    opacity: 1;
  }
background: ${props => {
        switch (props.priority) {
            case "high":
                return "radial-gradient(circle,rgb(255 0 39) 17%,rgb(207 26 26) 47%,rgb(45 2 19 / 62%) 93%)"

            case "intermediate":
                return "radial-gradient(circle,rgba(240,255,0,1) 10%,rgb(196 207 26 / 40%) 46%,rgb(45 2 19 / 41%) 93%);"

            case "normal":
                /* if (props.isOpen === true) { */
                return "white !important"
            /*  } else return "transparent !important" */


            default:
                return "white !important"
        }
    }};
    opacity: ${props => {
        if (props.priority === "normal") {
            if (props.isOpen === true) {
                return "1"
            } else return "0"
        } else return "1"

    }};
`

const StyledNotesOuterContainer = styled(motion.div)`
display: flex;
/* flex-direction: column; */
    flex-wrap: wrap;
    border-bottom: 1px solid #c3d0d8;
    
    background-color: aliceblue;

`
const StyledNotesInnerContainer = styled(motion.div)`
display: flex;
/* flex-direction: column; */
    flex-wrap: wrap;
    padding: 1rem;
    padding-top: 0.5rem;
    padding-left: 3rem;
    padding-right: 3rem;
    width: 100%;
    

`

const StyledNotesContainer = styled.div`
display: flex;
flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
`

const StyledNotesHeader = styled.div`
width: 100%;
border-bottom: 1px solid #c3d0d8;
display: flex;
padding-bottom: 0.5rem;
`

const StyledNotesHeading = styled.h2`
font-family:  "Segoe UI", sans-serif;
font-size: 1rem;
padding-left: 0.5rem;
height: fit-content;
margin-top: auto;
margin-bottom: auto;

`

const StyledAdditionalDetailsContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin: auto;
border: 1px solid #d9e3e8;
    padding: 0.5rem;
    background-color: #eef6f8;
`

const StyledAdditionalDetailsHeading = styled.div`
display: flex;
margin: auto;
font-family:  "Segoe UI", sans-serif;
font-size: 1rem;
font-weight: 500;
/* padding-bottom: 0.5rem; */
padding-right: 1rem;
`

const StyledAdditionalDetailsDiv = styled.div`
display: flex;
flex-direction: row;
`

const StyledIcon = styled(Icon)`
display: flex;
margin: auto;
margin-right: 0;
margin-left: 0;
`

const StyledAdditionalDetailsText = styled.div`
font-family:  "Segoe UI", sans-serif;
margin: auto;
padding-left: 1rem;
padding-right: 1rem;
`

const StyledMenuItem = styled(MenuItem)`
.bp3-fill {
    display: flex;
margin: auto;
justify-content: start;
margin-left: 0.5rem;

}

`

const StyledPopoverContainer = styled(Popover2)`
display: flex !important;
`

const StyledPopoverContentDiv = styled.div`
background-color: white;
padding: 1rem;
display: flex;
    flex-direction: column;
`

const StyledPopoverButtonDiv = styled.div`
    margin-top: 1rem;
    
    display: flex;
    flex-direction: row;
`

const StyledPopoverHeading = styled.h4`
font-family:  "Segoe UI", sans-serif;
font-size: 1rem;
    display:flex;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
`
const StyledPopoverButton = styled(Button)`
    margin: auto;
    display: flex;
    
`

const StyledTooltip2 = styled(Tooltip2)`
overflow: hidden;
`


interface Props {
    contact: DocumentData
    index: string
}

export const ContactsListItem: React.FunctionComponent<Props> = ({ contact, index }) => {


    const dispatch = useAppDispatch()

    const expandedContact = useAppSelector((state) => state.navigation.expandedContact)
    const contactsUpdatePanelDialogOpen = useAppSelector((state) => state.navigation.contactsUpdatePanelDialogOpen)
    const selectedContactRefresh = useAppSelector((state) => state.navigation.selectedContactRefresh)
    var isOpen = index === expandedContact;

    const [contactNotes, setContactNotes] = React.useState<DocumentData[]>([])

    const q = query(collection(db, "contacts/" + contact.id + "/notes"), orderBy("date", "desc")/* , orderBy("company", "desc") */);

    const getNotes = async () => {
        const querySnapshot = await getDocs(q);
        let notes: DocumentData[] = []
        querySnapshot.docs.map((doc) => {
            let note = { ...doc.data(), id: doc.id }
            notes = [...notes, note]
        })
        return notes
    }

    React.useEffect(() => {
        if (selectedContactRefresh === contact.id) {
            getNotes().then((notes) => {
                setContactNotes(notes)
                dispatch(navigationSlice.actions.setSelectedContactRefresh(""))
            })
        }
    }, [selectedContactRefresh])

    const deleteContact = async () => {
        const querySnapshot = await getDocs(collection(db, "contacts/" + contact.id + "/notes"));
        /* let notes: DocumentData[] = [] */
        querySnapshot.docs.map(async (doc) => {
            await deleteDoc(doc.ref)
        })
        await deleteDoc(doc(db, "contacts", contact.id));
        setShowDeletePopup(false)

    }

    const handleContactClick = () => {
        /* if (isOpen === false) { */
        getNotes().then((notes) => {

            setContactNotes(notes)
            dispatch(navigationSlice.actions.setExpandedContact(isOpen ? false : index))

        })
        /* setIsOpen(true) */

        /*  } else setIsOpen(false) */

    }

    const [contextMenuActive, setContextMenuActive] = React.useState(false)

    const handleContextMenuActive = () => {
        if (contextMenuActive === false) {
            setContextMenuActive(true)
        } else setContextMenuActive(false)

    }


    React.useEffect(() => {
        if (contextMenuActive === true) {
            window.addEventListener("click", () => setContextMenuActive(false));
        }
        window.removeEventListener("click", () => setContextMenuActive(false));
    }, [contextMenuActive])

    const handleUpdateContact = () => {
        dispatch(navigationSlice.actions.setSelectedContact(contact))
        dispatch(navigationSlice.actions.setContactsUpdatePanelDialogOpen(true))
        handleContextMenuActive()

    }

    const [showDeletePopup, setShowDeletePopup] = React.useState(false)

    const handleAddNote = () => {
        dispatch(navigationSlice.actions.setSelectedContact(contact))
        dispatch(navigationSlice.actions.setAddNotePanelDialogOpen(true))
        /* handleContextMenuActive() */

    }

    const docRef = doc(db, "contacts", contact.id);

    const handlePriorityClick = async () => {
        switch (contact.priority) {
            case "high":
                await updateDoc(docRef, {
                    priority: "normal"
                });
                break;
            case "intermediate":
                await updateDoc(docRef, {
                    priority: "high"
                });
                break;
            case "normal":
                await updateDoc(docRef, {
                    priority: "intermediate"
                });
                break;

            default:
                break;
        }

    }


    const flipMoveStyles = {
        display: "flex",
        flexFlow: "column wrap",
        width: "100%",
        /* marginTop: "2rem", */


        /*  width: "35%" */
    }


    return (
        <StyledPopoverContainer
            content={
                <StyledPopoverContentDiv>
                    <StyledPopoverHeading>Are you sure you want to delete this contact?</StyledPopoverHeading>
                    <StyledPopoverButtonDiv>
                        <StyledPopoverButton /* large={true} */ intent="danger" onClick={deleteContact} text="Delete" />
                        <StyledPopoverButton /* large={true} */ intent="primary" onClick={() => setShowDeletePopup(!showDeletePopup)} text="Cancel" />
                    </StyledPopoverButtonDiv>
                </StyledPopoverContentDiv>
            }
            interactionKind="click"
            isOpen={showDeletePopup}
            /* onInteraction={()=>handleInteraction2()} */
            placement="bottom"
        >
            <StyledOuterContainer>
                <ContextMenu2
                    onContextMenu={() => handleContextMenuActive()}

                    content={
                        <Menu style={{ minWidth: "0px" }} >
                            <StyledMenuItem icon="wrench" onClick={handleUpdateContact} text="Update Contact" />
                            <StyledMenuItem icon="delete" onClick={() => setShowDeletePopup(!showDeletePopup)} text="Delete Contact" />
                        </Menu>


                    }
                >
                    <StyledContactContainer
                        //@ts-ignore
                        contextMenuActive={contextMenuActive}
                        initial={false}
                        animate={{ backgroundColor: isOpen ? "#eef6f8" : "white" }}
                    /* onClick={handleContactClick} */
                    >
                        <StyledContactPriorityDiv>
                            <StyledPriorityDiv>
                                <StyledPriorityCircle isOpen={isOpen} priority={contact.priority} onClick={handlePriorityClick}>
                                </StyledPriorityCircle>
                            </StyledPriorityDiv>
                        </StyledContactPriorityDiv>
                        <StyledContactNameDiv onClick={handleContactClick}>
                            <StyledDetailsTextName >
                                {contact.displayName}
                            </StyledDetailsTextName>
                        </StyledContactNameDiv>
                        <StyledContactPositonDiv onClick={handleContactClick}>
                            <StyledDetailsText>
                                {contact.position}
                            </StyledDetailsText>
                        </StyledContactPositonDiv>
                        <StyledContactCompanyDiv onClick={handleContactClick}>
                            <StyledDetailsText>
                                {contact.company}
                            </StyledDetailsText>
                        </StyledContactCompanyDiv>
                        <StyledContactPhoneDiv onClick={handleContactClick}>
                            <StyledDetailsText>
                                {contact.mobile}
                            </StyledDetailsText>
                        </StyledContactPhoneDiv>
                        <StyledContactEmailDiv onClick={handleContactClick}>
                            <StyledDetailsText>
                                <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">{contact.email}</a>
                            </StyledDetailsText>
                        </StyledContactEmailDiv>
                        <StyledContactIndustryDiv onClick={handleContactClick}>
                            <StyledTooltip2
                                /* className={Classes.TOOLTIP2_INDICATOR} */
                                placement="right"
                                content={<span>{contact.industry.map((industry: string, index: number) => {
                                    if (index === 0) {
                                        return industry
                                    } else {
                                        return `, ${industry}`
                                    }
                                })}</span>}
                            /* minimal={true} */
                            >
                                <StyledDetailsText>
                                    {contact.industry.map((industry: string, index: number) => {
                                        if (index === 0) {
                                            return industry
                                        } else {
                                            return `, ${industry}`
                                        }
                                    })}
                                </StyledDetailsText>
                            </StyledTooltip2>
                        </StyledContactIndustryDiv>
                        <StyledContactRegionDiv onClick={handleContactClick}>
                            <StyledTooltip2
                                /* className={Classes.TOOLTIP2_INDICATOR} */
                                placement="right"
                                content={<span>{contact.region.map((region: string, index: number) => {
                                    if (index === 0) {
                                        return region
                                    } else {
                                        return `, ${region}`
                                    }
                                })}</span>}
                            /* minimal={true} */
                            >
                                <StyledDetailsText>
                                    {contact.region.map((region: string, index: number) => {
                                        if (index === 0) {
                                            return region
                                        } else {
                                            return `, ${region}`
                                        }
                                    })}
                                </StyledDetailsText>
                            </StyledTooltip2>
                        </StyledContactRegionDiv>
                        <StyledContactTypeDiv onClick={handleContactClick}>
                            <StyledTooltip2
                                /* className={Classes.TOOLTIP2_INDICATOR} */
                                placement="right"
                                content={<span>{contact.type.map((type: string, index: number) => {
                                    if (index === 0) {
                                        return type
                                    } else {
                                        return `, ${type}`
                                    }
                                })}</span>}
                            /* minimal={true} */
                            >
                                <StyledDetailsText>
                                    {contact.type.map((type: string, index: number) => {
                                        if (index === 0) {
                                            return type
                                        } else {
                                            return `, ${type}`
                                        }
                                    })}
                                </StyledDetailsText>
                            </StyledTooltip2>
                        </StyledContactTypeDiv>


                    </StyledContactContainer>
                </ContextMenu2 >
                {/* <Collapse keepChildrenMounted={true} isOpen={isOpen}> */}
                < AnimatePresence initial={false} >
                    {isOpen && (
                        <StyledNotesOuterContainer
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { /* opacity: 1,  */height: "auto" },
                                collapsed: { /* opacity: 0, */ height: 0 }
                            }}
                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                            <StyledNotesInnerContainer
                                variants={{ collapsed: { scale: 0.8, opacity: 0 }, open: { scale: 1, opacity: 1 } }}
                                transition={{ duration: 0.1 }}
                            >
                                <StyledNotesHeader>
                                    <StyledNotesHeading>
                                        <StyledPopoverButton /* large={true} */ icon="add" intent="primary" onClick={handleAddNote} text="Add Note" />
                                    </StyledNotesHeading>
                                    {contact.office !== "" || contact.address !== "" ? <><StyledAdditionalDetailsContainer>
                                        <StyledAdditionalDetailsHeading>Additonal Details:</StyledAdditionalDetailsHeading>
                                        <StyledAdditionalDetailsDiv>
                                            {contact.office !== "" ? <><StyledIcon icon="phone" intent="primary" size={16} />
                                                <StyledAdditionalDetailsText>
                                                    {contact.office}
                                                </StyledAdditionalDetailsText></> : <></>}

                                            {contact.office !== "" && contact.address !== "" ? <><StyledAdditionalDetailsText style={{ paddingLeft: "0px" }}>
                                                -
                                            </StyledAdditionalDetailsText></> : <></>}

                                            {contact.address !== "" ? <><StyledIcon icon="map-marker" intent="primary" size={16} />
                                                <StyledAdditionalDetailsText>
                                                    {contact.address}
                                                </StyledAdditionalDetailsText></> : <></>}
                                        </StyledAdditionalDetailsDiv>


                                    </StyledAdditionalDetailsContainer></> : <></>}
                                </StyledNotesHeader>

                                <StyledNotesContainer>
                                    <FlipMove enterAnimation={"elevator"} /* onFinish={forceCheck} */ style={flipMoveStyles}>
                                        {contactNotes.map((note) => {

                                            return (
                                                <AnimatedListItem key={note.id} ref={createRef()}>
                                                    <NotesListItem contact={contact} note={note} index={note.id}></NotesListItem>
                                                </AnimatedListItem>
                                            )

                                        })}
                                    </FlipMove>

                                </StyledNotesContainer>
                            </StyledNotesInnerContainer>

                        </StyledNotesOuterContainer>
                    )}
                </AnimatePresence >


                {/*   </Collapse> */}
            </StyledOuterContainer >
        </StyledPopoverContainer>

    )

}

export default ContactsListItem