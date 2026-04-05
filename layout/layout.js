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

const audio = {
    select: new Audio("/sounds/select.ogg"),
    hover: new Audio("/sounds/hover.ogg"),
};

audio.select.preload = "auto";
audio.select.load();

let muted = localStorage.getItem("muted") === "true" || false;

const playSound = function (sound) {
    if (!muted) {
        audio[sound].currentTime = 0;
        audio[sound].play();
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
        playSound("select");
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

window.history.replaceState(location.pathname, "");

onpopstate = (event) => {
    setRoute(event.state, true);
};

const handleMute = function () {
    muted = !muted;

    localStorage.setItem("muted", muted);

    if (muted) {
        muteIcon.src = "/icons/volume-slash.svg";
    } else {
        muteIcon.src = "/icons/volume.svg";
    }
};

let center;
let fullscreen = localStorage.getItem("fullscreen") === "true" || false;

const handleFullscreen = function () {
    fullscreen = !fullscreen;
    localStorage.setItem("fullscreen", fullscreen);

    if (fullscreen) {
        center.classList.add("fullscreen");
        fullscreenIcon.src = "/icons/compress.svg";
    } else {
        center.classList.remove("fullscreen");
        fullscreenIcon.src = "/icons/expand.svg";
    }
};

let themeIsOpen = false;

const hideThemePopup = function () {
    themeIsOpen = false;

    const themePopup = document.getElementsByClassName("themePopup")[0];
    themePopup.classList.remove("visible");
};

const handleThemeOpen = function () {
    themeIsOpen = !themeIsOpen;

    const themePopup = document.getElementsByClassName("themePopup")[0];

    if (themeIsOpen) {
        themePopup.classList.add("visible");
    } else {
        themePopup.classList.remove("visible");
    }
};

let theme = localStorage.getItem("theme") || "theme1";

const setTheme = function (t) {
    body.classList.remove(theme);
    body.classList.add(t);

    localStorage.setItem("theme", t);

    theme = t;
};

let darkTheme;
const darkThemeStorage = localStorage.getItem("darkTheme")

if(darkThemeStorage === "false"){
    darkTheme = false
}
else{
    darkTheme = true
}

const toggleTheme = function () {
    darkTheme = !darkTheme;
    localStorage.setItem("darkTheme",darkTheme)

    if (darkTheme) {
        body.classList.remove("light");
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
    }
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
        a.setAttribute("onmouseenter", "playSound('hover');");
    }

    document.getElementById("pageTitle").text = pageTitle;
    document.getElementById("headerTitle").textContent = pageTitle;

    const muteIcon = document.getElementById("muteIcon");
    const fullscreenIcon = document.getElementById("fullscreenIcon");

    if (muted) {
        muteIcon.src = "/icons/volume-slash.svg";
    }

    center = document.getElementsByClassName("center")[0];

    if (fullscreen) {
        center.classList.add("fullscreen");
        fullscreenIcon.src = "/icons/compress.svg";
    }

    const body = document.getElementById("body");

    body.classList.add(theme);

    if (darkTheme) {
        body.classList.add("dark");
    } else {
        body.classList.add("light");
    }

})();
