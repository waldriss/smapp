export { };
declare global {
    interface CustomJwtSessionClaims {
      userId?:string;
    }
  }



  export type GetTokenOptions = {
    template?: string;
    leewayInSeconds?: number;
    skipCache?: boolean;
};
 export type GetToken = (options?: GetTokenOptions) => Promise<string | null>;