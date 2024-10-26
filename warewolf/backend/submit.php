<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the configuration file
require_once '../../db_config.php';

// Get the credentials
$dbConfig = getDatabaseConfig();
$servername = $dbConfig['servername'];
$username = $dbConfig['username'];
$password = $dbConfig['password'];
$dbname = $dbConfig['dbname'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$passcode = $_POST['passcode'];
$name = $_POST['name'];

// Validate PassCode
if ($passcode === "1234" && !empty($name)) {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO PlayersName (names) VALUES (?)");
    $stmt->bind_param("s", $name);

    // Execute and check
    if ($stmt->execute()) {
        echo "New record added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
} else {
    echo "Invalid PassCode or Name";
}

// Close connection
$conn->close();
