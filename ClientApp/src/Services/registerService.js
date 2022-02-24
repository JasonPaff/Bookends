export async function register(accountInfo) {
    // Post headers with account info body.
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountInfo)
    };

    // Register with server.
    const request = await fetch('https://localhost:7162/auth/register', headers);
    const response = await request.json();

    if (response.success === false) {
        return {
            success: false,
            message: response.message
        }
    } else if (response.success) {
        return {
            success: true,
            message: response.message,
        }
    }
}

export function validateRegisterInfo(accountInfo) {
    // Check for blank email address.
    if (accountInfo.email.trim().length === 0) {
        return "Email cannot be blank";
    }

    // TODO: validate email address matching email address pattern

    // Check for blank password.
    if (accountInfo.password.trim().length === 0) {
        return "Password cannot be blank.";
    }

    // Check for blank confirm password.
    if (accountInfo.confirmPassword.trim().length === 0) {
        return "Confirm password cannot be blank.";
    }

    // Check for matching password and confirm password.
    if (accountInfo.password !== accountInfo.confirmPassword) {
        return "Passwords do not match.";
    }

    return "";
}