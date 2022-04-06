//<![CDATA[
var map = L.map('map').setView([46.522935, 6.6322734], 13);
map.zoomControl.setPosition('bottomright');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// pichard path
// var pichardlayer =
//     {
//         "type": "FeatureCollection",
//         "name": "pichard",
//         "crs": {
//             "type": "name",
//             "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
//         },
//         "features": [
//             {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "MultiLineString",
//                     "coordinates": [[[6.624786265731222, 46.523599948291768], [6.626593640628858, 46.5231417872713], [6.628924202996863, 46.522323632981603], [6.629855758092758, 46.521892428637308], [6.631397058342297, 46.520423977360714], [6.632260863976654, 46.519608153946457], [6.63439497201448, 46.519305130701255], [6.634869218245109, 46.519316785472704], [6.636817015263759, 46.519002105766077], [6.637206574667489, 46.51908368956871], [6.637392885686664, 46.519398368802847], [6.636766203167619, 46.519759664935329], [6.637189637302108, 46.520622104055491], [6.637663883532738, 46.521041664082993], [6.638747874917028, 46.521251442881791], [6.639001935397723, 46.521531146686897], [6.638968060666962, 46.522160474983551], [6.638476877070956, 46.522183783298992], [6.638273628686401, 46.522311978855136], [6.638138129763365, 46.522521752749093], [6.638358315513299, 46.523279262844852], [6.638305190519557, 46.523551551570229], [6.637820929693999, 46.52454133880024], [6.637593042246674, 46.525050925193291], [6.637023323628369, 46.525433111851115], [6.63659603466464, 46.525511508781911], [6.635428111497114, 46.525589905599567], [6.634901121775184, 46.525580106003545], [6.63420321646776, 46.525433111851115], [6.633548040056708, 46.525139122352968], [6.63310650812752, 46.524845131263824], [6.631995556821827, 46.523218351811927], [6.631881613098164, 46.523149751608017], [6.631625239719928, 46.523149751608017], [6.631311894479859, 46.523237951854291], [6.630984306274334, 46.523306551946824], [6.630030027588673, 46.523316351952978], [6.629545766763114, 46.523090951364274], [6.62903302000664, 46.522473544962793], [6.628876347386604, 46.522346142768548]]]
//                 }
//             }
//         ]
//     }




var couche_1 = {
    "type": "FeatureCollection",
    "name": "couche_1",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 2 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 6.636810906685771, 46.5197755241416 ], [ 6.637157150127913, 46.520486166381211 ], [ 6.637192968415031, 46.52069566029644 ], [ 6.637670545576608, 46.521069461158262 ], [ 6.638488396465808, 46.52119269164794 ], [ 6.63884657933699, 46.521365213863952 ], [ 6.638995822199981, 46.521525412574 ], [ 6.638965973627383, 46.522149772269202 ], [ 6.638494366180328, 46.522194955916099 ], [ 6.638279456457617, 46.522268892711786 ], [ 6.638142153023664, 46.522437303926345 ], [ 6.638142153023664, 46.522531778281554 ], [ 6.638333183888294, 46.523320427358577 ], [ 6.638309305030216, 46.523607952820115 ], [ 6.637813818725081, 46.524560883470372 ], [ 6.637431756995819, 46.525209852534644 ] ] ] } },
        { "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 6.632325412438525, 46.519620455018703 ], [ 6.631985138710904, 46.519856652844148 ], [ 6.631215045537862, 46.520612478985612 ], [ 6.630552407226175, 46.521257387543159 ], [ 6.629824102054769, 46.521898180820934 ], [ 6.629483828327147, 46.522070700796718 ], [ 6.628940584305854, 46.522288403793873 ], [ 6.626713880790004, 46.523097594079225 ], [ 6.62481551157274, 46.523602818450215 ] ] ] } }
    ]
}

var couche_2 = {
    "type": "FeatureCollection",
    "name": "couche_2",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 6.632291832794354, 46.519602996877794 ], [ 6.634369293447209, 46.519307234579585 ], [ 6.634900598039464, 46.519303126758551 ], [ 6.636679572966335, 46.519040225566499 ], [ 6.637210877558589, 46.519101843147524 ], [ 6.63738399927966, 46.519401714377629 ], [ 6.636810160471454, 46.519776551087965 ] ] ] } }
    ]
}

var couche_3 = {
    "type": "FeatureCollection",
    "name": "couche_3",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 6.637432503210132, 46.525209852534672 ], [ 6.637017608051011, 46.525425489273566 ], [ 6.636643008464899, 46.525524065783394 ], [ 6.636475856458349, 46.525542548859079 ], [ 6.635462497418629, 46.52557438080801 ], [ 6.634932685255005, 46.525581568664862 ], [ 6.634214827084011, 46.525432677150135 ] ] ] } }
    ]
}

