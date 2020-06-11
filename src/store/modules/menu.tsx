import {createAction, handleActions} from 'redux-actions'

const REUDX_TEST = 'test/REDUX_TEST'

const HANDEL_MENU_CLICK = 'menu/HANDEL_MENU_CLICK'

export const testActio = createAction(REUDX_TEST, (payload: any) => payload)

export const handleMenuClick = createAction(HANDEL_MENU_CLICK, (payload: any) => payload)

type MenuState = {
    isMenuOpen: Boolean,
    etc : Number
}

const initialState : MenuState = {
    isMenuOpen : true,
    etc : 1
}

export default handleActions(
    {
        [REUDX_TEST] : (state, action) =>{
            console.log('reducer ')
            return {
                ...state
            }
        },
        [HANDEL_MENU_CLICK] : (state, action) =>{
            console.log('HANDEL_MENU_CLICK', state.isMenuOpen, action)

            return {
                ...state,
                isMenuOpen : !state.isMenuOpen

            }
        }
    },
    initialState
)
