export const gettoken = (): string => {
    let token = localStorage.getItem('AuthToken')
    return token ? token : ''
}

export const settoken = (token: string): void => {
    localStorage.setItem('AuthToken', token)
}

export const removetoken = (): void => {
    localStorage.setItem('AuthToken', '')
}

export const checktoken = (): Boolean => {
    return !!localStorage.getItem('AuthToken') && localStorage.getItem('AuthToken') !== ''
}

