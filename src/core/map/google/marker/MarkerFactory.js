import Marker from "@/core/map/google/marker/Marker";

export default class MarkerFactory {
    constructor(mapObject, iconSrc, iconHeight, onClick) {
        this.markers = [];

        this.mapObject = mapObject;
        this.iconSrc = iconSrc;
        this.iconHeight = iconHeight;
        this.onClick = onClick;

        this.clearMapBounds();
    }
    setAll(coordsList){
        this.removeAll();
        this.addAll(coordsList);
    }
    addAll(coordsList){
        coordsList.forEach(coords => {
            this.add(coords);
        });
        this.updateMapBounds();
    }
    add(coords){
        const
            self = this,
            {lat, lng} = coords,

            marker = new Marker(
                this.mapObject,
                this.iconSrc,
                this.iconHeight,
                (event)=>self.onClick(event, coords)
            );

        marker.moveTo(lat, lng);

        this.markers.push(marker);
        this.bounds.extend({lat, lng});
    }
    clearMapBounds(){
        this.bounds = new google.maps.LatLngBounds();
    }
    updateMapBounds(){
        this.mapObject.fitBounds(this.bounds);
    }
    removeAll(){
        this.clearMapBounds();

        this.markers.forEach(marker => {
            marker.destroy();
        });
        this.markers = [];
    }
    destroy(){
        this.removeAll();

        this.bounds
            = this.mapObject
            = this.iconSrc
            = this.iconHeight
            = this.onClick
            = null;
    }

}
