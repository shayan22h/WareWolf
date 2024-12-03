// Function to fetch names from the server
const option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};
const RolesArr = ["kane", "Sniper", "Doctor"," Saul", "Pedar Khande", "Matador"]
let NoOfPlayers = 0;

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

        // Create object with role and selected count
        const roleAssignment = {
            Role: RolesArr[index],
            Number: selectedValue
        };
        RoleObjArr.push(roleAssignment);
    });
    console.log(RoleObjArr);

    
    // Assume `data` represents the list of players fetched in `fetchNames`
    const totalPlayers = document.getElementById('playersList').children.length;
    let RoleObjArrCnt = 0;
    // Check if total selected matches number of players
    if (selectedTotal === totalPlayers) {

        RoleObjArr.forEach(RoleObj => {
            console.log(RoleObj);
            if(RoleObj.Number)
            {
                RoleObjArrCnt++;
                
            }

        });

    } else {
        alert(`Total selected (${selectedTotal}) does not match number of players (${totalPlayers}). Please adjust.`);
    }
    
}

// Event listener for assigning roles
document.getElementById('assignRolesButton_bt_id').addEventListener('click', assignRoles);


