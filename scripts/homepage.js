const PFP = GetImage()
if (PFP === null) {
    window.location.href = "index.html";
}
document.getElementById("website-ico").href = PFP

const list_container = document.getElementById("todo-list")
const categories = document.querySelectorAll(".sub-holder")

let TEMP_WORKLOAD = 0;
let TEMP_DUE = 0;
let TEMP_DONE = 0;
let TEMP_TOM = 0

let ASSIGNMENT;
let ID_ASS;

let WORKLOAD = 0;
let DUE = 0;
let DONE = 0;
let TOM = 0;

let MAX_WORKLOAD = 0;
let MAX_DUE = 0;
let MAX_DONE = 0;
let MAX_TOM = 0;

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

document.getElementById("profile").src = PFP;
document.getElementById("username").innerHTML = `Hello, <a style="opacity: 0.7; font-size: 10px; margin-left: 40px;" id="last_update"></a> <h2>${localStorage.getItem("ICT_NAME")}!</h2>`;
document.getElementById("last_update").textContent = `Last Updated: ${JSON.parse(localStorage.getItem("ICT_UPDATE"))}`;
document.getElementById("description").innerHTML = `<span class="material-symbols-outlined" style="color: red;">description</span><b>${DUE}</b> works due today, <b>${TOM}</b> due tomorrow! <br> <br><span class="material-symbols-outlined" style="color: orange;">Newspaper</span><b>${WORKLOAD}</b> assigned task! <br> <br> <span class="material-symbols-outlined" style="color: green;">check</span><b>${DONE}</b> finished tasks!`;
document.getElementById("o").addEventListener("click", function() {
    localStorage.removeItem("ICT_PFP");
    localStorage.removeItem("ICT_NAME");
    window.location.href = "index.html"
})

function UpdateStats() {
            TEMP_DONE = 0
            TEMP_DUE = 0
            TEMP_WORKLOAD = 0
            TEMP_TOM = 0
            let checked_data = JSON.parse(localStorage.getItem("ICT_INPUTS"))
            for (let i = 0; i < checked_data.length; i++) {
                TEMP_DONE += 1
                if (checked_data[i].includes("due")) {
                    TEMP_DUE += 1
                }

                else if (checked_data[i].includes("tom")) {
                    TEMP_TOM += 1
                }
                TEMP_WORKLOAD += 1
            }
            DONE = MAX_DONE + TEMP_DONE;
            WORKLOAD = MAX_WORKLOAD - TEMP_WORKLOAD
            DUE = MAX_DUE - TEMP_DUE
            TOM = MAX_TOM - TEMP_TOM
            document.getElementById("description").innerHTML = `<span class="material-symbols-outlined" style="color: red;">description</span><b>${DUE}</b> works due today, <b>${TOM}</b> due tomorrow! <br> <br><span class="material-symbols-outlined" style="color: orange;">Newspaper</span><b>${WORKLOAD}</b> assigned task! <br> <br> <span class="material-symbols-outlined" style="color: green;">check</span><b>${DONE}</b> finished tasks!`;

            const inputs = document.querySelectorAll("input");
            const labels = document.querySelectorAll("label");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener("change", function(index) {
                    return function() {
                        if (inputs[index].checked) {
                            labels[i].className = "checked"
                            DONE += 1;
                            WORKLOAD -= 1;
                            if (inputs[index].id.includes("due")) {
                                DUE -= 1
                            }
                            if (inputs[index].id.includes("tom")) {
                                TOM -= 1;
                            }
                            let checked_inputs = JSON.parse(localStorage.getItem("ICT_INPUTS"))
                            checked_inputs.push(inputs[i].id);
                            localStorage.setItem("ICT_INPUTS", JSON.stringify(checked_inputs))
                        }
                        else {
                            labels[i].className = "";
                            DONE -= 1;
                            WORKLOAD += 1;
                            if (inputs[index].id.includes("due")) {
                                DUE += 1;
                            }
                            if (inputs[index].id.includes("tom")) {
                                TOM += 1;
                            }
                            let checked_inputs = JSON.parse(localStorage.getItem("ICT_INPUTS"))
                            let indexToRemove = checked_inputs.indexOf(inputs[i].id);
                            checked_inputs.splice(indexToRemove, 1);
                            localStorage.setItem("ICT_INPUTS", JSON.stringify(checked_inputs))
                        }
                        document.getElementById("description").innerHTML = `<span class="material-symbols-outlined" style="color: red;">description</span><b>${DUE}</b> works due today, <b>${TOM}</b> due tomorrow! <br> <br><span class="material-symbols-outlined" style="color: orange;">Newspaper</span><b>${WORKLOAD}</b> assigned task! <br> <br> <span class="material-symbols-outlined" style="color: green;">check</span><b>${DONE}</b> finished tasks!`;
                    };
                }(i));
            }
        }

function sortDictionaryByNumber(dict) {
    let keys = Object.keys(dict);
    keys.sort((a, b) => {
        let aValue = dict[a];
        let bValue = dict[b];
        if (aValue === -1) return -1;
        if (bValue === -1) return 1;
        if (aValue >= 0 && bValue >= 0) return aValue - bValue;
        if (aValue < 0 && bValue < 0) return bValue - aValue;
        if (aValue >= 0 && bValue < 0) return -1;
        if (aValue < 0 && bValue >= 0) return 1;
    });
    return keys;
}

