import MapUtils from "@/core/map/MapUtils";

export default class PlacesService {
    constructor(mapObj, errorMessages) {
        this.errorMessages = errorMessages;
        this.placesService = new google.maps.places.PlacesService(mapObj);
    }

    async run(locationObj){
        try{
            const {result, status} = await this.getLocationInfo(locationObj);

            if (status === 'OK') {
                if (result) {
                    return MapUtils.success(
                        locationObj.lat,
                        locationObj.lng,
                        MapUtils.formatAddress(result.formatted_address),
                        null,
                        locationObj.placeId,
                        result.name
                    );
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
            self.placesService.getDetails(
                {
                    'fields': ['icon', 'name', 'formatted_address'],
                    'placeId': location.placeId
                },
                (result, status) => resolve({result, status})
            );
        });
    }
    zeroResults(){
        return MapUtils.error(this.errorMessages.zero_results);
    }
    destroy(){
        this.errorMessages = null;
        this.placesService = null;
    }

}
