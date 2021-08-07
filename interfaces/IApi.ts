export interface AuthResponse {
    email: string | null,
    id: string | null,
    authed: boolean,
    subdom: string | null,
    token: string | null
}

export interface HTMLResponse {
    html: String,
}
