import LocationInfo from "@/core/map/google/services/LocationInfo";
import FormHelper from "@/store/FormHelper";
import Geolocation from "@/core/map/Geolocation";

export default class GeoInfo {
    constructor(geolocationErrors, locationInfoErrors, networkTimeout = 10000) {
        this.geolocation = new Geolocation(geolocationErrors, networkTimeout);
        this.locationInfo = new LocationInfo(null, locationInfoErrors);
    }
    async run(){
        const result = await this.geolocation.run();

        if(FormHelper.isSuccess(result.status)){
            return await this.locationInfo.run(result);
        }
        return result;
    }
    destroy(){
        this.locationInfo.destroy();

        this.geolocation = null;
        this.locationInfo = null;
    }
}
