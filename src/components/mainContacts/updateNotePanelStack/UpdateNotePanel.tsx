import React from "react"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseSetup"
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Button,
    Icon,
    TextArea,
} from "@blueprintjs/core";

import styled from 'styled-components'

import { ToastContainer, toast } from 'react-toastify';


const StyledPanelContainer = styled.div`
display: flex;
flex-direction: column;
/* margin: 1rem; */
padding: 1rem;
padding-bottom: 0px;
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


const StyledTextArea = styled(TextArea)`
margin: 0.5rem;
height: 100% !important;
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

interface Props {

}

export const UpdateNotePanel: React.FunctionComponent<Props> = ({ }) => {

    const selectedContact = useAppSelector((state) => state.navigation.selectedContact)
    const selectedNote = useAppSelector((state) => state.navigation.selectedNote)

    interface NoteDetails {
        note: string
    }

    const [noteDetails, setNoteDetails] = React.useState<NoteDetails>({
        note: selectedNote.note
    })

    const dispatch = useAppDispatch()

        const handleToastClose = () => {
            dispatch(navigationSlice.actions.setUpdateNotePanelDialogOpen(false))
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

    const docRef = doc(db, "contacts/" + selectedContact.id + "/notes/" + selectedNote.id,);

    const submitNote = async () => {
        await updateDoc(docRef, {
            note: noteDetails.note,
            /* date: serverTimestamp() */
            
        })
            .then(() => {
                
                    notify()
                }
            ).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            dispatch(navigationSlice.actions.setSelectedContactRefresh(selectedContact.id))
            dispatch(navigationSlice.actions.setUpdateNotePanelDialogOpen(false))
    }

    /* const [success, setSuccess] = React.useState(false) */

    return (
        <StyledPanelContainer>
        <StyledTitleDiv>
            <StyledIcon onClick={() => dispatch(navigationSlice.actions.setUpdateNotePanelDialogOpen(false))} icon="cross" intent="primary" size={24} />
            <StyledTitleText>
                Update Note
            </StyledTitleText>
        </StyledTitleDiv>
        <StyledTextArea
            large={true}
            value={noteDetails?.note}
            onChange={(e) => setNoteDetails({ ...noteDetails, note: e.target.value })}
        />

        <StyledButton large={true} intent="success" onClick={() => submitNote()}>Submit</StyledButton>
    </StyledPanelContainer>
    )

}

export default UpdateNotePanel