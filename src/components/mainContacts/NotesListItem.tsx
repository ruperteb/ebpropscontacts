import React from "react"
import { DocumentData, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseSetup"
import { useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import {
    Button,
    Menu,
    MenuItem,
} from "@blueprintjs/core";

import styled from 'styled-components'

import { ContextMenu2, Popover2 } from "@blueprintjs/popover2";


interface StyledNotesRowProps {
    contextMenuActive: boolean
}

const StyledNotesRow = styled.div <StyledNotesRowProps>`
   display: grid;
   grid-template-columns: 1fr 9fr; 
   padding: 0.5rem;
   border-bottom: 1px solid #c3d0d8;
   transition: all 0.1s ease-in-out;
   cursor: pointer;
   background-color: ${props => props.contextMenuActive === true ? "#b3d2ec73 !important" : "aliceblue"};
   :hover {
       background-color: #b3d2ec73;
   }
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
width: 100%;
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


interface Props {
    contact: DocumentData
    note: DocumentData
    index: number
}

export const NotesListItem: React.FunctionComponent<Props> = ({ contact, note, index }) => {

    const dispatch = useAppDispatch()

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

    const handleUpdateNote = (note: DocumentData) => {
        dispatch(navigationSlice.actions.setSelectedContact(contact))
        dispatch(navigationSlice.actions.setSelectedNote(note))
        dispatch(navigationSlice.actions.setUpdateNotePanelDialogOpen(true))
        handleContextMenuActive()

    }

    const [showDeleteNotePopup, setShowDeleteNotePopup] = React.useState(false)

    const deleteNote = async () => {
        await deleteDoc(doc(db, "beauhaus/" + contact.id + "/notes/", note.id));
        setShowDeleteNotePopup(false)
        dispatch(navigationSlice.actions.setSelectedContactRefresh(contact.id))
    }

    return (
        <StyledPopoverContainer
            content={
                <StyledPopoverContentDiv>
                    <StyledPopoverHeading>Are you sure you want to delete this note?</StyledPopoverHeading>
                    <StyledPopoverButtonDiv>
                        <StyledPopoverButton /* large={true} */ intent="danger" onClick={deleteNote} text="Delete" />
                        <StyledPopoverButton /* large={true} */ intent="primary" onClick={() => setShowDeleteNotePopup(!showDeleteNotePopup)} text="Cancel" />
                    </StyledPopoverButtonDiv>
                </StyledPopoverContentDiv>
            }
            interactionKind="click"
            isOpen={showDeleteNotePopup}
            /* onInteraction={()=>handleInteraction2()} */
            placement="bottom"
        >
            <ContextMenu2
            style={{width: "100%"}}
                onContextMenu={() => handleContextMenuActive()}

                content={
                    <Menu style={{ minWidth: "0px" }} >
                        <StyledMenuItem icon="wrench" onClick={() => handleUpdateNote(note)} text="Update Note" />
                        <StyledMenuItem icon="delete" onClick={() => setShowDeleteNotePopup(!showDeleteNotePopup)} text="Delete Note" />
                    </Menu>


                }
            >
                <StyledNotesRow contextMenuActive={contextMenuActive} key={index}>
                    <div>
                        {note.date.toDate().toLocaleDateString('en-GB')}
                    </div>
                    <div>
                        {note.note}
                    </div>



                </StyledNotesRow>
            </ContextMenu2>
        </StyledPopoverContainer>

    )

}

export default NotesListItem