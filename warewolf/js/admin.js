// Function to fetch names from the server
const option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};
const RolesArr = ["kane", "Sniper", "Doctor"," Saul", "Pedar Khande", "Matador"]

function fetchNames() {
    console.log("Entering fetchNames : ");
    fetch( '../backend/admin.php',option
    )
    .then (response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Players List
        const playersList = document.getElementById('playersList');
        playersList.innerHTML = ''; // Clear existing list

        // Add each player to the players list
        data.forEach(name => {
            const playerText = document.createElement('div');
            playerText.textContent = name;
            playerText.style.marginBottom = '10px';
            playersList.appendChild(playerText);
        });

        // Roles List
        const rolesList = document.getElementById('rolesList');
        rolesList.innerHTML = ''; // Clear existing list

        // Add each role to the roles list with a dropdown
        RolesArr.forEach(role => {
            const roleContainer = document.createElement('div');
            roleContainer.style.marginBottom = '10px';

            const roleText = document.createElement('span');
            roleText.textContent = role;
            roleText.style.marginRight = '10px';
            roleContainer.appendChild(roleText);

            const dropdown = document.createElement('select');
            ['0', '1', '2', '3'].forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                dropdown.appendChild(option);
            });
            roleContainer.appendChild(dropdown);

            rolesList.appendChild(roleContainer);
        });

        console.log('Players and roles updated.');
        console.log(data);
    })
    .catch(error => console.error('Error fetching names:', error));

}
 
// Event listener for the button
document.getElementById('getNamesButton').addEventListener('click', fetchNames);
