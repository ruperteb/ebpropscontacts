import React from "react"

import { useAppDispatch } from '../redux/hooks'
import { navigationSlice } from '../redux/slices/navigationSlice';

import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

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

    const q = query(collection(db, "beauhaus"), orderBy("displayName_lowerCase", "asc"), orderBy("company_lowerCase", "asc"));

    React.useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const data = querySnapshot.docs.map(doc => {
                let docData = doc
                return { ...docData.data(), id: doc.id }
                

            })
            dispatch(navigationSlice.actions.setContactsData(data))

        });

        return () => unsubscribe()
    }, []);


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