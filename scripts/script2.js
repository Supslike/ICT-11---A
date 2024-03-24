// keep ID In the local storage
const FORM = document.getElementById("login-form")
var STUDENT = {
    id: "",
    password: ""
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const SURVEY_FORMAT = [`<h2 class="reveal">Student Name: </h2>
<select name="student-list" id="student-list" required>
    <option value="" disabled selected hidden>Choose Your Name!</option>
    <option value="JOHN_KEVIN_ABARQUEZ">John Kevin Abarquez</option>
    <option value="JOHN_DAVID_ANSIGBAT">John David Ansigbat</option>
    <option value="JOHNMARK_AYUBAN">John Mark Ayuban</option>
    <option value="JAIRUS_BACUD">Jairus Bacud</option>
    <option value="ALGHER_DRAKE_BADIOLA">Algher Drake Badiola</option>
    <option value="KRIS_EZEKIEL_BALLO-ALLO">Kris Ezekiel Ballo-Allo</option>
    <option value="CHESTER_HAN_BASTO">Chester Han Basto</option>
    <option value="MARK_LOUIE_CABALLERO">Mark Louie Caballero</option>
    <option value="JUSTINE_DOMDOM">Justine Domdom</option>
    <option value="MARK_GLORY">Mark Glory</option>
    <option value="CYRUS_MATTHEW_KATLY">Cyrus Matthew Katly</option>
    <option value="CHRISTIAN_LAAD">Christian Laad</option>
    <option value="JOHNKRIS_LAGERA">Johnkris Lagera</option>
    <option value="ANGELO_LAGUTANG">Angelo Lagutang</option>
    <option value="ROBEN_LANIOG">Roben Laniong</option>
    <option value="RHOJOHN_MEDINA">Rhojohn Medina</option>
    <option value="RENZMEL_MONIS">Renzmel Monis</option>
    <option value="MARK_JOSEPH_OGAMA">Mark Joseph Ogama</option>
    <option value="JAMES_OLAYBAL">James Olaybal</option>
    <option value="RAINIER_PADILLA">Rainier Padilla</option>
    <option value="LARRY_JAY_PAGULAYAN">Larry Jay Pagulayan</option>
    <option value="JOHN_NATHANIEL_QUINTO">John Nathaniel Quinto</option>
    <option value="RODANIEL_RUBONAL">Rodaniel Rubonal</option>
    <option value="IVERSON_SANTOS">Iverson Santos</option>
    <option value="JOEMIL_TAMONAN">Joemil Tamonan</option>
    <option value="ANTONIO_TANTIADO">Antonio Tantiado</option>
    <option value="VONJO_MARC_TINGSON">Vonjo Marc Tingson</option>
    <option value="REILAN_DATON">Reilan Daton</option>
    <option value="NATHALIE_BALIDOY">Nathalie Balidoy</option>
    <option value="SHANA_MAE_BUENCONSEJO">Shana Mae Buenconsejo</option>
    <option value="MICA_BUNAG">Mica Bunag</option>
    <option value="MIKAELLA_CARBONELL">Mikaela Carbonell</option>
    <option value="MARVILYN_FRIAS">Marvilyn Frias</option>
    <option value="CHENEY_HAZEL_GANO">Cheney Hazel Gano</option>
    <option value="FREDHELYN_LAYDEROS">Fredhelyn Layderos</option>
    <option value="ROSE_ANN_MARA-MARA">Rose Ann Mara-Mara</option>
    <option value="ISABELA_MIRANDA">Isabela Miranda</option>
    <option value="TRACEY_NICOLE_MONTES">Tracey Nicole Montes</option>
    <option value="MARY_JHANE_OLANO">Mary Jhane Olano</option>
    <option value="SHYRENE_MAEZELLE_PAUNE">Shyrene Maezelle Paune</option>
    <option value="ASHLYN_MAE_SARU">Ashlyn Mae Saru</option>
    <option value="SHEENA_MAY_TALABOC">Sheena May Talaboc</option>
    <option value="CHERELYN_CENTILLAS">Cherelyn Centillas</option>
</select>
<button id="submit-button"></button>` , `<h2 class="reveal">Password: </h2>
<input type="text" id="password">
<button id="submit-button"></button>`]

function push_item(name, obj) {
    localStorage.setItem(name, JSON.stringify(obj))
}

function retrieve_item(name) {
    return JSON.parse(localStorage.getItem(name))
}

function load_form(idx) {
    FORM.innerHTML = SURVEY_FORMAT[idx]
    let button = document.getElementById("submit-button")
    if (idx == 0) {
        button.addEventListener("click", function() {
            const name = document.getElementById("student-list").value;
            STUDENT.id = name
            load_form(1)
            FORM.classList = "reveal2"
        })
    }
    else {
        button.addEventListener("click", async function(event) {
            event.preventDefault();
            let cur_pass = document.getElementById("password")
            let data = { id: STUDENT.id, password: cur_pass.value };
            console.log(`USER INPUT: \n${data.id} - ${data.password}`)
            try {
                button.disabled = true
                cur_pass.disabled = true
                const response = await fetch(API_ROOT + `login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    throw new Error('Network response FAILED');
                }

                let server_response = await response.text()
                console.log(`RESPONSE FROM SEVER: ${server_response}`)
                if (server_response != "false") {
                    FORM.classList = "reveal2 correctpass"
                    cur_pass.value = "Logging you in..."
                    push_item("STUDENT_PFP", API_ROOT + `pfp?id=${data.id}&password=${data.password}`)
                    push_item("STUDENT_ID", data.id)
                    push_item("STUDENT_PASSWORD", data.password)
                    push_item("STUDENT_PARAMS", `?id=${data.id}&password=${data.password}`)
                    window.location.href = "home.html"
                }
                else {
                    FORM.classList = "reveal2 wrongpass"
                    cur_pass.value = "WRONG PASSWORD!"
                    button.disabled = true
                    cur_pass.disabled = true
                    await sleep(500)
                    FORM.classList = "reveal2"
                    cur_pass.value = data.password
                    button.disabled = false
                    cur_pass.disabled = false
                }
            } catch (error) {
                button.disabled = false
                cur_pass.disabled = false
                console.error('There was a problem with the request:', error);
            }
        });
    }
    
}

load_form(0)