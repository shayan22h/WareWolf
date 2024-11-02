// Function to fetch names from the server
function fetchNames() {
    fetch( '../backend/admin.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )
    .then (response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Store data in a JavaScript variable
        const users = data;

        // Display data in the <pre> element
        document.getElementById('output').textContent = JSON.stringify(users, null, 2);

        // Log for debugging
        console.log(users);
    })
    .catch(error => console.error('Error fetching names:', error));

}

// Event listener for the button
document.getElementById('getNamesButton').addEventListener('click', fetchNames);
