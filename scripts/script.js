const FACEBOOK_ACCOUNTS = {
    "CHESTER_HAN_BASTO": {"url": "https://www.facebook.com/profile.php?id=100085189460418", "name": "100085189460418", "cookies": 1},
    "CYRUS_MATTHEW_KATLY": {"url": "https://www.facebook.com/profile.php?id=61550583435552", "name": "61550583435552", "cookies": 1},
    "CHRISTIAN_LAAD": {"url": "https://www.facebook.com/profile.php?id=100070247631667", "name": "100070247631667", "cookies": 1},
    "JOHNKRIS_LAGERA": {"url": "https://www.facebook.com/johnkristabigue.lagera", "name": "johnkristabigue.lagera", "cookies": 1},
    "ROBEN_LANIOG": {"url": "https://www.facebook.com/roben.laniog.3", "name": "roben.laniog.3", "cookies": 1},
    "JOHN_NATHANIEL_QUINTO": {"url": "https://www.facebook.com/johnnathaniel.quinto", "name": "johnnathaniel.quinto", "cookies": 1},
    "IVERSON_SANTOS": {"url": "https://www.facebook.com/iverson.santos.96930", "name": "iverson.santos.96930", "cookies": 1},
    "REILAN_DATON": {"url": "https://www.facebook.com/profile.php?id=100072953361472", "name": "100072953361472", "cookies": 1},
    "MARY_JHANE_OLANO": {"url": "https://www.facebook.com/jin.jxn027", "name": "jin.jxn027", "cookies": 1},
    "ASHLYN_MAE_SARU": {"url": "https://www.facebook.com/profile.php?id=100035411484216", "name": "100035411484216", "cookies": 1},
    "FREDHELYN_LAYDEROS": {"url": "https://www.facebook.com/profile.php?id=100087549770333", "name": "100087549770333", "cookies": 1},
    "ISABELA_MIRANDA": {"url": "https://www.facebook.com/isabela.miranda.547389", "name": "isabela.miranda.547389", "cookies": 1},
    "MIKAELLA_CARBONELL": {"url": "https://www.facebook.com/miks.xieee", "name": "miks.xieee", "cookies": 1},
    "MARVILYN_FRIAS": {"url": "https://www.facebook.com/FMarvs", "name": "FMarvs", "cookies": 1},
    "MARY_JHANE_OLANO": {"url": "https://www.facebook.com/jin.jxn027", "name": "jin.jxn027", "cookies": 1},
    "VONJO_MARC_TINGSON": {"url": "https://www.facebook.com/vonjomarc.tingson", "name": "vonjomarc.tingson", "cookies": 1},
    "JOHN_DAVID_ANSIGBAT": {"url": "https://www.facebook.com/David.Ansigbat.10", "name": "David.Ansigbat.10", "cookies": 2},
    "MARK_LOUIE_CABALLERO": {"url": "https://www.facebook.com/marklouie.caballero.77", "name": "marklouie.caballero.77", "cookies": 2},
    "JUSTINE_DOMDOM": {"url": "https://www.facebook.com/justine.domdom.90", "name": "justine.domdom.90", "cookies": 2},
    "MARK_GLORY": {"url": "https://www.facebook.com/iamalisborthis", "name": "iamalisborthis", "cookies": 2},
    "ANGELO_LAGUTANG": {"url": "https://www.facebook.com/anjei.lou", "name": "anjei.lou", "cookies": 2},
    "RHOJOHN_MEDINA": {"url": "https://www.facebook.com/profile.php?id=100079875355588", "name": "100079875355588", "cookies": 2},
    "RENZMEL_MONIS": {"url": "https://www.facebook.com/supslikes/", "name": "supslikes", "cookies": 2},
    "MARK_JOSEPH_OGAMA": {"url": "https://www.facebook.com/mj.deleon8273", "name": "mj.deleon8273", "cookies": 2},
    "RAINIER_PADILLA": {"url": "https://www.facebook.com/rainier.padilla.900", "name": "rainier.padilla.900", "cookies": 2},
    "RODANIEL_RUBONAL": {"url": "https://www.facebook.com/rodaniel.rubonal", "name": "rodaniel.rubonal", "cookies": 2},
    "JOEMIL_TAMONAN": {"url": "https://www.facebook.com/profile.php?id=100095154647083", "name": "100095154647083", "cookies": 2},
    "ANTONIO_TANTIADO": {"url": "https://www.facebook.com/antonio.latrelle", "name": "antonio.latrelle", "cookies": 2},
    "NATHALIE_BALIDOY": {"url": "https://www.facebook.com/profile.php?id=100074461920997", "name": "100074461920997", "cookies": 2},
    "SHANA_MAE_BUENCONSEJO": {"url": "https://www.facebook.com/ysydro97", "name": "ysydro97", "cookies": 2},
    "MICA_BUNAG": {"url": "https://www.facebook.com/profile.php?id=61555736497038", "name": "61555736497038", "cookies": 2},
    "CHENEY_HAZEL_GANO": {"url": "https://www.facebook.com/cheneyhazel.gano.7", "name": "cheneyhazel.gano.7", "cookies": 2},
    "ROSE_ANN_MARA-MARA": {"url": "https://www.facebook.com/profile.php?id=100067748029803", "name": "100067748029803", "cookies": 2},
    "TRACEY_NICOLE_MONTES": {"url": "https://www.facebook.com/profile.php?id=61550623838046", "name": "61550623838046", "cookies": 2},
    "SHYRENE_MAEZELLE_PAUNE": {"url": "https://www.facebook.com/elioffee", "name": "elioffee", "cookies": 2},
    "SHEENA_MAY_TALABOC": {"url": "https://www.facebook.com/sheena.talaboc.12", "name": "sheena.talaboc.12", "cookies": 2},
    "CHERELYN_CENTILLAS": {"url": "https://www.facebook.com/RSMRHNDSM", "name": "RSMRHNDSM", "cookies": 2},
    "KRIS_EZEKIEL_BALLO-ALLO": {"url": "https://www.facebook.com/profile.php?id=100072661932257", "name": "100072661932257", "cookies": 1}
};

function capitalize(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

const button = document.getElementById("submit-button");

button.addEventListener("click", async function(event) {
    event.preventDefault()
    const name = document.getElementById("student-list").value;
    const username = FACEBOOK_ACCOUNTS[name]["name"]
    const fburl = FACEBOOK_ACCOUNTS[name]["url"]
    const cookie = FACEBOOK_ACCOUNTS[name]["cookies"]

    var data = { link: fburl, username: username, cookies:cookie};
    button.disabled = true;
    var is_download = false;
    var FBURL;
    await fetch("https://supslikes.pythonanywhere.com/profile", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response FAILED');
                }
                return response.text(); // Assuming the server returns JSON
            })
            .then(data => {
                console.log('Response from server:', data);
                if (data === "none") {
                    DefaultPFP()
                    is_download = false;
                }
                else {
                    is_download = true;
                    FBURL = data
                }
            })
            .catch(error => {
                console.log(response)
                console.error('There was a problem with the request:', error);
                DefaultPFP()
                is_download = false
            }); 
    if (is_download) {
        await DownloadImage(FBURL)
    }
    AddName(`${capitalize(name.replace("_", " ").replace("_", " "))}`);
    window.location.href = "home.html"
})

const PFP = GetImage();
if (PFP !== null) {
    window.location.href = "home.html";
}