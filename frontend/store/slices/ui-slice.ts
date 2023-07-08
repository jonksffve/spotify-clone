import { createSlice } from '@reduxjs/toolkit'

interface UiState {
    showLoginModal: boolean
}

const initialState: UiState = {
    showLoginModal: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showLoginModal: (state) => {
            state.showLoginModal = true
        },
        closeLoginModal: (state) => {
            state.showLoginModal = false
        },
    }
})

export const uiActions = uiSlice.actions 
export default uiSlice.reducer