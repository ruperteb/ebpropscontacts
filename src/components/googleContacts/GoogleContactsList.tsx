import React from "react"

import { loadGoogleScript } from '../../utils/googleApiScript';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import {
    Button,
    H5,
    Icon,
    IconSize,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Spinner,
    Switch,
    Tag,
    Card,
    Elevation,
} from "@blueprintjs/core";

import styled from 'styled-components'

import GoogleContact from "./GoogleContact"

const StyledLoginContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
padding: 0.5rem;

`

const StyledCard = styled(Card)`
position: relative;
margin-top: 1rem;
display: flex;
flex-direction: column;
flex-wrap: wrap;
`

const StyledTitleDiv = styled.div`
display: flex;
margin-left: 1rem;
margin-right: 1rem;
margin-bottom: 1rem;
`

const StyledGoogleSignin = styled.div`

height: fit-content;
width: fit-content;
margin-left: auto;
margin-right: auto;


.abcRioButtonContentWrapper {
    display: flex;
    border: 0px;
}

.abcRioButtonIcon {
    padding: 0.5rem !important;
    margin: 1px;
}

.abcRioButtonContents {
    line-height: none !important;
    font-size: 16px !important;
}
`

const StyledH2 = styled.h2`
font-family: "Segoe UI", sans-serif;
margin: auto;
/* margin-bottom: 1rem; */
margin-left: auto;
margin-right: auto;
/* text-transform: uppercase; */
`

const StyledSearchDiv = styled.div`
display: flex;
/* margin-left: 1rem;
margin-right: 1rem; */
`

const StyledInputGroup = styled(InputGroup)`
/* margin: 1rem; */
width: 100%;
`

const StyledButton = styled(Button)`
    /* margin: auto;
    margin-top: 1rem; */
    margin-right: 0;
    margin-left: 5px;
    display: flex;
`

const StyledStatusText = styled.p`
height: 1rem;
margin: auto;
color: red;
`




interface Props {

}

export const GoogleContactsList: React.FunctionComponent<Props> = ({ }) => {

    const dispatch = useAppDispatch()

    const searchResults = useAppSelector((state) => state.navigation.googleContactsSearchResults)
    const search = useAppSelector((state) => state.navigation.googleContactsSearch)

    //@ts-ignore
    const [gapi, setGapi] = React.useState<gapi>();
    const [googleAuth, setGoogleAuth] = React.useState<gapi.auth2.GoogleAuth>();
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState("");



    const onSuccess = (googleUser: gapi.auth2.GoogleUser) => { // (Ref. 7)
        setIsSignedIn(true);
        const profile = googleUser.getBasicProfile();
        setName(profile.getName());
        setEmail(profile.getEmail());
        setImageUrl(profile.getImageUrl());
        /* console.log(googleUser.getAuthResponse().id_token)
        console.log(googleUser.getAuthResponse().access_token) */
    };

    const onFailure = () => {
        setIsSignedIn(false);
    }

    const logOut = () => { // (Ref. 8)
        (async () => {
            // @ts-ignore
            await googleAuth.signOut();
            setIsSignedIn(false);
            renderSigninButton(gapi);
        })();
    };

    const renderSigninButton = (_gapi: any) => { // (Ref. 6)
        _gapi.signin2.render('google-signin', {
            'scope': 'profile email',
            'longtitle': false,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }

    function listConnectionNames() {
        window.gapi.client.people.people.connections.list({
            resourceName: 'people/me',
            pageSize: 10,
            personFields: 'names,emailAddresses,phoneNumbers,occupations,organizations',
        }).then(function (response: any) {
            var connections = response.result.connections;
            /* console.log(connections) */


        })
    }


    const execute = () => {

        return window.gapi.client.people.people.connections.list({
            resourceName: "people/me",
            pageSize: 10,
            personFields: "names,emailAddresses,phoneNumbers"
        })
            .then(
                (response) => {
                    console.log("people response: ", response);
                },
                (err) => {
                    console.log("people err: ", err);
                }
            );

    };

    function setSigninStatus() {

        var user = googleAuth?.currentUser.get();
        if (googleAuth?.isSignedIn.get()) {
            setIsSignedIn(true)
        } else {
            setIsSignedIn(false)
        }

    }

    React.useEffect(() => {
        if (googleAuth?.isSignedIn.get()) {
            setIsSignedIn(true)
        } else setIsSignedIn(false)

    }, [isSignedIn])



    function revokeAccess() {

        googleAuth?.disconnect();
    }

    function updateSigninStatus() {
        setSigninStatus();
    }



    React.useEffect(() => {

        window.onGoogleScriptLoad = () => {
            const _gapi = window.gapi;
            setGapi(_gapi);
            _gapi.load('client:auth2', () => {
                (async () => {
                    _gapi.client.init({
                        'apiKey': "AIzaSyBNa8_a2bGNGNatOyNFJZ-ZAZBWEHHGfiQ",
                        'clientId': "646424163571-sret013veeg1sr5m72v8neuu4kh7ell6.apps.googleusercontent.com",
                        'scope': "https://www.googleapis.com/auth/contacts.readonly",
                        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"]
                    }).then(function () {
                        const _googleAuth = _gapi.auth2.getAuthInstance();
                        setGoogleAuth(_googleAuth);
                        _googleAuth.isSignedIn.listen(updateSigninStatus);
                        var user = _googleAuth.currentUser.get();
                        renderSigninButton(window.gapi);

                    });
                })();
            });
        }
        loadGoogleScript();

    }, []);



    function handleAuthClick() {

        if (googleAuth?.isSignedIn.get()) {

            googleAuth?.signOut();
        } else {
            googleAuth?.signIn()
                .then((result) => {
                    if (result) {
                        setIsSignedIn(true)
                    }

                })
        }
    }

    const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(navigationSlice.actions.setGoogleContactsSearch(e.target.value))
    }

    function searchNames() {
        dispatch(navigationSlice.actions.setGoogleContactsSearchResults([]))
        window.gapi?.client.people.people.searchContacts({
            query: search,
            pageSize: 10,
            readMask: 'names,emailAddresses,phoneNumbers,occupations,organizations',
        }).then(function (response) {
            var searchResults = response.result.results;
            /* console.log(searchResults) */
            dispatch(navigationSlice.actions.setGoogleContactsSearchResults(searchResults))

        })
    }


    console.log("SignedIn", isSignedIn)



    return (
        <StyledLoginContainer>


            <StyledTitleDiv>
                {/* <StyledH2>Contact List</StyledH2> */}
                <StyledGoogleSignin id="google-signin" onClick={handleAuthClick}></StyledGoogleSignin>
            </StyledTitleDiv>

            <StyledSearchDiv>
                <StyledInputGroup

                    large={true}
                    placeholder={isSignedIn ? "Search" : "Must Sign In to proceed"}
                    /* rightElement={lockButton} */
                    disabled={!isSignedIn}
                    leftIcon={"search"}
                    /* small={small} */
                    type={"search"}
                    value={search}
                    onChange={handleSetSearch}
                />


                <StyledButton large={true} onClick={searchNames} rightIcon="arrow-right" intent="primary" /* text="Submit" */></StyledButton>

            </StyledSearchDiv>

            {searchResults?.map((contact, index: number) => {
                return <GoogleContact contact={contact} key={index}></GoogleContact>

            })}


        </StyledLoginContainer>

    )

}

export default GoogleContactsList