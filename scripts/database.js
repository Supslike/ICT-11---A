const API_ROOT = "https://supslikes.pythonanywhere.com/" // https://supslikes.pythonanywhere.com/  http://127.0.0.1:4999/

async function LoadAssignments() {
    try {
        const response = await fetch(API_ROOT + "assignment" + retrieve_item("STUDENT_PARAMS"), { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json'} 
        });

        if (!response.ok) {
            throw new Error('Network response FAILED');
        }

        const data = await response.text();
        console.log('ASSIGNMENT RESULT:', data);
        return JSON.parse(data); 
    } catch (error) {
        console.error('There was a problem with the request:', error);
        throw error;
    }
}