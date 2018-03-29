/**
 * Created by coreycaplan on 11/17/17.
 */

$(document).ready(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.addScope('https://mail.google.com/');

    $('#loginButton').click(function () {
        firebase.auth().signInWithRedirect(provider);
    });

    $('#logoutButton').click(function () {
        logout();
    });

    $('#error-logoutButton').click(function () {
        logout();
    });

    if (localStorage.getItem(keyToken)) {
        // The user is already signed in
        redirectToHome();
    }

    showProgressDialog();

    firebase.auth().getRedirectResult()
        .then(function (result) {
            if (result.credential) {
                firebase.auth().currentUser.getIdToken(true)
                    .then(function (idToken) {
                        loginWithServer(idToken);
                    });
            } else {
                hideProgressDialog();
            }
        }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.

        console.log("Error Code: ", errorCode);
        console.log("Error: ", errorMessage);

        showErrorContainer("There was an error logging in with Google, please try again or contact the developers.");
    });

});

function loginWithServer(idToken) {

    doPostRequestForLogin("/user/login", {id_token: idToken}, success, error);

    function success(user) {
        hideProgressDialog();
        console.log("JWT: ", user.jwt);
        localStorage.setItem(keyToken, user.jwt);
        redirectToHome();
    }

    function error(xhr) {
        hideProgressDialog();

        if (xhr.status === 401) {
            showUnauthorizedLoginContainer();
        } else {
            var error = "There was an error signing you in with the server. Please try again or contact a developer.";
            showErrorContainer(error);
        }
    }
}

function logout() {
    showProgressDialog();
    firebase.auth().signOut().then(function () {
        hideProgressDialog();
        showLoginContainer();
    }).catch(function (error) {
        hideProgressDialog();
        console.log(error);
    });
}

function showLoginContainer() {
    $('#unauthorized-login-container').hide(animationDuration);
    $('#error-login-container').hide(animationDuration);

    setTimeout(function () {
        $('#login-container').show(animationDuration);
    }, animationDuration);
}

function showUnauthorizedLoginContainer() {
    $('#login-container').hide(animationDuration);
    $('#error-login-container').hide(animationDuration);

    setTimeout(function () {
        $('#unauthorized-login-container').show(animationDuration);
    }, animationDuration);
}

/**
 * @param message A UI friendly message to display to the user on the error that occurred.
 */
function showErrorContainer(message) {
    $('#unauthorized-login-container').hide(animationDuration);
    $('#login-container').hide(animationDuration);

    setTimeout(function () {
        $('#error-login-message').html(message);
        $('#error-login-container').show(animationDuration);
    }, animationDuration);
}

function showProgressDialog() {
    $('#progress-dialog').modal("open");
}

function hideProgressDialog() {
    $('#progress-dialog').modal("close");
}