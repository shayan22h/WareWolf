function showAdminPasscode() {
    document.getElementById("adminPasscode").style.display = "block";
}

function handleAdminSubmit() {
    var passcode = document.getElementById("passcode").value;
    if (passcode === "4444") {
        window.location.href = "html/admin.html";
    } else {
        alert("Incorrect Passcode");
    }
}

function handleUserSubmit() {
    window.location.href = "html/user.html";
}

