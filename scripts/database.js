async function DownloadImage(url) {
    await fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = function() {
                const imageDataUrl = reader.result;
                localStorage.setItem("ICT_PFP", imageDataUrl);
                localStorage.setItem("ICT_INPUTS", JSON.stringify([]))
                localStorage.setItem("ICT_UPDATE", JSON.stringify(""))
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => console.error('Error downloading image:', error));
}

function AddName(name) {
    localStorage.setItem("ICT_NAME", name)
}

function DefaultPFP() {
    localStorage.setItem("ICT_PFP", "https://www.pythonanywhere.com/user/Supslikes/files/home/Supslikes/default_pfp.jpg")
}

function GetImage() {
    return localStorage.getItem("ICT_PFP");
}

function hasChanged(oldObj, newObj) {
    var oldStr = JSON.stringify(oldObj).trim(); // Remove leading and trailing whitespace
    var newStr = JSON.stringify(newObj).trim(); // Remove leading and trailing whitespace

    if (oldStr !== newStr) {
        return true;
    } else {
        return false;
    }
}

async function LoadAssignments() {
    try {
        const response = await fetch("https://supslikes.pythonanywhere.com/assignment", { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json'} 
        });
        if (!response.ok) {
            throw new Error('Network response FAILED');
        }
        const data = await response.text();
        console.log('Response from server:', data);
        localStorage.setItem("ICT_TEMP", JSON.stringify(data));
        if (hasChanged(JSON.parse(localStorage.getItem("ICT_TEMP")), JSON.parse(localStorage.getItem("ICT_DATA")))) {
            localStorage.setItem("ICT_DATA", JSON.stringify(data))
            localStorage.setItem("ICT_INPUTS", JSON.stringify([]))
            var time_check = new Date()
            var hours = time_check.getHours();
            var minutes = time_check.getMinutes();
            var amOrPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var timeString = hours + ':' + minutes + ' ' + amOrPm;
            var cur_date = `${monthNames[time_check.getMonth()]} ${time_check.getDate()}, ${timeString}`
            localStorage.setItem("ICT_UPDATE", JSON.stringify(cur_date))
            document.getElementById("last_update").textContent = `Last Updated: ${cur_date}`;
        }
        localStorage.removeItem("ICT_TEMP");
        return data; 
    } catch (error) {
        console.error('There was a problem with the request:', error);
        throw error;
    }
}