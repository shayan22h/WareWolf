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

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL to delete all records from the table
    $stmt = $pdo->prepare("DELETE FROM PlayersName"); // Replace 'players' with your actual table name
    $stmt->execute();

    echo "All players removed successfully.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>