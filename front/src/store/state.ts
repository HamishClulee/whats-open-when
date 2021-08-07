import { State, UI } from '@I/IState'

const state: State = {
    user: {
        email: null,
        id: null,
        authed: false,
        subdom: null,
        role: null,
        tier: null,
    },
    ui: {
        windowWidth: 0,
        windowHeight: 0,
        scrollY: 0,
    },
}

export default state
