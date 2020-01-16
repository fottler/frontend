export default class Marker {
    constructor(mapObj, iconSrc, iconHeight, onClick) {
        this.marker = new google.maps.Marker({
            map: mapObj,
            icon: {
                url: iconSrc,
                scaledSize: new google.maps.Size(iconHeight, iconHeight)
            }
        });

        if(onClick){
            this.clickListener = this.marker.addListener('click', onClick);
        }
    }
    moveTo(lat, lng){
        this.marker.setPosition({lat, lng});
    }
    destroy(){
        this.clickListener && google.maps.event.removeListener(this.clickListener);
        this.marker.setMap(null);
        this.marker = null;
    }


}
