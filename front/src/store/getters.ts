import { State } from '@I/IState'

const getters = {
    windowWidth: (state: State) => state.ui.windowWidth,
    windowHeight: (state: State) => state.ui.windowHeight,
    scrollY: (state: State) => state.ui.scrollY,
    isauthed: (state: State) => state.user.authed,
    getuser: (state: State) => state.user,
}

export default getters
