
import { create } from "zustand"
import { AuthenticatedUser } from "../types/user"


interface AnimateHomeHeaderContext {
    isAnimateHomeHeader:boolean
    setisAnimateHomeHeader:(isAnimateHomeHeader:boolean)=>void

}





export const UseAnimateHomeHeader=create<AnimateHomeHeaderContext>()((set)=>({
    isAnimateHomeHeader:false,
    setisAnimateHomeHeader:(isAnimateHomeHeader:boolean)=>set({isAnimateHomeHeader}),
}))


interface TokenContext {
    token:string|null
    setToken:(token:string|null)=>void

}



export const UseToken=create<TokenContext>()((set)=>({
    token:null,
    setToken:(token:string|null)=>set({token}),
}))

interface AuthenticatedUserContext {
    authenticatedUser:AuthenticatedUser|undefined;
    setauthenticatedUser:(authenticatedUser:AuthenticatedUser|undefined)=>void

}





export const UseAuthenticatedUser=create<AuthenticatedUserContext>()((set)=>({
    authenticatedUser:undefined,
    setauthenticatedUser:(authenticatedUser:AuthenticatedUser|undefined)=>set({authenticatedUser}),
}))


