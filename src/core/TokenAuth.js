import ServerRequest from "@/core/ServerRequest";

export default class TokenAuth {
    static accessTokenName = 'auth-access-token';
    static refreshTokenName = 'auth-refresh-token';


    static init(){
        const token = TokenAuth.fetchLocalAccessToken();

        if(token){
            TokenAuth.setHeader(token);
            return true;
        }
        return false;
    }
    static login(accessToken, refreshToken){
        TokenAuth.saveAccessToken(accessToken);
        TokenAuth.saveRefreshToken(refreshToken);
        TokenAuth.setHeader(accessToken);
    }
    static logout(){
        TokenAuth.removeAccessToken();
        TokenAuth.removeRefreshToken();
        TokenAuth.removeHeader();
    }
    static fetchLocalAccessToken(){
        return window.localStorage.getItem(TokenAuth.accessTokenName);
    }
    static saveAccessToken(token){
        window.localStorage.setItem(TokenAuth.accessTokenName, token);
    }
    static removeAccessToken(){
        window.localStorage.removeItem(TokenAuth.accessTokenName);
    }
    static saveRefreshToken(token){
        window.localStorage.setItem(TokenAuth.refreshTokenName, token);
    }
    static removeRefreshToken(){
        window.localStorage.removeItem(TokenAuth.refreshTokenName);
    }
    static setHeader(token){
        ServerRequest.headers.Authorization = 'Bearer ' + token;
    }
    static removeHeader(){
        delete ServerRequest.headers.Authorization;
    }
}