function push_item(name, obj) {
    localStorage.setItem(name, JSON.stringify(obj))
}

function retrieve_item(name) {
    return JSON.parse(localStorage.getItem(name))
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

try {
    var STUDENT_ID = retrieve_item("STUDENT_ID")
    console.log("CURRENTLY LOGGED IN: " + STUDENT_ID)
}

catch {
    console.log("ERROR STUDENT ID")
    window.location.href = "index.html"
}

if (STUDENT_ID == "") {
    console.log("EMPTY STUDENT ID")
    window.location.href = "index.html"
}

function VALIDITY_ERROR() {
    console.log("VALIDITY ERROR DETECTED")
    push_item("STUDENT_PFP", "")
    push_item("STUDENT_ID", "")
    push_item("STUDENT_PASSWORD", "")
    push_item("STUDENT_PARAMS", "")
    window.location.href = "index.html"
}

if (`?id=${retrieve_item("STUDENT_ID")}&password=${retrieve_item("STUDENT_PASSWORD")}` != retrieve_item("STUDENT_PARAMS")) {
    console.log("PARAMS NOT EQUAL")
    VALIDITY_ERROR()
}

var password = retrieve_item("STUDENT_PASSWORD")

var ASSIGNMENTS;

const PROFILE_ELEMENT = document.getElementById("profile")
const USERNAME_ELEMENT = document.getElementById("username")
const DESCRIPTION_ELEMENT = document.getElementById("sidebar")
const MAIN_CONTAINER = document.getElementById("todo-list")
const ROBOTO = document.getElementById("roboto-msg")

const DUE_BTN = document.getElementById("due")
const ALL_BTN = document.getElementById("all")
const SUBJECT_BTN = document.getElementById("subject")

const monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var USER_STATUS;
var USERNAME_NAME;

var DUE = 0;
var WORKLOAD = 0;
var DONE = 0;
var TOM = 0;


var TALKING = false
PROFILE_ELEMENT.src = retrieve_item("STUDENT_PFP")
document.getElementById('favicon').href = retrieve_item("STUDENT_PFP");

var ABBREV = {"COMPROG": "COMPUTER PROGRAMMING", "PR": "PRACTICAL RESEARCH", "STATS": "STATISTICS", "ENTREP": "ENTREPRENEURSHIP", "R&W": "READING AND WRITING", "PE": "PHYSICAL EDUCATION", "PPTTP": "PPTTP", "MIL": "MEDIA AND INFORMATION LITERACY", "PHYSCI": "PHYSICAL SCIENCE"}

async function talk(msg) {
    if (!TALKING) {
        TALKING = true
        ROBOTO.textContent = ""
        for (let k = 0; k < msg.length; k++) {
            for (let i = 0; i < msg[k].length; i++) {
                ROBOTO.textContent += msg[k].charAt(i)
                await sleep(20)
            }
            ROBOTO.textContent += " "
            await sleep(1000)
        }
        await sleep(5000)
        for (let i = 0; i < ROBOTO.textContent.length - 1; i++) {
            ROBOTO.textContent = ROBOTO.textContent.slice(0, -1)
            await sleep(20)
        }
        ROBOTO.textContent = "."
        let ellip = "......."
        for (let i = 0; i < ellip.length - 1; i++) {
            ROBOTO.textContent += ellip.charAt(i)
            await sleep(500)
        }
    }

    else {
        return
    }

    TALKING = false
}

function getGreeting() {
    const now = new Date();
    const localHour = now.getUTCHours() + 8;
    const hour = (localHour >= 24) ? localHour - 24 : localHour;
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
    } else if (hour >= 17 && hour < 24) {
        greeting = "Good evening";
    } else {
        greeting = "Good mornight";
    }

    return greeting;
}

console.log(getGreeting());


function checkDateStatus(dateObj) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var compareDate = new Date(dateObj);
    compareDate.setHours(0, 0, 0, 0);

    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (compareDate.getTime() === today.getTime()) {
        return "TODAY";
    } else if (compareDate.getTime() === tomorrow.getTime()) {
        return "TOMORROW";
    } else if (compareDate < today) {
        return "PASSED";
    } else {
        return "";
    }
}

function removeValueFromArray(array, valueToRemove) {
    var index = array.indexOf(valueToRemove);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}

