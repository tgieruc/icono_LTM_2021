//<![CDATA[

var min_year = 1856
var max_year = 2012
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [1856, 2012],
    connect: true,
    range: {
        'min': 1856,
        'max': 2012
    }
});

var map = L.map('map').setView([46.522935, 6.6322734], 13);

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

//L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="openstreetmap.org/copyright">OpenStreetMap</a>', subdomains: ['a','b','c'] }).addTo( map )

function onEachFeature(feature, layer) {
// does this feature have a property named popupContent
    if (feature.properties && feature.properties.Title) {
        var marker = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { title: feature.properties.Title });

        var images = feature.properties.images
        var slideshowContent = '';

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
                '<a href="#" class="prev">&laquo; Previous</a>' +
                '<a href="#" class="next">Next &raquo;</a>' +
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


        // layer.bindPopup(popupContent);
        // marker.bindPopup(popupContent).on('click', clickZoom).on('click', clickZoom);
        marker.bindPopup(popupContent, {
            maxWidth: window.innerWidth/1.5,
            maxHeight: window.innerHeight/1.5
        });
        markers.addLayer(marker);
        function clickZoom(e) {
            map.setView(e.target.getLatLng());
        }
    }
};
map.addLayer(markers);
map.on('popupopen', function(e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});


$('#map').on('click', '.popup .cycle a', function() {
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


// L.control.search({
//     layer: L.layerGroup ([sitis]),
//     initial: false,
//     propertyName: 'myKey', // Specify which property is searched into.
//     zoom: 14,
//     placeholder: "Search order",
//     position: 'topleft'
// })
//     .addTo(map);

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