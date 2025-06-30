<?php
session_start();
include 'db.php'; // Make sure db.php has correct DB name and connection

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize user inputs
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Fetch user by email
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);

        // ✅ Verify the hashed password
        if (password_verify($password, $user['password'])) {
            // ✅ Create session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];

            // ✅ Redirect to dashboard
            header("Location: ../frontend/dashboard.html");
            exit();
        } else {
            // ❌ Incorrect password
            echo "<script>alert('Incorrect password.'); window.location.href='../frontend/login.html';</script>";
        }
    } else {
        // ❌ No such user
        echo "<script>alert('User not found.'); window.location.href='../frontend/login.html';</script>";
    }
} else {
    // ❌ Not a POST request
    echo "<script>alert('Invalid request.'); window.location.href='../frontend/login.html';</script>";
}
?>
