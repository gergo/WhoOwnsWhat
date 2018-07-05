function initialize() {

    var start = new google.maps.LatLng(0, 0)
    var mapOptions = {
        center: { lat: 46.8303, lng: 17.7340 },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var iconMap = {
        Camping: "campground",
        Hotel: "lodging"
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var markers = [
        {
            "Name": "Aranypart Camping",
            "Category": "Lodging",
            "SubCategory": "Camping",
            "Address": "Siófok, Szent László u. 185, 8600",
            "Owner": "Kis Jakab",
            "Ownership": "direct",
            "Articles": ""
        },
        {
            "Name": "Balatontourist Zala Kemping és Üdülőfalu",
            "Category": "Lodging",
            "SubCategory": "Camping",
            "Address": "Keszthely, Entz Géza stny. 1, 8360",
            "Owner": "Meszáros Lőrinc",
            "Ownership": "direct",
            "Articles": "https://24.hu/belfold/2017/04/12/meszaros-lorinc-cege-felvasarolta-a-balatoni-kemping-nagy-reszet/"
        }
    ];

    const lookUpAddress = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    function httpGet(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    markers.forEach(element => {
        element.Geocode = JSON.parse(httpGet(lookUpAddress + element.Address));
    });

    markers.forEach(element => {
        var marker = new google.maps.Marker({
            position: element.Geocode.results["0"].geometry.location,
            map: map,
            title: element.Name,
            icon: {
                url: "icons/" + iconMap[element.SubCategory] + ".svg",
                scaledSize: { height: 20, width: 20 }
            }
        });
    });


    /*  getFileFromServer("owners.csv", function (text) {
 
         if (text === null)
             return
 
         rows = text.split("\n");
         var headers = rows[0].split("\t");
 
         markers = [];
         infoWindowContent = [];
 
         for (i = 1; i < rows.length; i++) {
             // row 0: ID of sample (title) 44563383.3.txt
             // row 13: coordinates
             //
             var cols = rows[i].split("\t");
             if (cols.length == 1)
                 continue;
 
             var lat = cols[13].split(',')[0];
             var lon = cols[13].split(',')[1];
 
             var contentString = "<b>" + cols[0] + "</b><br>";
             for (j = 1; j < cols.length; j++) {
                 if (cols[j] != "NA" && cols[j] != "na")
                     contentString = contentString + headers[j] + ":" + cols[j] + "<br>";
             }
 
             console.log(cols[2])
             switch (cols[2]) {
                 case "water":
                     color = "80D0FF"
                     break;
                 case "soil":
                     color = "D0B060"
                     break;
                 default:
                     color = "E0E0E0"
             }
 
             markers.push([cols[0], lat, lon, color])
             infoWindowContent.push(contentString);
         }
 
         var infoWindow = new google.maps.InfoWindow(), marker, i;
 
         for (i = 0; i < markers.length; i++) {
             var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(markers[i][1], markers[i][2]),
                 map: map,
                 title: markers[i][0],
                 icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + markers[i][3], new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34))
             });
             google.maps.event.addListener(marker, 'click', (function (marker, i) {
                 return function () {
                     infoWindow.setContent(infoWindowContent[i]);
                     infoWindow.open(map, marker);
                 }
             })(marker, i));
         }
 
     }); */

}

google.maps.event.addDomListener(window, 'load', initialize);


/* function getFileFromServer(url, doneCallback) {
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", url, true);
    xhr.send();

    function handleStateChange() {
        if (xhr.readyState === 4) {
            doneCallback(xhr.status == 200 ? xhr.responseText : null);
        }
    }
} */