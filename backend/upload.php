<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "Unauthorized access!";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['iris_image'])) {
    $user_id = $_SESSION['user_id'];
    $uploadDir = '../uploads/';

    // Create the uploads folder if not exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = basename($_FILES['iris_image']['name']);
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['iris_image']['tmp_name'], $filePath)) {
        $query = "INSERT INTO iris_scans (user_id, file_name, uploaded_at) VALUES ('$user_id', '$fileName', NOW())";
        if (mysqli_query($conn, $query)) {
            echo "<script>alert('Iris image uploaded successfully!'); window.location.href = '../frontend/dashboard.html';</script>";
        } else {
            echo "Database error: " . mysqli_error($conn);
        }
    } else {
        echo "File upload failed.";
    }
} else {
    echo "Invalid request.";
}
?>
