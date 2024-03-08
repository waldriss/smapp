export interface TUser{
    
    id: number;
    email: string;
    name: string;
    username: string;
    bio?:string;
    userImage?:string;

}


export interface UpdatedUser{
    name?:string;
    bio?:string;
    username?:string;
    file?:File;
}