var couche_4 = {
    "type": "FeatureCollection",
    "name": "couche_4",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 6.63421333465538, 46.525431650310665 ], [ 6.633646211776005, 46.525198557253319 ], [ 6.633101475326083, 46.524847375516273 ], [ 6.632688072595596, 46.524252825821321 ], [ 6.632019464569389, 46.523208497392424 ], [ 6.631901562707626, 46.523138669406819 ], [ 6.631746350130113, 46.5231263468118 ], [ 6.631318023113323, 46.523246491993959 ], [ 6.631104605819244, 46.523269083366039 ], [ 6.630794180664219, 46.523318373599814 ], [ 6.630068860350074, 46.523318373599814 ], [ 6.629619639332467, 46.523179744703341 ], [ 6.629509199613853, 46.52311299733072 ], [ 6.627921255551612, 46.523614114063363 ], [ 6.627461587533596, 46.523700371395307 ], [ 6.62736607210128, 46.523589469086232 ], [ 6.626828797794506, 46.523297836007856 ], [ 6.626685524646033, 46.523112997330742 ] ] ] } },
        { "type": "Feature", "properties": { "id": 2 }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 6.631753812273261, 46.52312121239639 ], [ 6.631706054557105, 46.522948695756448 ], [ 6.631574720837672, 46.522804931471356 ], [ 6.631279219968945, 46.5226016070472 ], [ 6.630977749385701, 46.522488648705 ], [ 6.630497187366863, 46.522318183853031 ], [ 6.630574793655622, 46.522096373365351 ], [ 6.630846415666271, 46.521687664632196 ], [ 6.63085835509531, 46.521324137195556 ], [ 6.630798657950111, 46.521237876090815 ], [ 6.630759854805734, 46.521044815026798 ] ] ] } }
    ]
}


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
    $('#pichardGenerative').on('click', 'a.year', function() {
        var $gallery = $("#gallery")

        $gallery.find('.active').removeClass('active').hide();
        $gallery.find('.first').addClass('active').show()
        $gallery.find('#'+$(this).html()).addClass('active').show()
        return false;
    });

    $('#pichardGenerative').on('click', '.popup .cycle a', function() {
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

}



var path = L.layerGroup()


if (maxYear >= 1838){
    new L.GeoJSON(couche_1, {
        color : "red"
    }).addTo(path);
}
if (maxYear >= 1845){
    new L.GeoJSON(couche_2, {
        color : "green"
    }).addTo(path);
}
if (maxYear >= 1850){
    new L.GeoJSON(couche_3, {
        color : "black"
    }).addTo(path);
}

if (maxYear >= 1855){
    new L.GeoJSON(couche_4, {
        color : "blue"
    }).addTo(path);
}

path.addTo(map)




function update_map() {
    markers.clearLayers();
    json.forEach(createMarker)
    map.addLayer(markers)
    path.clearLayers()
    if (maxYear >= 1838){
        new L.GeoJSON(couche_1, {
            color : "red"
        }).addTo(path);
    }
    if (maxYear >= 1845){
        new L.GeoJSON(couche_2, {
            color : "green"
        }).addTo(path);
    }
    if (maxYear >= 1850){
        new L.GeoJSON(couche_3, {
            color : "black"
        }).addTo(path);
    }
    if (maxYear >= 1855){
        new L.GeoJSON(couche_4, {
            color : "blue"
        }).addTo(path);
    }

    path.addTo(map)
    map.invalidateSize()

}


// Year Range Slider END-----------

var markers = L.markerClusterGroup();
json.forEach(createMarker)
map.addLayer(markers);



function createMarker(value) {
    var marker = L.marker(new L.LatLng(value.latitude, value.longitude), { title: value.title});
    var popupContent_array = '';
    var scroll_list = '';
    for (var j = 0; j < value.years.length; j++) {
        year_elem = value.years[j]
        if (year_elem.year >= minYear && year_elem.year <= maxYear) {
            popupContent_array += '<div id="' + year_elem.year + '" class="galleryyear' + (j === 0 ? ' active' : '')+ '"'  + (j === 0 ? ' style="display: block;"' : '')+ ' >'
            scroll_list += '<div><a href=#pichard  class="year">' + year_elem.year + '</a></div>'
            var slideshowContent = '';
            var popupContent = '';
            for (var i = 0; i < year_elem.images.length; i++) {
                img = year_elem.images[i]
                    slideshowContent += '<div class="image' + (i === 0 ? ' active first' : '')    + '">' +
                        '<img src="' + img.url + '" />' +
                        '<div class="caption"> ID = ' + img.id + '<br>' + img.description + '</div>' +
                        '</div>';
            }
            if (year_elem.images.length > 1) {
                popupContent = '<div class="popup">' +
                    "<h1><font color='red'>" + year_elem.year + "</font></h1>" +
                    '<div class="slideshow">' +
                    slideshowContent +
                    '</div>' +
                    '<div class="cycle">' +
                    '<a href="#pichard" class="prev">&laquo; Previous</a>' +
                    '<a href="#pichard" class="next">Next &raquo;</a>' +
                    '</div></div>';
            } else {
                popupContent = '<div class="popup">' +
                    "<h1><font color='red'>" + year_elem.year + "</font></h1>" +
                    '<div class="slideshow">' +
                    slideshowContent +
                    '</div></div>';
            }
            popupContent_array += popupContent + '</div>'
        }
    }

    if (scroll_list !== '') {
        marker.on('click', function(e) {
            let px =marker.getLatLng(); // find the pixel location on the map where the popup anchor is
            map.panTo(px,{animate: true}); // pan to new center
            document.getElementById("scrolllist").innerHTML = scroll_list
            document.getElementById("gallery").innerHTML = popupContent_array
        });
        markers.addLayer(marker);
    }

}



var searchLayer = L.layerGroup().addTo(map);
//... adding data in searchLayer ...
map.addControl( new L.Control.Search({layer: markers}) );





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

