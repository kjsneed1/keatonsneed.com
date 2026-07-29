void (() => {
    linkStyle("/components/album/album.css");

    let allAlbums = document.getElementsByClassName("album");

    for (let a of allAlbums) {
        const albumName = a.querySelector("h1").textContent;

        const songs = a.querySelectorAll("li");

        for (let s of songs) {
            const songName = s.querySelector("b").textContent;

            s.setAttribute(
                "onclick",
                `setMusicPlayer("${albumName}","${songName}")`,
            );
        }
    }
})();
