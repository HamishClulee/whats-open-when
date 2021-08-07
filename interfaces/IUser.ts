export interface QUser {
    msg: string,
    user: {
        email: string | null,
        id: string | null,
        authed: boolean,
        subdom: string | null,
        role: string | null,
        tier: string | null,
        token?: string | null,
    }
}
export interface LoginPayload {
    email: string,
    use: string, 
}
export interface SignUpPayload {
    email: string,
    use: string,
    cuse: string,
}