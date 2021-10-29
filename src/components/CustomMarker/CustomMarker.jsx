
// CustomMarker.prototype = new window.google.maps.OverlayView();

class CustomMarker extends window.google.maps.OverlayView {
    constructor(opts) {
        super();
        // this.setValues(opts);
        this.position = opts.position;
        this.icon = opts.icon;
        this.rotation = opts.rotation;
        this.map = opts.map;

        this.setMap(this.map);
    
    }
    draw() {
        var self = this;
        var div = this.div;
        // Create the img element and attach it to the div.

        if (!div) {
            div = this.div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.cursor = 'pointer';
            // add transition smoothness to the marker
            // div.style.transition = 'left 0.2s ease-in-out';
            div.style.transform = 'rotate('+this.rotation+'deg)';

            var img = document.createElement('img');

            img.src = this.icon.url;
            img.style.width = '13px';
            img.style.height = '26px';
            img.style.transform = 'rotate('+this.rotation+'deg)';

            div.appendChild(img);

            
            
            // this.pinWrap = this.div.getElementsByClassName('pin-wrap');
            // this.pin = this.div.getElementsByClassName('pin');
            // this.pinShadow = this.div.getElementsByClassName('shadow');
            // div.style.position = 'absolute';
            // div.style.cursor = 'pointer';
            
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
            window.google.maps.event.addDomListener(div, "click", function (event) {
                window.google.maps.event.trigger(self, "click", event);
            });
        }
        var point = this.getProjection().fromLatLngToDivPixel(this.position);
        if (point) {
            div.style.left = point.x - 5 + 'px';
            div.style.top = point.y - 5 + 'px';
        }
    }
    // Update the marker position with animate transition
    update = (latLng) => {console.log(latLng);
        this.setValues(latLng.position);
        var point = this.getProjection().fromLatLngToDivPixel(latLng);
        
        if (point) {
            this.div.style.left = point.x + 'px';
            this.div.style.top = point.y + 'px';
        }
    }

    remove () {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div) {
          this.div.parentNode.removeChild(this.div_);
          this.div = null;
        }
    }

    setPosition = function(opts) {
        this.position  = opts.position;
        this.rotation  = opts.rotation;
          // Position the overlay 
        var point = this.getProjection().fromLatLngToDivPixel(this.position );
        if (point) {
            // add smooth transition to the marker
            this.div.transition = 'left 0.2s ease-in-out';
          this.div.style.left = point.x  + 'px';
          this.div.style.top = point.y  + 'px';
          this.div.style.transform = 'rotate('+this.rotation+2+'deg)';
        }
      }
    // animateDrop() {
    //     dynamics.stop(this.pinWrap);
    //     dynamics.css(this.pinWrap, {
    //         'transform': 'scaleY(2) translateY(-' + $('#map').outerHeight() + 'px)',
    //         'opacity': '1',
    //     });
    //     dynamics.animate(this.pinWrap, {
    //         translateY: 0,
    //         scaleY: 1.0,
    //     }, {
    //         type: dynamics.gravity,
    //         duration: 1800,
    //     });

    //     dynamics.stop(this.pin);
    //     dynamics.css(this.pin, {
    //         'transform': 'none',
    //     });
    //     dynamics.animate(this.pin, {
    //         scaleY: 0.8
    //     }, {
    //         type: dynamics.bounce,
    //         duration: 1800,
    //         bounciness: 600,
    //     });

    //     dynamics.stop(this.pinShadow);
    //     dynamics.css(this.pinShadow, {
    //         'transform': 'scale(0,0)',
    //     });
    //     dynamics.animate(this.pinShadow, {
    //         scale: 1,
    //     }, {
    //         type: dynamics.gravity,
    //         duration: 1800,
    //     });
    // }
    // animateBounce() {
    //     dynamics.stop(this.pinWrap);
    //     dynamics.css(this.pinWrap, {
    //         'transform': 'none',
    //     });
    //     dynamics.animate(this.pinWrap, {
    //         translateY: -30
    //     }, {
    //         type: dynamics.forceWithGravity,
    //         bounciness: 0,
    //         duration: 500,
    //         delay: 150,
    //     });

    //     dynamics.stop(this.pin);
    //     dynamics.css(this.pin, {
    //         'transform': 'none',
    //     });
    //     dynamics.animate(this.pin, {
    //         scaleY: 0.8
    //     }, {
    //         type: dynamics.bounce,
    //         duration: 800,
    //         bounciness: 0,
    //     });
    //     dynamics.animate(this.pin, {
    //         scaleY: 0.8
    //     }, {
    //         type: dynamics.bounce,
    //         duration: 800,
    //         bounciness: 600,
    //         delay: 650,
    //     });

    //     dynamics.stop(this.pinShadow);
    //     dynamics.css(this.pinShadow, {
    //         'transform': 'none',
    //     });
    //     dynamics.animate(this.pinShadow, {
    //         scale: 0.6,
    //     }, {
    //         type: dynamics.forceWithGravity,
    //         bounciness: 0,
    //         duration: 500,
    //         delay: 150,
    //     });
    // }
    // animateWobble() {
    //     dynamics.stop(this.pinWrap);
    //     dynamics.css(this.pinWrap, {
    //         'transform': 'none',
    //     });
    //     dynamics.animate(this.pinWrap, {
    //         rotateZ: -45,
    //     }, {
    //         type: dynamics.bounce,
    //         duration: 1800,
    //     });

    //     dynamics.stop(this.pin);
    //     dynamics.css(this.pin, {
    //         'transform': 'none',
    //     });
    //     dynamics.animate(this.pin, {
    //         scaleX: 0.8
    //     }, {
    //         type: dynamics.bounce,
    //         duration: 800,
    //         bounciness: 1800,
    //     });
    // }
}





// $(function() {
//     var pos = new google.maps.LatLng(42.9837, -81.2497);
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 14,
//         center: pos,
//         disableDefaultUI: true,
//     });

//     var marker = new CustomMarker({
//         position: pos,
//         map: map,
//     });

//     google.maps.event.addListener(marker, 'click', function(e) {
//         marker.animateWobble();
//     });

//     $('#drop').on('click', function(e) {
//         marker.animateDrop();
//     });

//     $('#wobble').on('click', function(e) {
//         marker.animateWobble();
//     });

//     $('#bounce').on('click', function(e) {
//         marker.animateBounce();
//     })
// });

export default CustomMarker;
