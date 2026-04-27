void (() => {

    linkStyle("/components/mediumLink/mediumLink.css")

    let allMedLinks = document.getElementsByClassName("mediumLink");

    for (let m of allMedLinks) {

        m.setAttribute("onmouseenter", "playSound('hover');");
    }
})();