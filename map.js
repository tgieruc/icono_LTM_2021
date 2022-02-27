//<![CDATA[
var map = L.map('map').setView([46.522935, 6.6322734], 13);

let maxYear = 1870
let minYear = 1830

window.onload = function() {
    let slider = document.getElementById("slider");
    noUiSlider.create(slider, {
        start: [1800, 2020],
        connect: true,
        // tooltip: true,
        step: 1,
        range: {
            min: 1800,
            max: 2020
        }
    });
    min_element = document.getElementById("min");
    max_element = document.getElementById("max");
    slider.noUiSlider.on("update", function (values, handle) {
        let slider_values = slider.noUiSlider.get();
        minYear = parseInt(slider_values[0]);
        maxYear = parseInt(slider_values[1]);
        min_element.innerHTML = parseInt(slider_values[0]);
        max_element.innerHTML = parseInt(slider_values[1]);
        markers.clearLayers();
        sitis =  L.geoJson(geoJson, {
                // pointToLayer: function (feature, latlng) {
                //     feature.properties.myKey = feature.properties.Title + ', ' + feature.properties.Head
                //     return L.circleMarker(latlng, geojsonMarkerOptions);
                // },
                onEachFeature: onEachFeature
            }
        )
        map.addLayer(markers);

        map.invalidateSize()
    });

}

map.zoomControl.setPosition('bottomright');

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );

var markers = L.markerClusterGroup();

var sitis =  L.geoJson(geoJson, {
        // pointToLayer: function (feature, latlng) {
        //     feature.properties.myKey = feature.properties.Title + ', ' + feature.properties.Head
        //     return L.circleMarker(latlng, geojsonMarkerOptions);
        // },
        onEachFeature: onEachFeature
    }
)



function onEachFeature(feature, layer) {
// does this feature have a property named popupContent
    if (feature.properties && feature.properties.Title) {
        var marker = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { title: feature.properties.Title });

        var images = feature.properties.images
        var year = parseInt(feature.properties.Title)
        var slideshowContent = '';
        if (year > minYear && year < maxYear){
            for(var i = 0; i < images.length; i++) {
                var img = images[i];
                if (img[1] == "None"){
                    slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
                        '<img src="' + img[0] + '" />' +
                        '</div>';
                } else{
                    slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
                        '<img src="' + img[0] + '" />' +
                        '<div class="caption">' + img[1] + '</div>' +
                        '</div>';
                }

            }

            if (images.length > 1) {
                var popupContent =  '<div id="' + feature.properties.Title + '" class="popup">' +
                    "<h1><font color='red'>"+feature.properties.Title+"</font></h1>"+
                    // <h2>Address: " +feature.properties.Head+
                    // "</h2><p>"+feature.properties.Description+"</p><p> Website:"
                    // +feature.properties.URL+

                    '<div class="slideshow">' +
                    slideshowContent +
                    '</div>' +
                    '<div class="cycle">' +
                    '<a href="#pichard" class="prev">&laquo; Previous</a>' +
                    '<a href="#pichard" class="next">Next &raquo;</a>' +
                    '</div>'
                '</div>';
            } else {
                var popupContent =  '<div id="' + feature.properties.Title + '" class="popup">' +
                    "<h1><font color='red'>"+feature.properties.Title+"</font></h1>"+
                    // <h2>Address: " +feature.properties.Head+
                    // "</h2><p>"+feature.properties.Description+"</p><p> Website:"
                    // +feature.properties.URL+

                    '<div class="slideshow">' +
                    slideshowContent +
                    '</div>';
            }


            marker.on('click', function(e) {
                let px =marker.getLatLng(); // find the pixel location on the map where the popup anchor is
                map.panTo(px,{animate: true}); // pan to new center
                document.getElementById("slideshow").innerHTML = popupContent;
            });

            markers.addLayer(marker);
            function clickZoom(e) {
                map.setView(e.target.getLatLng());
            }
        }

    }
}
map.addLayer(markers);


$('#pichard').on('click', '.popup .cycle a', function() {
    var $slideshow = $('.slideshow'),
        $newSlide;

    if ($(this).hasClass('prev')) {
        $newSlide = $slideshow.find('.active').prev();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').last();
        }
    } else {
        $newSlide = $slideshow.find('.active').next();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').first();
        }
    }

    $slideshow.find('.active').removeClass('active').hide();
    $newSlide.addClass('active').show();
    return false;
});



var menuButton = document.querySelector('#menu-button');
var menu = document.querySelector('#menu');

// show or hide
menuButton.addEventListener('click',function(){
    menu.classList.toggle('show-menu');
    menuButton.classList.toggle('close');
});








//]]>

// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent){
    window.parent.parent.postMessage(["resultsFrame", {
        height: document.body.getBoundingClientRect().height,
        slug: "rv28aznx"
    }], "*")
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"

