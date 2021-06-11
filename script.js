let newAddButton = document.getElementById('newAddButton');
let modal = document.getElementById('modal');
let modalClose = document.getElementById('modalClose');
let modalBackdrop = document.getElementById('modalBackdrop');
let mymap = L.map('mapid').setView([39.65667241669658, 27.88940861500076], 15);
let modalMap = L.map('modalMap').setView([39.65667241669658, 27.88940861500076], 15);
let formSelect = document.getElementById('formSelect');
let modalInputName = document.getElementById('modalInputName');
let modalInputAdress = document.getElementById('modalInputAdress');
let form = document.getElementById('newAddForm');
let table = document.getElementById('table');
let deleteAllButton = document.getElementById('deleteAllButton');
let summary = document.getElementById('summary');
let x = document.getElementById('x');

let lat = 0, long = 0;
let markers = [];
let updateIndex = -1;
let trNumber = 0;

let selectedIcons = 'images/marker.png';

let markerIcon = L.icon({
    iconUrl: 'images/marker.png',
    iconSize: [44, 44], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let array = [
    {
        name: 'toplanma alanı 1',
        address: 'bahçelievler',
        lat: 39.66614297229724,
        lng: 27.90923458832997,
        iconPath: 'images/marker.png'
    },
    {
        name: 'toplanma alanı 2',
        address: 'paşaalanı',
        lat: 39.66720009186223,
        lng: 27.923739974682896,
        iconPath: 'images/marker.png'
    },
    {
        name: 'toplanma alanı 3',
        address: 'toygar',
        lat: 39.661253583930495,
        lng: 27.911165778820745,
        iconPath: 'images/marker.png'
    }
];

newAddButton.addEventListener('click', function () {
    openModal();
    lat = 0;
    long = 0;
    updateIndex = -1;

});

modalClose.addEventListener('click', function () {
    closeModal();
});

function closeModal() {
    modal.style.visibility = 'hidden';
    modalBackdrop.style.display = 'none';
}

function openModal() {
    modal.style.visibility = 'visible';
    modalBackdrop.style.display = 'block';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let modalName = modalInputName.value;
    let modalAdress = modalInputAdress.value;

    console.log(updateIndex);

    if (modalName.length <= 0 || modalAdress.length <= 0) {
        alert('tüm alanları doldurun');
    } else if (lat <= 0 || long <= 0) {
        alert('lütfen haritan konum seçiniz');
    } else {
        if (updateIndex > -1) {
            let updateItem = array[updateIndex];
            updateItem.name = modalName;
            updateItem.address = modalAdress;
            updateItem.lng = long;
            updateItem.lat = lat;
            updateItem.iconPath = selectedIcons;
        } else {
            let newlist = {
                name: modalName,
                address: modalAdress,
                lat: lat,
                lng: long,
                iconPath: selectedIcons
            }

            array.push(newlist);

            //let markerNew = L.marker([lat, long],{icon:markerIcon}).addTo(mymap);
            //markers.push(markerNew);
            //markerNew.bindPopup("<b>" + modalName + "  </b><br> " + modalAdress).openPopup();
            //modalMap.removeLayer(modalMapMarker);
        }

        form.reset();
        closeModal();
        print();
    }
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmF0aWgtZGlqaXRhbGFkYW0iLCJhIjoiY2ttZXZ3ODVxMDQzNzJuczAzY21jenc3eSJ9.vTsg8ZJUUe9pAXqLdrSfNw'
}).addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmF0aWgtZGlqaXRhbGFkYW0iLCJhIjoiY2ttZXZ3ODVxMDQzNzJuczAzY21jenc3eSJ9.vTsg8ZJUUe9pAXqLdrSfNw'
}).addTo(modalMap);

