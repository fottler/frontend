import Geocoder from "@/core/map/google/Geocoder";
import PlacesService from "@/core/map/google/PlacesService";

export default class LocationInfo {
    constructor(mapObj, errorMessages) {
        this.geocoder = new Geocoder(errorMessages);
        this.placesService = this.isMap(mapObj) && new PlacesService(mapObj, errorMessages);
    }
    async run(locationObj){
        return locationObj.placeId && this.placesService
            ? await this.placesService.run(locationObj)
            : await this.geocoder.run(locationObj);
    }
    isMap(obj){
        return obj instanceof google.maps.Map;
    }
    destroy(){
        this.geocoder.destroy();
        this.placesService && this.placesService.destroy();

        this.geocoder = null;
        this.placesService = null;
    }
}
