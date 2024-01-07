export default function loadData(setDataCallback) {
    // fetch('https://isod.ee.pw.edu.pl/isod-portal/wapi?q=dissertations_offers&maxrows=500&format=json')
    fetch('https://isod.ee.pw.edu.pl/isod-portal/wapi?q=dissertations_offers&maxrows=1000000000&format=json')
        .then(response => response.json())
        .then(resp => resp.list.map(el => ({
            id: el.id,
            title: el.title,
            owner: el.supervisor_title + " " + el.supervisor_firstname + " " + el.supervisor_lastname,
            unit: el.mainOrgUnit + " " + el.subOrgUnit
        })))
        .then(resp=>({resp: resp, date: Date.now()}))
        .then(setDataCallback);
}

export function filter(data, org, owner) {
    org = org.toUpperCase();
    owner = owner.toUpperCase();
    let vd = data.filter((el) => {
        let isOk = true;
        if (isnb(org)){
            isOk = el.unit.toUpperCase().includes(org);
        }
        if (isOk && isnb(owner)){
            isOk = el.owner.toUpperCase().includes(owner);
        }
        return isOk;
    });
    return vd;
}

function isnb(val) {
    return val != null && val !== "";
}

