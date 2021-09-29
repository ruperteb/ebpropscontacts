import { /* createAsyncThunk,  */createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState,/*  AppThunk  */} from '../../redux/store';
/* import { current } from '@reduxjs/toolkit' */

import { DocumentData } from "firebase/firestore";

type GoogleContactsImportDetails = {
    name?: string
    position?: string
    company?: string
    email?: string
    mobile?: string
    office?: string
}

interface MSPhone {
    type: string
    number: string
}

interface MSEmail {
    address: string
    relevanceScore: number
    selectionLikelihood: string
}

interface MSContact {
    displayName?: string
    companyName?: string
    jobTitle?: string
    phones?: MSPhone[]
    scoredEmailAddresses?: MSEmail[]
}

export interface NavigationState {

    accessToken: string

    contactsData: DocumentData[]
    contactsSearch: string
    contactsRegionFilter: string[]
    contactsIndustryFilter: string[]
    contactsTypeFilter: string[]
    contactsPriorityFilter: string[]

    expandedContact: boolean | string

    contactsPanelDialogOpen: boolean
    contactsPanelStackPage: string
    contactsPanelStackDirection: number

    contactsUpdatePanelDialogOpen: boolean
    selectedContact: DocumentData

    addNotePanelDialogOpen: boolean
    updateNotePanelDialogOpen: boolean
    selectedContactRefresh: string
    selectedNote: DocumentData

    googleContactsSearch: string
    googleContactsSearchResults: gapi.client.people.SearchResult[] | undefined
    googleContactsImportDetails: GoogleContactsImportDetails

    microsoftContactImportDetails: MSContact
    


}

const initialState: NavigationState = {

    accessToken: "",

    contactsData: [],
    contactsSearch: "",
    contactsRegionFilter: [],
    contactsIndustryFilter: [],
    contactsTypeFilter: [],
    contactsPriorityFilter: [],

    expandedContact: false,

    contactsPanelDialogOpen: false,
    contactsPanelStackPage: "initial",
    contactsPanelStackDirection: 0,

    contactsUpdatePanelDialogOpen: false,
    selectedContact: {},

    addNotePanelDialogOpen: false,
    updateNotePanelDialogOpen: false,
    selectedContactRefresh: "",
    selectedNote: {},

    googleContactsSearch: "",
    googleContactsSearchResults: [],
    googleContactsImportDetails: {},

    microsoftContactImportDetails:{} ,

};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setContactsData: (state, action: PayloadAction<DocumentData[]>) => {
            state.contactsData = action.payload;
        },
        setContactsSearch: (state, action: PayloadAction<string>) => {
            state.contactsSearch = action.payload;
        },
        setContactsIndustryFilter: (state, action: PayloadAction<string[]>) => {
            state.contactsIndustryFilter = action.payload;
        },
        setContactsRegionFilter: (state, action: PayloadAction<string[]>) => {
            state.contactsRegionFilter = action.payload;
        },
        setContactsTypeFilter: (state, action: PayloadAction<string[]>) => {
            state.contactsTypeFilter = action.payload;
        },
        setContactsPriorityFilter: (state, action: PayloadAction<string[]>) => {
            state.contactsPriorityFilter = action.payload;
        },
        setExpandedContact: (state, action: PayloadAction<boolean | string>) => {
            state.expandedContact = action.payload;
        },
        setContactsPanelDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.contactsPanelDialogOpen = action.payload;
        },
        setContactsPanelStackPage: (state, action: PayloadAction<string>) => {
            state.contactsPanelStackPage = action.payload;
        },
        setContactsPanelStackDirection: (state, action: PayloadAction<number>) => {
            state.contactsPanelStackDirection = action.payload;
        },
        setContactsUpdatePanelDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.contactsUpdatePanelDialogOpen = action.payload;
        },
        setSelectedContact: (state, action: PayloadAction<DocumentData>) => {
            state.selectedContact = action.payload;
        },
        setAddNotePanelDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.addNotePanelDialogOpen = action.payload;
        },
        setUpdateNotePanelDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.updateNotePanelDialogOpen = action.payload;
        },
        setSelectedContactRefresh: (state, action: PayloadAction<string>) => {
            state.selectedContactRefresh = action.payload;
        },
        setSelectedNote: (state, action: PayloadAction<DocumentData>) => {
            state.selectedNote = action.payload;
        },
        setGoogleContactsSearch: (state, action: PayloadAction<string>) => {
            state.googleContactsSearch = action.payload;
        },
        setGoogleContactsSearchResults: (state, action: PayloadAction<gapi.client.people.SearchResult[] | undefined>) => {
            state.googleContactsSearchResults = action.payload;
        },
        setGoogleContactsImportDetails: (state, action: PayloadAction<GoogleContactsImportDetails>) => {
            state.googleContactsImportDetails = action.payload;
        },
        setMicrosoftContactImportDetails: (state, action: PayloadAction<MSContact>) => {
            state.microsoftContactImportDetails = action.payload;
        },


    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    /* extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            });
    }, */
});

export const { setAccessToken, setContactsData, setContactsSearch, setContactsIndustryFilter, setContactsRegionFilter, setContactsTypeFilter, setContactsPriorityFilter, setExpandedContact, setContactsPanelDialogOpen, setContactsPanelStackPage, setContactsPanelStackDirection, setContactsUpdatePanelDialogOpen, setSelectedContact, setAddNotePanelDialogOpen, setUpdateNotePanelDialogOpen, setSelectedContactRefresh, setSelectedNote, setGoogleContactsSearch, setGoogleContactsSearchResults, setGoogleContactsImportDetails, setMicrosoftContactImportDetails } = navigationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectAccessToken = (state: RootState) => state.navigation.accessToken;
export const selectGoogleContactsSearch = (state: RootState) => state.navigation.googleContactsSearch;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd = (amount: number): AppThunk => (
    dispatch,
    getState
) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
}; */

export default navigationSlice.reducer;
