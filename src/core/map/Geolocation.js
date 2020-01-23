import MapUtils from "@/core/map/MapUtils";

export default class Geolocation {
    constructor(errorMessages, networkTimeout = 10000) {
        this.errorMessages = errorMessages;
        this.networkTimeout = networkTimeout;
    }
    async run(){
        if (Geolocation.isSupported()){
            try{
                const
                    position = await this.getCurrentPosition(),
                    {latitude, longitude} = position.coords;

                return MapUtils.success(latitude, longitude);
            }
            catch(error){
                return MapUtils.error(
                    this.getErrorMessage(error.code)
                );
            }
        }
        return MapUtils.error(
            this.errorMessages['browser_support']
        );
    }
    async getCurrentPosition(){
        const networkTimeout = this.networkTimeout;

        return await new Promise(function(resolve, reject){
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: networkTimeout
            });
        });
    }
    getErrorMessage(errorCode){
        errorCode = this.errorMessages.hasOwnProperty(errorCode) ? errorCode : 'default';

        return this.errorMessages[errorCode];
    }
    static isSupported(){
        return navigator.geolocation;
    }


}
