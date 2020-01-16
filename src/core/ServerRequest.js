import ObjectUtil from "@/core/utilities/ObjectUtil";
import Constants from "@/core/Constants";
import qs from "qs";


export default class ServerRequest {
    static headers = {};
    static baseUrl = '';

    static async _get(url, params){
        let response = await fetch(self.prepareUrl(url, params), {
            headers: self.headers
        });
        return await response.json();
    }
    static async _post(url, params){
        let response = await fetch(self.prepareUrl(url), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                ...self.headers
            },
            body: JSON.stringify(
                ObjectUtil.copyWithoutNullProps(params)
            )
        });
        return await response.json();
    }


    static async get(url, params){
        return await self.handleResult(
            self._get,
            url,
            params
        );
    }
    static async post(url, params){
        return await self.handleResult(
            self._post,
            url,
            params
        );
    }
    static async handleResult(requestMethod, url, params){
        ServerRequest.before();

        try{
            const result = await requestMethod(url, params);
            ServerRequest.after();
            return result
        }
        catch(error){
            ServerRequest.after();
            return {
                status: Constants.STATUS_HTTP_ERROR,
                error: error
            };
        }
    }
    /**
     * params must be an object
     */
    static prepareUrl(url, params = {}){
        const urlParams = ObjectUtil.copyWithoutEmptyProps(params);
        let fullUrl = self.baseUrl + url;

        if(ObjectUtil.isNotEmpty(urlParams)){
            fullUrl += '?'+ qs.stringify(urlParams);
        }
        return fullUrl;
    }


    static before(){
        //usage: ServerRequest.before = function(){...};
    }
    static after(){
        //usage: ServerRequest.after = function(){...};
    }
}
const self = ServerRequest;