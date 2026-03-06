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

const setRoute = async function(route){
    window.history.pushState({} , "", route)
    const newPage = await (await fetch(route)).text()
    let newContent = document.createElement("html")
    newContent.innerHTML = newPage
    document.getElementsByClassName("content")[0].innerHTML = ""
    newContent = newContent.children[0].children[2].content
    document.getElementsByClassName("content")[0].appendChild(newContent)
}

void (async function () {
    const layout = document.createElement("html");
    layout.innerHTML = await (await fetch("/layout/layout.html")).text();
    document.body.appendChild(layout);

    document.getElementById("pageTitle").text = pageTitle;
    document.getElementById("headerTitle").textContent = pageTitle;

    let content = document.getElementById("contentTemp").content.cloneNode(true);
    document.getElementsByClassName("content")[0].appendChild(content)
    const navButtons = document.getElementsByClassName("nav")[0].children
    for (let a of navButtons){
        const href = a.href
        a.setAttribute('onclick', `void(async ()=> await setRoute('${href}'))()`)
        a.removeAttribute("href")
    }
})();