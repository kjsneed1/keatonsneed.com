let isWide = window.matchMedia("(min-width: 769px)");

isWide.addEventListener("change", function () {
    navWidthCheck(isWide);
});

let navOpen = isWide.matches;

const navToggle = function () {
    if (!navOpen) {
        document.getElementsByClassName("nav")[0].style.width = "160px";
        document.getElementsByClassName("nav")[0].style.borderRight =
            "1px solid var(--border)";
    } else {
        document.getElementsByClassName("nav")[0].style.width = "0px";
        document.getElementsByClassName("nav")[0].style.borderRight = "none";
    }
    navOpen = !navOpen;
};

const navWidthCheck = function (isWide) {
    if (isWide.matches) {
        if (!navOpen) {
            navToggle();
        }
    } else {
        if (navOpen) {
            navToggle();
        }
    }
};

const clickOffNav = function () {
    if (navOpen && !isWide.matches) {
        navToggle();
    }
};

function linkStyle(href) {
    let styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.type = "text/css";
    styleLink.href = href;
    document.getElementsByTagName("HEAD")[0].appendChild(styleLink);
}

const setRoute = async function (route, pop = false) {
    if (!pop) {
        window.history.pushState(route, "", route);
    }

    let newContent = document.createElement("html");
    newContent.innerHTML = await (await fetch(route)).text();

    const scripts = newContent.querySelectorAll("script.important");

    for (let s of scripts) {
        const script = document.createElement("script");
        if (s.src !== "") {
            script.src = s.src;
        }
        script.text = s.text;
        document.getElementsByTagName("HEAD")[0].appendChild(script);
    }

    document.getElementsByClassName("content")[0].innerHTML = "";

    const contents = newContent.querySelectorAll(":not(script).important");

    for (let c of contents) {
        document.getElementsByClassName("content")[0].appendChild(c);
    }

    document.getElementById("pageTitle").text = pageTitle;
    document.getElementById("headerTitle").textContent = pageTitle;
    clickOffNav();
};

window.history.pushState(location.pathname, "");

onpopstate = (event) => {
    console.log("here");
    setRoute(event.state, true);
};

linkStyle("/layout/layout.css");

void (async function () {
    const layout = document.createElement("html");
    layout.innerHTML = await (await fetch("/layout/layout.html")).text();
    document.body.appendChild(layout);

    let content = document.querySelector("div.important");
    document.getElementsByClassName("content")[0].appendChild(content);
    const navButtons = document.getElementsByClassName("nav")[0].children;
    for (let a of navButtons) {
        const href = a.href;
        a.setAttribute(
            "onclick",
            `void(async ()=> await setRoute('${href}'))()`,
        );
        a.removeAttribute("href");
    }

    document.getElementById("pageTitle").text = pageTitle;
    document.getElementById("headerTitle").textContent = pageTitle;
})();