/*var HomeIcon = L.icon({
    iconUrl: 'images/markerhome.png',

    iconSize: [44, 44], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var OfficeIcon = L.icon({
    iconUrl: 'images/markeroffice.png',

    iconSize: [44, 44], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let markerHome = L.marker([39.63670975399338, 27.8864073883393], {icon: HomeIcon}).addTo(mymap);
let markerOffice = L.marker([39.66776855196624, 27.922336367114216], {icon: OfficeIcon}).addTo(mymap);

markerHome.bindPopup("<b>Hello</b><br>My home.").openPopup();
markerOffice.bindPopup("<b>Hello</b><br>My office.").openPopup();*/


let modalMapMarker;

function onMapClick(e) {
    if (typeof modalMapMarker != 'undefined') {
        modalMap.removeLayer(modalMapMarker);
    }

    console.log(e);

    modalMapMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: markerIcon}).addTo(modalMap);

    lat = e.latlng.lat;
    long = e.latlng.lng;
}

modalMap.on('click', onMapClick);

function print() {
    table.innerHTML = '';
    array.forEach(function (item, i) {
        let tr = document.createElement('tr');
        let tableName = document.createElement('td');
        let tableAddress = document.createElement('td');
        let btnDelete = document.createElement('button');
        let btnUpdate = document.createElement('button');

        tableName.innerHTML = item.name;
        tableAddress.innerHTML = item.address;

        btnDelete.innerHTML = 'DELETE';
        btnUpdate.innerHTML = 'UPDATE';

        tr.appendChild(tableName);
        tr.appendChild(tableAddress);
        tr.appendChild(btnDelete);
        tr.appendChild(btnUpdate);
        table.appendChild(tr);



        let itemIcon = L.icon({
            iconUrl: item.iconPath,
            iconSize: [44, 44], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        let marker = L.marker([item.lat, item.lng], {icon: itemIcon}).addTo(mymap);

        markers.push(marker);
        tr.dataset.target = i;

        tr.addEventListener('click', function () {
            let selectedIndexTr = this.dataset.target;

            if(array[selectedIndexTr])
                mymap.flyTo([array[selectedIndexTr].lat, array[selectedIndexTr].lng], 17);
        });

        btnDelete.dataset.target = i;
        btnDelete.addEventListener('click', function () {
            let selectedIndex = this.dataset.target;
            //delete array[selectedIndex];
            array.splice(selectedIndex, 1);

            console.log(array.length)

            markers.forEach(function (item, i) {
                mymap.removeLayer(item);
            });

            print();
        });

        btnUpdate.dataset.target = i;
        btnUpdate.addEventListener('click', function () {
            let selectedIndexUpdate = this.dataset.target;
            openModal();
            modalInputName.value = array[selectedIndexUpdate].name;
            modalInputAdress.innerHTML = array[selectedIndexUpdate].address;

            if (typeof modalMapMarker != 'undefined') {
                modalMap.removeLayer(modalMapMarker);
            }

            long = array[selectedIndexUpdate].lng;
            lat = array[selectedIndexUpdate].lat;

            modalMapMarker = L.marker([array[selectedIndexUpdate].lat, array[selectedIndexUpdate].lng], {icon: markerIcon}).addTo(modalMap);

            updateIndex = selectedIndexUpdate;

            markers.forEach(function (item, i) {
                mymap.removeLayer(item);
            });
        });

    });

    summary.innerHTML = array.length;

    //console.log(array.length);
}

formSelect.addEventListener('change', function () {

    selectedIcons = formSelect.value;

    markerIcon = L.icon({
        iconUrl: selectedIcons,

        iconSize: [44, 44], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    if (typeof modalMapMarker != 'undefined') {
        modalMap.removeLayer(modalMapMarker);
    }

    modalMapMarker = L.marker([lat, long], {icon: markerIcon}).addTo(modalMap);

    //markerIcon = customIcon;

});
deleteAllButton.addEventListener('click', function () {
    markers.forEach(function (item, i) {
        mymap.removeLayer(item);
    });
    markers = [];

    table.innerHTML = '';
    array = [];
    summary.innerHTML = 0;
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

}
function showPosition(position) {

    let circle = L.circle([position.coords.latitude , position.coords.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
    }).addTo(mymap);
    mymap.flyTo([position.coords.latitude, position.coords.longitude], 16);
}



getLocation();
print();