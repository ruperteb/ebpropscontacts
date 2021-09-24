import React from "react"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { collection, query, where, onSnapshot, getFirestore, DocumentData, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseSetup"
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Button,
    H5,
    Icon,
    IconSize,
    IconName,
    InputGroup,
    TextArea,
    Intent,
    Menu,
    MenuItem,
    Spinner,
    Switch,
    Tag,
    Card,
    Elevation,
    Panel,
    PanelProps,
    PanelStack2
} from "@blueprintjs/core";

import { motion, AnimatePresence } from "framer-motion";

import styled from 'styled-components'

import Select, { components } from 'react-select'
import CreatableSelect from 'react-select/creatable';

import { ToastContainer, toast } from 'react-toastify';
import { serverTimestamp } from "@firebase/database";




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

const StyledInputGroup = styled(InputGroup)`
margin: 0.5rem;
`

const StyledTextArea = styled(TextArea)`
margin: 0.5rem;
height: 100% !important;
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

export const UpdateNotePanel: React.FunctionComponent<Props> = ({ }) => {

    const selectedContact = useAppSelector((state) => state.navigation.selectedContact)
    const selectedNote = useAppSelector((state) => state.navigation.selectedNote)

    interface NoteDetails {
        note: string
    }

    const [noteDetails, setNoteDetails] = React.useState<NoteDetails>({
        note: selectedNote.note
    })

    console.log(noteDetails)
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

    const docRef = doc(db, "beauhaus/" + selectedContact.id + "/notes/" + selectedNote.id,);

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