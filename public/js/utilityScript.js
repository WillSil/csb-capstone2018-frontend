const serverUrl = "https://automate-csb-staging.herokuapp.com";
// const serverUrl = "http://localhost:9000";
const animationDuration = 300;
const keyToken = "token";

function redirectToHome() {
    window.location.href = "/dailyDigest.html"
}

function redirectToLogin() {
    window.location.href = "/index.html"
}

function showToast(text) {
    Materialize.toast(text, 4000);
}

function doGetRequest(route, queryParams, completionFunction, errorFunction) {
    queryParams = queryParams ? queryParams : "";
    console.log(queryParams);
    $.ajax({
        url: serverUrl + route,
        data: queryParams,
        method: "GET",
        headers: {
            "Authorization": localStorage.getItem(keyToken),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (completionFunction && typeof completionFunction === "function") {
                if(typeof data === "string") {
                    data = JSON.parse(data);
                }
                completionFunction(data);
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                redirectToLogin();
                showToast("You are no longer signed in");
            } else {
                showToast("There was an error connecting to the server. Please try again or submit a bug report");
            }

            if (errorFunction && typeof errorFunction === "function") {
                errorFunction(xhr);
            }
        }
    })
}

function doDeleteRequest(route, queryParams, completionFunction, errorFunction) {

    queryParams = queryParams ? queryParams : "";
    console.log(queryParams);
    $.ajax({
        url: serverUrl + route,
        data: queryParams,
        method: "DELETE",
        headers: {
            "Authorization": localStorage.getItem(keyToken),
            "Content-Type": "application/json",
            "X-Requested-With": "*",
            "Csrf-Token": "nocheck",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE",
            "Access-Control-Max-Age": "10000"



        },
        success: function (data) {

            if (completionFunction && typeof completionFunction === "function") {
                if(typeof data === "string") {
                    data = JSON.parse(data);
                }
                completionFunction(data);
            }
        },
        error: function (xhr) {

            console.log(xhr);
            if (xhr.status === 401) {
                redirectToLogin();
                showToast("You are no longer signed in");
            } else {
                showToast("There was an error connecting to the server. Please try again or submit a bug report");
            }

            if (errorFunction && typeof errorFunction === "function") {
                errorFunction(xhr);
            }
        }
    })
}

function doPostRequestForLogin(route, jsonData, completionFunction, errorFunction) {
    $.ajax({
        url: serverUrl + route,
        data: JSON.stringify(jsonData),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "*",
            "Csrf-Token": "nocheck",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET",
            "Access-Control-Max-Age": "10000"
        },
        success: function (data) {
            if (completionFunction && typeof completionFunction === "function") {
                if(typeof data === "string") {
                    data = JSON.parse(data);
                }
                completionFunction(data);
            }
        },
        error: function (xhr) {
            if (xhr.status !== 401) {
                showToast("There was an error connecting to the server. Please try again or submit a bug report");
            }

            if (errorFunction && typeof errorFunction === "function") {
                errorFunction(xhr);
            }
        }
    })
}

function doPostRequest(route, jsonData, completionFunction, errorFunction) {
    $.ajax({
        url: serverUrl + route,
        data: JSON.stringify(jsonData),
        // dataType: "json",
        // crossDomain: true,
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem(keyToken),
            "Content-Type": "application/json",
            "X-Requested-With": "*",
            "Csrf-Token": "nocheck",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Max-Age": "10000"
        },
        success: function (data) {
            if (completionFunction && typeof completionFunction === "function") {
                if(typeof data === "string") {
                    data = JSON.parse(data);
                }
                completionFunction(data);
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                redirectToLogin();
                showToast("You are no longer signed in");
            } else {
                showToast("There was an error connecting to the server. Please try again or submit a bug report");
            }

            if (errorFunction && typeof errorFunction === "function") {
                errorFunction(xhr);
            }
            showToast("There was an error connecting to the server. Please try again or submit a bug report");
        }
    })
}

function signOut() {
    localStorage.removeItem(keyToken);
    redirectToLogin();
}