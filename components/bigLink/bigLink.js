void (() => {

    linkStyle("/components/bigLink/bigLink.css")

    let allBigLinks = document.getElementsByClassName("bigLink");

    for (let b of allBigLinks) {
        const href = b.href;
        b.setAttribute(
            "onclick",
            `void(async ()=> await setRoute('${href}'))()`,
        );
        b.removeAttribute("href");
        b.setAttribute("onmouseenter", "playSound('hover');");
    }
})();

