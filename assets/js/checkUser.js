function getCookieValid(cookieName) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split("; ");

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        var cookieParts = splitByFirstEqualSign(cookie)
        try{
            if (cookieParts[0] === cookieName) {
                return true
            }
        } catch {
            return false
        }

    }
    return false;
}

function checkUser() {
    if (window.location.pathname.includes("index.html")) {
        if (!getCookieValid("token")) {
            window.location.href = "login.html";
        }
    } else if (window.location.pathname.includes("login.html")) {
        if (getCookieValid("token")) {
            window.location.href = "index.html";
        }
    }
}