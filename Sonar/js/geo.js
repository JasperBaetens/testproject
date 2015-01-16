window.onload = function(){
var c = 0;
var t;
var timer_is_on = 0;
var doTimer = document.getElementById("doTimer");
var stopCount = document.getElementById("stopCount");
var vid = document.getElementById("myAudio");
console.log('geo loaded');



navigator.geolocation.watchPosition(
    positionSucces,
    positionError,
    {
        enableHighAccuracy:true,
        maximumAge:30000,
        timeout:10000
    }
);

function distance(lon1, lat1, lon2, lat2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

function positionSucces(position) {
                console.log('succes');
                var destinationLatitude = document.getElementById('latit').value;
                var destinationLongitude = document.getElementById('longit').value;
                var destinationRadius = document.getElementById('rad').value;

                console.log('latitude:' + destinationLatitude);
                console.log('longitude:' + destinationLongitude);
                console.log('radius:' + destinationRadius);

                var longitude = position.coords.longitude;
                var latitude = position.coords.latitude;
                var hideDistance = distance(longitude, latitude, destinationLongitude, destinationLatitude);
                hideDistance = hideDistance*1000;
                console.log(hideDistance);

                currentInterval = 1000+(hideDistance/destinationRadius);



                var long = document.getElementById("long-4");
                var lat = document.getElementById("lat-4");
                            
                long.setAttribute("value", longitude);
                lat.setAttribute("value", latitude); 

}

function positionError(position){

    }


function timedCount() {
   // document.getElementById('txt').value = c;
    //c = c + 1;
    //console.log('test');

    vid.play();

    t = setTimeout("timedCount()", currentInterval);

}

document.getElementById("doTimer").onclick = function () {
    console.log('check');
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

stopCount.onclick = function () {
    clearTimeout(t);
    timer_is_on = 0;
}
}