function generate_assignment(obj_list, subject, contentloaded = false) {
    let due_date = obj_list["due"];
    let date_obj = new Date(due_date[0], due_date[1] - 1, due_date[2], due_date[3], due_date[4], due_date[5]);
    let formattedDate = dayNames[date_obj.getDay()] + ", " + monthNames[date_obj.getMonth()] + " " + date_obj.getDate() + ", " + date_obj.getFullYear();
    let checked = '';
    let status_msg = ""
    let due_status = checkDateStatus(date_obj)
    if (due_status != "") {
        status_msg = `(${due_status})`
    }
    if (USER_STATUS.includes(String(obj_list["id"]))) {
        checked = "checked";
        if (contentloaded){
            DONE++
            WORKLOAD--;
            if (due_status == "TOMORROW") {
                TOM--
            }

            else if (due_status == "TODAY") {
                DUE--
            }
        }
    }
    
    let ASSIGNMENT_FORMAT = `
                <input type="checkbox" class="INPUT_USER ${due_status}" id="${obj_list["id"]}" ${checked}>
                <label for="${obj_list["id"]}">&nbsp${ABBREV[subject]}&nbsp</label>
                <h6>“${obj_list['name']}”</h6>
                <p>${obj_list["description"]}</p>
                <p class="due_date">${formattedDate} ${status_msg}</p>
        `;
    let container = document.createElement("div");
    container.classList = "assignment"
    container.innerHTML = ASSIGNMENT_FORMAT
    MAIN_CONTAINER.appendChild(container)
    document.getElementById(`${obj_list["id"]}`).addEventListener("change", async function(event) {
        const checkbox = event.target;
        const id = checkbox.id;
        const class_name = checkbox.classList[1]
        let input_elements = document.querySelectorAll(".INPUT_USER")
        for (let i = 0; i < input_elements.length; i++) {
            input_elements[i].disabled = true
        }
        if (checkbox.checked) { 
            USER_STATUS.push(id);
            if (class_name == "TODAY") {
                DUE--
                if (DUE == 0) {
                    talk(["LEZZ GET IT 😎😎,", "No more works due today!! "])
                }
            }
            else if (class_name == "TOMORROW") {
                TOM--
                if (TOM == 0) {
                    talk(["NO MORE DUE TOMORROW!", "LET'S CHILL 🍷😎"])
                }
            }
            DONE++
            WORKLOAD--
        } else {
            USER_STATUS = removeValueFromArray(USER_STATUS, String(id))
            if (class_name == "TODAY") {
                DUE++
            }
            else if (class_name == "TOMORROW") {
                TOM++
            }
            DONE--
            WORKLOAD++
        }
        
        if (WORKLOAD == 0) {
            talk(["WOW!", "You're DONE.", "Take a good rest " + USERNAME_NAME + "! 😌☺️"])
        }

        let data = { id: STUDENT_ID, data: USER_STATUS };
        const response = await fetch(API_ROOT + "status" + retrieve_item("STUDENT_PARAMS"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (await response.text() == "VALIDITY_ERROR") {
            VALIDITY_ERROR()
            return
        }
        DESCRIPTION_ELEMENT.innerHTML = `<span class="material-symbols-outlined" style="color: red;">description</span><b>${DUE}</b> works due today, <b>${TOM}</b> due tomorrow! <br> <br><span class="material-symbols-outlined" style="color: orange;">Newspaper</span><b>${WORKLOAD}</b> assigned task! <br> <br> <span class="material-symbols-outlined" style="color: green;">check</span><b>${DONE}</b> finished tasks!`;
        await sleep(100)
        for (let i = 0; i < input_elements.length; i++) {
            input_elements[i].disabled = false
        }
    });
    DESCRIPTION_ELEMENT.innerHTML = `<span class="material-symbols-outlined" style="color: red;">description</span><b>${DUE}</b> works due today, <b>${TOM}</b> due tomorrow! <br> <br><span class="material-symbols-outlined" style="color: orange;">Newspaper</span><b>${WORKLOAD}</b> assigned task! <br> <br> <span class="material-symbols-outlined" style="color: green;">check</span><b>${DONE}</b> finished tasks!`;
    
    if (due_status == "TODAY") {
        return 0
    }

    else if (due_status == "TOMORROW") {
        return 1
    }

    else if (due_status == "") {
        return 2
    }

    else {
        return 3
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    if (isNaN(ASSIGNMENTS)) {
        ASSIGNMENTS = await LoadAssignments()
    }

    try {
        const response = await fetch(API_ROOT + "profile" + retrieve_item("STUDENT_PARAMS"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Network response FAILED');
        }

        let server_response = JSON.parse(await response.text())
        console.log(`RESPONSE FROM SEVER:` )
        console.log(server_response)
        if (server_response == "VALIDITY_ERROR") {
            VALIDITY_ERROR()
            return
        }
        USER_STATUS = server_response["status"]
        var USERNAME = server_response["user"]["username"]
        var FULLNAME = server_response["user"]["full_name"]
        MAIN_CONTAINER.innerHTML = ""
        USERNAME_ELEMENT.innerHTML = `Hello, <a style="opacity: 0.7; font-size: 10px; margin-left: 40px;" id="last_update"></a> <h2>${USERNAME} 🎉</h2>`;
        for (let i = 0; i < ASSIGNMENTS["all"].length; i++) {
            let res = generate_assignment(ASSIGNMENTS["all"][i], ASSIGNMENTS["all"][i]["subject"], true)
            if (res == 0) {
                DUE++
            }
            else if (res == 1) {
                TOM++
            }

            WORKLOAD++            
        }
        DESCRIPTION_ELEMENT.innerHTML = `<span class="material-symbols-outlined" style="color: red;">description</span><b>${DUE}</b> works due today, <b>${TOM}</b> due tomorrow! <br> <br><span class="material-symbols-outlined" style="color: orange;">Newspaper</span><b>${WORKLOAD}</b> assigned task! <br> <br> <span class="material-symbols-outlined" style="color: green;">check</span><b>${DONE}</b> finished tasks!`;
    } catch (error) {
        console.error('There was a problem with the request:', error);
    }
    USERNAME_NAME = USERNAME
    talk([`${getGreeting()} ${USERNAME}! ☺️`])
});

ALL_BTN.addEventListener("click", function() {
    MAIN_CONTAINER.innerHTML = ""
    for (let i = 0; i < ASSIGNMENTS["all"].length; i++) {
        generate_assignment(ASSIGNMENTS["all"][i], ASSIGNMENTS["all"][i]["subject"])
    }
    SUBJECT_BTN.value = ""
})

SUBJECT_BTN.addEventListener("input", function() {
    MAIN_CONTAINER.innerHTML = "";
    if (SUBJECT_BTN.value == "") {
        let subjects = ["COMPROG", "PR", "STATS", "ENTREP", "R&W", "PE", "PPTTP", "MIL", "PHYSCI"]
        for (let i = 0; i < subjects.length; i++) {
            for (let j = 0; j < ASSIGNMENTS[subjects[i]].length; j++) {
                generate_assignment(ASSIGNMENTS[subjects[i]][j], subjects[i])
            }
        }
        return
    }
    for (let i = 0; i < ASSIGNMENTS[SUBJECT_BTN.value].length; i++) {
        generate_assignment(ASSIGNMENTS[SUBJECT_BTN.value][i], SUBJECT_BTN.value)
    }
})

DUE_BTN.addEventListener("click", function() {
    MAIN_CONTAINER.innerHTML = "";
    SUBJECT_BTN.value = ""
    let tom = ASSIGNMENTS["due"]["Tomorrow"]
    let passed = ASSIGNMENTS["due"]["Passed"]
    let today = ASSIGNMENTS["due"]["Today"]
    for (let i = 0; i < today.length; i++) {
        generate_assignment(today[i], today[i]["subject"])
    }

    for (let i = 0; i < tom.length; i++) {
        generate_assignment(tom[i], tom[i]["subject"])
    }

    for (let i = 0; i < passed.length; i++) {
        generate_assignment(passed[i], passed[i]["subject"])
    }
})



document.getElementById('fileInput').addEventListener('change', async function() {
    await uploadFile();
})

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        console.error("No file selected.");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append("id", STUDENT_ID)

    const response = await fetch(API_ROOT + "change_pfp" + retrieve_item("STUDENT_PARAMS"), {
        method: 'POST',
        body: formData
    })

    if (await response.text() == "VALIDITY_ERROR") {
        VALIDITY_ERROR()
        return
    }

    PROFILE_ELEMENT.src = retrieve_item("STUDENT_PFP") + 123
    PROFILE_ELEMENT.src = retrieve_item("STUDENT_PFP")
}