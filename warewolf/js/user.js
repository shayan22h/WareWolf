// WebSocket setup
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to WebSocket server as Admin.');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
    console.warn('WebSocket closed:', event);
};

let userName = 'shayan'; // Use `let` to allow reassignment

function SendNameToWebSocketServer() {
    console.log("Send Names To WebSocket Server:");

    // Ensure the WebSocket is open before sending data
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'register', name: userName }));
    } else {
        console.error("WebSocket is not connected.");
    }
}

// Listen for role assignment messages
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'role_assignment') {
        console.log(`You have been assigned the role: ${data.role}`);
        alert(`Your assigned role is: ${data.role}`);
    }
};

// Function to handle form submission using AJAX
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Get form data
    const name = document.getElementById('name').value;
    const passcode = document.getElementById('passcode').value;

    // Send the form data to the server using fetch
    fetch('../backend/submit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Set appropriate content type for form data
        },
        body: `name=${encodeURIComponent(name)}&passcode=${encodeURIComponent(passcode)}`,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Assuming the server returns a text response
        })
        .then((data) => {
            console.log('Server response:', data);

            // Process server response
            if (data.includes("New record added successfully")) {
                // If the form submission is successful, update the WebSocket server
                userName = name; // Update the userName
                SendNameToWebSocketServer(); // Send the name to WebSocket server
                alert("Submission successful! Your name has been registered.");
            } else {
                // Handle invalid passcode or name
                alert(data); // Display the server's error message
            }
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
            alert("Error submitting the form. Please try again.");
        });
}

// Attach event listener to the form submission button
document.getElementById('submit_bt_id').addEventListener('click', handleFormSubmit);