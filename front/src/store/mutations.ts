import { State } from '@I/IState'
import { AuthResponse } from '@I/IApi'
import qAuth from '../main'
import { removetoken, settoken } from '../api/token'

const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE'
const SET_SCROLL_LOCATION = 'SET_SCROLL_LOCATION'
const IS_AUTHED = 'IS_AUTHED'

const mutations = {

    [IS_AUTHED]: (state: State, details: AuthResponse) => {
        state.user.authed = details.authed
        state.user.email = details.email
        state.user.id = details.id
        state.user.subdom = details.subdom
        if (details.token !== null) details.authed ? settoken(details.token) : removetoken()
        else removetoken()
    },
    [SET_WINDOW_SIZE]: (state: State) => {
        state.ui.windowWidth = window.innerWidth
        state.ui.windowHeight = window.innerHeight
    },
    [SET_SCROLL_LOCATION]: (state: State) => {
        state.ui.scrollY = window.scrollY
    },

}

export default mutations
