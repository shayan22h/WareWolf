        // Function to get query parameters
    function getQueryParams() {
        const params = {};
        window.location.search.substr(1).split('&').forEach(function(part) {
            const item = part.split('=');
            params[item[0]] = decodeURIComponent(item[1]);
        });
        return params;
    }
    
        // Get the 'users' parameter
    const params = getQueryParams();
    console.log("the user object");
    console.log(params.users); // Should log the JSON string of names

    if (params.users) {
        const users = JSON.parse(params.users); // Convert the JSON string back to an array
    
        // Display users in the <pre> element
        document.getElementById('output').textContent = JSON.stringify(users, null, 2);
        console.log(users); // For debugging
    }