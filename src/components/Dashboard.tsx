import React from "react"

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider } from "firebase/auth";
/* import {db} from "../firebaseSetup" */

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { navigationSlice } from '../redux/slices/navigationSlice';

import { collection, query, where, onSnapshot, getFirestore, DocumentData, orderBy } from "firebase/firestore";

import { db } from "../firebaseSetup"

import Header from "./Header"


import Navigation from "./mainContacts/Navigation"
import ContactsList from "./mainContacts/ContactsList"


import styled from 'styled-components'

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledToastContainer = styled(ToastContainer)`

    /* bottom: 8em !important; */
    .Toastify__toast-body {
        display: grid;
    grid-template-columns: 10% 90%;
}

`

interface Props {

}

export const Dashboard: React.FunctionComponent<Props> = ({ }) => {

    const dispatch = useAppDispatch()

    const auth = getAuth();

    /* console.log(auth) */

    const accessToken = useAppSelector((state) => state.navigation.accessToken)

    const contactsData = useAppSelector((state) => state.navigation.contactsData)

    /* console.log(accessToken) */


    const q = query(collection(db, "beauhaus"), orderBy("displayName_lowerCase", "asc"), orderBy("company_lowerCase", "asc"));

    type Contacts = DocumentData[]

    React.useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            /* console.log(querySnapshot.docs)
            console.log(contacts) */
            const data = querySnapshot.docs.map(doc => {
                let docData = doc
                return { ...docData.data(), id: doc.id }
                

            })
            dispatch(navigationSlice.actions.setContactsData(data))

        });

        return () => unsubscribe()
    }, []);

    /* console.log(contacts) */



    return (
        <div>
            <Header></Header>
            <Navigation></Navigation>
            <ContactsList></ContactsList>
            <StyledToastContainer
                transition={Zoom}
                limit={3}>
            </StyledToastContainer>
        </div>

    )

}

export default Dashboard