import MapUtils from "@/core/map/MapUtils";

export default class Geocoder {
    constructor(errorMessages){
        this.errorMessages = errorMessages;
        this.geocoder = new google.maps.Geocoder();
    }
    async run(locationObj){
        try{
            const {results, status} = await this.getLocationInfo(locationObj);

            if (status === 'OK') {
                if (results[0]) {
                    const result = results[0];

                    locationObj.city = Geocoder.getCityFromResult(result);
                    locationObj.placeName = result.name;
                    locationObj.address = result.formatted_address;

                    return locationObj;
                }
                return this.zeroResults();
            }
            else if (status === 'ZERO_RESULTS'){
                return this.zeroResults();
            }
            return MapUtils.error(this.errorMessages.error_status);
        }
        catch(error){
            return MapUtils.error(this.errorMessages.threw_error);
        }
    }
    async getLocationInfo(location){
        const self = this;

        return await new Promise((resolve)=>{
            self.geocoder.geocode(
                {'location': location},
                (results, status) => resolve({results, status})
            );
        });
    }
    static getCityFromResult(result){
        return result.address_components.reduce((prevValue, item)=>{
            return item.types.includes('locality') ? item.long_name : prevValue;
        });
    }
    zeroResults(){
        return MapUtils.error(this.errorMessages.zero_results);
    }
    destroy(){
        this.errorMessages = null;
        this.geocoder = null;
    }

}
