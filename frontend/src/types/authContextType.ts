// AuthContextType
export type AuthContextType = {
    accessToken : string | null
    login : (accessToken: string) => void
    logout : () => void
    
}
