export interface IPost{
    
    posterId: number;
    caption: string;
    tags: string[];
    location: string;
    createdAt:Date;
    id:number;
    postImage:string;
    poster:IPoster;
    
  

}



export interface IPoster{
    name:string;
    username:string
}



export interface TPostDetails{
    posterId: number;
    caption: string;
    tags: string[];
    location: string;
    createdAt:Date;
    id:number;
    postImage:string;
    poster:IPoster;

}