function timeRemainingUntil(targetDate) {
    // Get the current date and time
    var now = new Date();
    var difference = targetDate.getTime() - now.getTime();
    var daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hoursRemaining = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000);
    return {
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        seconds: secondsRemaining,
        month: monthNames[targetDate.getMonth()],
        day: targetDate.getDate()
    };
}

function GenerateAssignments(data, subject) {
    if (data.length !== 0) {
        const SUBJECT = subject;
        let final = `
                    <div class="sub">
                        <h2>{subject}</h2>
                        <hr>
                        <div class="task-container">
        `
        let sorting = {};
        for (let i = 0; i < data.length; i++) {
            const DUE_DATE = timeRemainingUntil(new Date(data[i]["due"]));
            sorting[i] = Number(DUE_DATE.days)
        }
        var idx = 0
        for (let i = 0; i < Object.keys(ASSIGNMENT).length; i++) {
            if (subject !== Object.keys(ASSIGNMENT)[i]) {
                idx += 1
            }

            else {
                break
            }
        }
        const ORDER = sortDictionaryByNumber(sorting) 
        for (let i = 0; i < data.length; i++) {
            TEMP_WORKLOAD += 1
            const DESCRIPTION = data[ORDER[i]]["description"];
            const DUE_DATE = timeRemainingUntil(new Date(data[ORDER[i]]["due"]));
            let check_default = ""
            if (JSON.parse(localStorage.getItem("ICT_INPUTS")).includes(String(idx))) {
                check_default = "checked"
            }
            let REMAINING = "";
            let STATUS = "";
            let DETAILS = `<input type="checkbox" name="task" ${check_default} id="${idx}">
            <label for="task" class="${check_default}">{description}</label>
            <p id="due-date"><span class="material-symbols-outlined" style="color: orange; transform: translateY(6.5px);">calendar_today</span>{deadline}</p>`
            if (DUE_DATE.days > 1) {
                REMAINING = `in ${DUE_DATE.days} days`;
                STATUS = `${DUE_DATE.month} ${DUE_DATE.day},`
            }

            else if (DUE_DATE.days == 0) {
                REMAINING = `${DUE_DATE.hours} hours left (TOMORROW)`;
                STATUS = `${DUE_DATE.month} ${DUE_DATE.day},`;
                TEMP_TOM += 1
                if (JSON.parse(localStorage.getItem("ICT_INPUTS")).includes(idx + " tom")) {
                    check_default = "checked"
                }
                DETAILS = `<input type="checkbox" name="task" ${check_default} id="${idx} tom">
                <label for="task" class="${check_default}">{description}</label>
                <p id="due-date"><span class="material-symbols-outlined" style="color: orange; transform: translateY(6.5px);">calendar_today</span>{deadline}</p>`
                }

            else if (DUE_DATE.days == -1) {
                REMAINING = `(TODAY)`;
                STATUS = `${DUE_DATE.month} ${DUE_DATE.day},`
                TEMP_DUE += 1
                if (JSON.parse(localStorage.getItem("ICT_INPUTS")).includes(idx + " due")) {
                    check_default = "checked"
                }
                DETAILS = `<input type="checkbox" name="task" ${check_default} id="${idx} due">
                <label for="task" class="${check_default}">{description}</label>
                <p id="due-date"><span class="material-symbols-outlined" style="color: orange; transform: translateY(6.5px);">calendar_today</span>{deadline}</p>`
            }

            else {
                REMAINING = `(PASSED)`;
                STATUS = `${DUE_DATE.month} ${DUE_DATE.day},`
            }

            final += `

            <div class="task">
                {details}
            </div>
            <hr>
            `.replace("{details}", DETAILS).replace("{description}", DESCRIPTION).replace("{deadline}", `${STATUS} ${REMAINING}`);
            idx += 1
        }
        final += "</div> </div>";
        return final.replace("{subject}", SUBJECT);
        }
    else {
        return ""
    }
    }

for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function() {
        if (categories[i].id.toUpperCase() === "ALL") {
            let final = ""
            for (let keys in ASSIGNMENT) {
                final += GenerateAssignments(ASSIGNMENT[keys], keys)
            }
            list_container.innerHTML = final;
        }

        else {
            list_container.innerHTML = GenerateAssignments(ASSIGNMENT[categories[i].id.toUpperCase()], categories[i].id.toUpperCase()) 
        }
        UpdateStats()
    })
}

document.addEventListener("DOMContentLoaded", async function() {
    const ASSIGNMENTS = JSON.parse(await LoadAssignments());
    ASSIGNMENT = ASSIGNMENTS
    list_container.innerHTML = ""
    let final = ""
    for (let keys in ASSIGNMENTS) {
        final += GenerateAssignments(ASSIGNMENTS[keys], keys)
    }
    list_container.innerHTML = final;
    WORKLOAD = TEMP_WORKLOAD;
    DUE = TEMP_DUE;
    DONE = TEMP_DONE;
    TOM = TEMP_TOM
    MAX_TOM = TOM
    MAX_DONE = DONE;
    MAX_WORKLOAD = WORKLOAD;
    MAX_DUE = DUE
    UpdateStats()
})