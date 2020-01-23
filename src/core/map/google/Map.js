import Constants from "@/core/Constants";

/**
 * maybe will try to use gmaps after initialisation callback to make a Promise for all gmaps services like here:
 * https://github.com/xkjyeah/vue-google-maps/blob/vue2/src/manager/initializer.js#L57
 * https://github.com/xkjyeah/vue-google-maps/blob/vue2/src/factories/promise-lazy.js#L19
 */
export default class Map {
    static mapObjects = {};

    constructor(elementWrapper, defaultZoom, onClick, name = Constants.DEFAULT_MAP) {
        this.name = name;

        if(this.map()){
            this.reuse(elementWrapper, defaultZoom);
        }
        else{
            this.create(elementWrapper, defaultZoom);
        }
        this.setupNewMap(defaultZoom, onClick);
    }
    setupNewMap(zoom, onClick){
        this.cleanOldMap();
        this.map().setZoom(zoom);
        //if we don't add any of markers/geolocation/etc we need to setCenter or the map won't appear
        this.setCenterToMoscow();

        if(onClick){
            this.map().addListener('click', function(event){
                event.stop();
                onClick(event);
            });
        }
    }
    cleanOldMap(){
        const {clearListeners} = google.maps.event;

        clearListeners(this.map(), 'bounds_changed');
        clearListeners(this.map(), 'click');
    }
    create(elementWrapper){
        const options = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: 'greedy'
        };
        this.setMapObject(
            new google.maps.Map(elementWrapper.firstChild, options)
        );
    }
    reuse(elementWrapper){
        elementWrapper.removeChild(
            elementWrapper.firstChild
        );
        elementWrapper.appendChild(
            this.map().getDiv()
        );
    }
    setCenterToMoscow(){
        this.setCenter(55.751244, 37.618423);
    }
    setCenter(lat, lng){
        this.map().setCenter({lat, lng});
    }


    map(){
        return this.getMapObject();
    }
    getMapObject(){
        return Map.mapObjects.hasOwnProperty(this.name) ? Map.mapObjects[this.name] : null;
    }
    setMapObject(mapObject){
        Map.mapObjects[this.name] = mapObject;
    }
}
