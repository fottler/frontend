import Constants from "@/core/Constants";

export default class MapUtils {

    static success(lat, lng, address = null, city = null, placeId = null, placeName = null){
        return {
            status: Constants.STATUS_SUCCESS,
            lat, lng, address, city, placeId, placeName
        };
    }
    static error(message){
        return {
            status: Constants.STATUS_ERROR,
            error: message
        };
    }

}
