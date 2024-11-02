<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
echo "Starting admin.php";

header('Content-Type: application/json');

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
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
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