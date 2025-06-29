<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);

        // ✅ Verify hashed password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            header("Location: ../frontend/dashboard.html");
            exit();
        } else {
            echo "<script>alert('Incorrect password.'); window.location.href='../frontend/login.html';</script>";
        }
    } else {
        echo "<script>alert('User not found.'); window.location.href='../frontend/login.html';</script>";
    }
} else {
    echo "<script>alert('Invalid request.'); window.location.href='../frontend/login.html';</script>";
}
?>
