import MapUtils from "@/core/map/MapUtils";

export default class SearchBox {
    constructor(mapObject, htmlElement, onUpdate, onError) {
        const self = this;

        this.mapObject = mapObject;
        this.onUpdate = onUpdate;
        this.onError = onError;
        this.searchBox = new google.maps.places.SearchBox(htmlElement);

        this.mapObject.addListener('bounds_changed', ()=>self.setSearchingArea());
        this.searchBox.addListener('places_changed', ()=>self.placesChanged());
    }
    placesChanged(){
        const places = this.searchBox.getPlaces();

        if (places.length) {
            const place = places[0];

            if (place.geometry){
                const
                    {lat, lng} = place.geometry.location,
                    result = MapUtils.success(lat(), lng());

                result.placeName = place.name;
                result.address = place.formatted_address;

                this.onUpdate(result);
                this.setBoundsAroundPlace(place);
            }
            else{
                this.onError(
                    MapUtils.error('Returned place contains no geometry')
                );
            }
        }
    }
    setSearchingArea(){
        this.searchBox.setBounds(
            this.mapObject.getBounds()
        );
    }
    setBoundsAroundPlace(place){
        const
            {viewport, location} = place.geometry,
            bounds = new google.maps.LatLngBounds();

        if (viewport) {
            // Only geocodes have viewport.
            bounds.union(viewport);
        } else {
            bounds.extend(location);
        }
        this.mapObject.fitBounds(bounds);
    }
    destroy(){
        const {clearListeners} = google.maps.event;

        clearListeners(this.mapObject, 'bounds_changed');
        clearListeners(this.searchBox, 'places_changed');

        this.mapObject
            = this.searchBox
            = this.onUpdate
            = this.onError
            = null;
    }

}
