import { QUser } from './IUser'

export interface State {
    user: QUser['user'],
    ui: UI,
}
export interface UI {
    windowWidth: number,
    windowHeight: number,
    scrollY: number,
}