const stopName = document.querySelector('#stopName');
const ulElBuses = document.querySelector('#buses');

async function getInfo() {
    const stopId = document.querySelector('#stopId').value
    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + stopId;
    try {
        ulElBuses.innerHTML = '';
        let res = await fetch(url);
        let data = await res.json();
        displayBusStop(data.name)
        displayBuses(data.buses)
    } catch (error) {
        stopName.textContent = 'Error'
    }
}

function displayBusStop(name) {
    stopName.textContent = name;
}

function displayBuses(busObj) {
    Object.entries(busObj).map(([bus, time]) => {
        const liEl = document.createElement('li');
        liEl.textContent = `Bus ${bus} arrives in ${time}`;
        ulElBuses.appendChild(liEl);
    })
}