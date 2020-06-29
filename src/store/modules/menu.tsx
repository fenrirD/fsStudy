import {createAction, handleActions} from 'redux-actions'

const REUDX_TEST = 'test/REDUX_TEST'

const HANDEL_MENU_CLICK = 'menu/HANDEL_MENU_CLICK'

const HANDEL_POST_CLICK = 'menu/HANDEL_POST_CLICK'

const SET_USER_LOCATION = 'menu/SET_USER_LOCATION'

export const testActio = createAction(REUDX_TEST, (payload: any) => payload)

export const handleMenuClick = createAction(HANDEL_MENU_CLICK, (payload: any) => payload)

export const handlePostClick = createAction(HANDEL_POST_CLICK, (payload: any) => payload)

export const setUserLocation = createAction(SET_USER_LOCATION, (payload: any) => payload)

type MenuState = {
    userLocation: number[]| null,
    isMenuOpen: Boolean,
    isPostOpen : Boolean
    etc : string | null
}

const initialState : MenuState = {
    userLocation: null,
    isMenuOpen : false,
    isPostOpen : false,
    etc : null
}

export default handleActions(
    {
        [SET_USER_LOCATION] : (state:any, action:any) => {
            console.log('reducer ',state, action)
            const data = action.payload
            return {
                ...state,
                userLocation: data
            }
        },
        [HANDEL_MENU_CLICK] : (state, action) =>{
            console.log('HANDEL_MENU_CLICK', state.isMenuOpen, action)

            return {
                ...state,
                isMenuOpen : !state.isMenuOpen

            }
        },
        [HANDEL_POST_CLICK] : (state, action) =>{
            console.log('HANDEL_MENU_CLICK', state.isMenuOpen, action)

            return {
                ...state,
                isPostOpen : !state.isPostOpen

            }
        }
    },
    initialState
)
