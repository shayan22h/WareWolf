

const ws = new WebSocket('wss://yourAddress/ws/');
ws.onopen = () => {
    console.log('Connected to WebSocket server as Admin.');
    ws.send(JSON.stringify({ type: 'register', name: 'Admin' }));
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
    console.warn('WebSocket closed:', event);
};

// Function to fetch names from the server
const option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};
// Array of roles
const RolesArr = [
    "Shar Sade",
    "Nostradamus",
    "Kane",
    "Herfei",
    "Doctor",
    "Konstantin",
    "Saul Goodman",
    "Pedar Khande",
    "Matador",
    "Jan Sakht",
    "Tofangdar",
    "Sherlock",
    "Jack"
];
let NoOfPlayers = 0;
let PlayersNames = []

// Utility function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
        // number of players
        NoOfPlayers = data.length;
        console.log("No of Players is");
        console.log(NoOfPlayers);
        PlayersNames.push(data); 
    
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
        rolesList.innerHTML = 'Number of players for this deck is ' + NoOfPlayers
        // Add each role to the roles list with a dropdown
        RolesArr.forEach(role => {
            const roleContainer = document.createElement('div');
            roleContainer.style.marginBottom = '10px';

            const roleText = document.createElement('span');
            roleText.textContent = role;
            roleText.style.marginRight = '10px';
            roleContainer.appendChild(roleText);

            const dropdown = document.createElement('select');
            dropdown.classList.add('role-dropdown'); // Add class to select dropdowns
            ['0', '1', '2', '3' , '4' , '5' , '6'].forEach(optionText => {
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

const RegisterRolesArr = [];
// Function to validate and generate role assignments
function assignRoles() {
    const dropdowns = document.querySelectorAll('.role-dropdown');
    const RoleObjArr = []; // Array to store role assignments
    let selectedTotal = 0; // Track the total count selected

    dropdowns.forEach((dropdown, index) => {
        const selectedValue = parseInt(dropdown.value);
        console.log('the dropdown value is ' + selectedValue);
        selectedTotal += selectedValue;
        if (selectedValue > 0)
        {
            // Create object with role and selected count
            const roleAssignment = {
                Role: RolesArr[index],
                Number: selectedValue
            };
            RoleObjArr.push(roleAssignment);
        }
    });
    console.log(RoleObjArr);

    
    // Assume `data` represents the list of players fetched in `fetchNames`
    const totalPlayers = document.getElementById('playersList').children.length;

    // Check if total selected matches number of players
    if (selectedTotal === totalPlayers) {

        console.log("Valid assignment, proceeding.");

        // Flatten role assignments into a list of roles
        let allRoles = [];
        RoleObjArr.forEach(roleObj => {
            for (let i = 0; i < roleObj.Number; i++) {
                allRoles.push(roleObj.Role);
            }
        });

        console.log('All roles:', allRoles);
        
        /*
        // Shuffle the player names
        let shuffledPlayers = [...PlayersNames[0]]; // Flatten the nested PlayersNames array
        shuffledPlayers = shuffleArray(shuffledPlayers);
        console.log('Shuffled players:', shuffledPlayers);
        */
        console.log("Updated PlayersNames:", PlayersNames);
        // Shuffle the roles to add additional randomness
        allRoles = shuffleArray(allRoles);
        console.log('Shuffled roles:', allRoles);

        // Assign roles to players
        const PlayerNameRoleList = PlayersNames.map((player, index) => ({
            Name: player,
            Role: allRoles[index],
        }));
   
        ws.send(JSON.stringify({
            type: 'assign_roles',
            roles: PlayerNameRoleList,
        }));

        console.log('Final Player-Role assignments:', PlayerNameRoleList);
    } else {
        alert(`Total selected (${selectedTotal}) does not match number of players (${totalPlayers}). Please adjust.`);
    }
    
}

// Event listener for assigning roles
document.getElementById('assignRolesButton_bt_id').addEventListener('click', assignRoles);



function DeleteGame() {

    fetch('../backend/deletegame.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Assuming your server sends a success message
    })
    .then(message => {
        alert(message); // Show server's response (e.g., "All players removed successfully.")
    })
    .catch(error => console.error('Error removing game:', error)); 
}
// Event listener for assigning roles
document.getElementById('remove_db_bt_id').addEventListener('click', DeleteGame);











function updatePlayersDropdown(players) {
    NoOfPlayers = players.length;
    PlayersNames = players; // Store player names globally

    // Players List UI
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = ''; // Clear existing list

    players.forEach(name => {
        const playerText = document.createElement('div');
        playerText.textContent = name;
        playerText.style.marginBottom = '10px';
        playersList.appendChild(playerText);
    });

    // Roles List UI
    const rolesList = document.getElementById('rolesList');
    rolesList.innerHTML = ''; // Clear existing list
    rolesList.innerHTML = 'Number of players for this deck is ' + NoOfPlayers;

    // Create dropdowns for role selection
    RolesArr.forEach(role => {
        const roleContainer = document.createElement('div');
        roleContainer.style.marginBottom = '10px';

        const roleText = document.createElement('span');
        roleText.textContent = role;
        roleText.style.marginRight = '10px';
        roleContainer.appendChild(roleText);

        const dropdown = document.createElement('select');
        dropdown.classList.add('role-dropdown'); // Add class for role selection
        ['0', '1', '2', '3', '4', '5', '6'].forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            dropdown.appendChild(option);
        });
        roleContainer.appendChild(dropdown);

        rolesList.appendChild(roleContainer);
    });

    console.log('Connected players and roles dropdown updated.');
}




function GetConnectedList() {
    ws.send(JSON.stringify({
        type: 'get_all_connections'
    }));
}

// Function to remove all active connections
function RemoveConnectedList() {
    ws.send(JSON.stringify({
        type: 'removes_all_connection'
    }));
}

ws.onmessage = (event) => {
    const response = JSON.parse(event.data);

    if (response.type === 'get_all_connections') {
        if (response.connections && response.connections.length > 0) {

            PlayersNames.length = 0; // Reset the array
            PlayersNames.push(response.connections);
            console.log("Updated PlayersNames:", PlayersNames);
            
            // Update the UI with connected clients
            updatePlayersDropdown(response.connections);
        } else {
            alert("No active connections.");
        }
    } else if (response.type === 'removes_all_connection') {
        alert("All WebSocket connections have been removed.");
    } else if (response.type === 'admin_role_list') {
        // Display role assignments for the Admin client
        let roleAssignments = "Assigned Roles:\n";
        response.roles.forEach(entry => {
            roleAssignments += `${entry.Name}: ${entry.AssignedRole}\n`;
        });
        alert(roleAssignments);
    }
};

// Event listeners for the buttons
document.getElementById('get_active_con_id').addEventListener('click', GetConnectedList);
document.getElementById('remove_active_con_id').addEventListener('click', RemoveConnectedList);