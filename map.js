//<![CDATA[
var map = L.map('map').setView([46.522935, 6.6322734], 13);
map.zoomControl.setPosition('bottomright');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// pichard path
var pichardlayer =
    {
        "type": "FeatureCollection",
        "name": "pichard",
        "crs": {
            "type": "name",
            "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
        },
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "MultiLineString",
                    "coordinates": [[[6.624786265731222, 46.523599948291768], [6.626593640628858, 46.5231417872713], [6.628924202996863, 46.522323632981603], [6.629855758092758, 46.521892428637308], [6.631397058342297, 46.520423977360714], [6.632260863976654, 46.519608153946457], [6.63439497201448, 46.519305130701255], [6.634869218245109, 46.519316785472704], [6.636817015263759, 46.519002105766077], [6.637206574667489, 46.51908368956871], [6.637392885686664, 46.519398368802847], [6.636766203167619, 46.519759664935329], [6.637189637302108, 46.520622104055491], [6.637663883532738, 46.521041664082993], [6.638747874917028, 46.521251442881791], [6.639001935397723, 46.521531146686897], [6.638968060666962, 46.522160474983551], [6.638476877070956, 46.522183783298992], [6.638273628686401, 46.522311978855136], [6.638138129763365, 46.522521752749093], [6.638358315513299, 46.523279262844852], [6.638305190519557, 46.523551551570229], [6.637820929693999, 46.52454133880024], [6.637593042246674, 46.525050925193291], [6.637023323628369, 46.525433111851115], [6.63659603466464, 46.525511508781911], [6.635428111497114, 46.525589905599567], [6.634901121775184, 46.525580106003545], [6.63420321646776, 46.525433111851115], [6.633548040056708, 46.525139122352968], [6.63310650812752, 46.524845131263824], [6.631995556821827, 46.523218351811927], [6.631881613098164, 46.523149751608017], [6.631625239719928, 46.523149751608017], [6.631311894479859, 46.523237951854291], [6.630984306274334, 46.523306551946824], [6.630030027588673, 46.523316351952978], [6.629545766763114, 46.523090951364274], [6.62903302000664, 46.522473544962793], [6.628876347386604, 46.522346142768548]]]
                }
            }
        ]
    }


new L.GeoJSON(pichardlayer, {
    // style: function(feature) {
    //     return feature.properties.style
    // }
    color : "red"
}).addTo(map);

//end pichard path


// Year Range Slider -----------

let maxYear = 1870
let minYear = 1830

window.onload = function() {
    let slider = document.getElementById("slider");
    noUiSlider.create(slider, {
        start: [minYear, maxYear],
        connect: true,
        // tooltip: true,
        step: 1,
        range: {
            min: 1808,
            max: 2009
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
    });
}


function update_map() {
    markers.clearLayers();
    sitis =  L.geoJson(geoJson, {
            onEachFeature: onEachFeature
        }
    )
    map.addLayer(markers);

    map.invalidateSize()
}


// Year Range Slider END-----------



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
    if (feature.properties && feature.properties.Title) {
        var marker = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { title: feature.properties.Title });

        var images = feature.properties.images
        var year = parseInt(feature.properties.Title)
        var slideshowContent = '';
        // if in selected range of year
        if (year >= minYear && year <= maxYear){
            for(var i = 0; i < images.length; i++) {
                var img = images[i];
                if (img[2] == "None"){
                    slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
                        '<img src="' + img[0] + '" />' +
                        '<div class="caption"> ID = ' + img[1] + '</div>' +
                        '</div>';
                } else{
                    slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
                        '<img src="' + img[0] + '" />' +
                        '<div class="caption"> ID = ' + img[1] +'<br>' + img[2]+'</div>' +
                        '</div>';
                }

            }
            //slideshow if >1 picture
            if (images.length > 1) {
                var popupContent =  '<div id="' + feature.properties.Title + '" class="popup">' +
                    "<h1><font color='red'>"+feature.properties.Title+"</font></h1>"+
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
                    '<div class="slideshow">' +
                    slideshowContent +
                    '</div>';
            }

            //centering on marker when clicked on
            marker.on('click', function(e) {
                let px =marker.getLatLng(); // find the pixel location on the map where the popup anchor is
                map.panTo(px,{animate: true}); // pan to new center
                document.getElementById("slideshow").innerHTML = popupContent;
            });

            markers.addLayer(marker);
        }

    }
}
map.addLayer(markers);

// Slideshow mechanics
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

