function solve() {
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    const infoBox = document.querySelector('.info');
    let stop = {
        next: 'depot'
    }

    async function depart() {
        try {
            const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;

            const res = await fetch(url);
            const data = await res.json()
            stop = data;

            infoBox.textContent = `Next stop ${data.name}`;

            arriveBtn.disabled = false;
            departBtn.disabled = true;
        } catch (err) {
            infoBox.textContent = 'Error'
            console.log(err);
        }
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${stop.name}`;

        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();