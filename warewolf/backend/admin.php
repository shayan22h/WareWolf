<?php

// Starting with PHP tag right away
header("Content-Type: application/json");

// Include the configuration file
require_once '../../db_config.php';

// Get the credentials
$dbConfig = getDatabaseConfig();
$servername = $dbConfig['servername'];
$username = $dbConfig['username'];
$password = $dbConfig['password'];
$dbname = $dbConfig['dbname'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT names FROM PlayersName"; // Updated column name
$result = $conn->query($sql);

$users = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row['names']; // Updated column name
    }
}

$conn->close();

// Send the data as JSON
echo json_encode($users);

?>