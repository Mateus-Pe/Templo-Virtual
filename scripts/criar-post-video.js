$('#texto').click(function(e){
    window.location = "criar-post-texto.html";
});

$('#imagem').click(function(e){
    window.location = "criar-post.html";
});

function showHideElements(selectedOption) {
    if (selectedOption === "youtube") {
        document.getElementById("select_youtube").style.display = "grid";
        document.getElementById("divBotoes").style.display = "block";
        document.getElementById("select_local").style.display = "none";
    } else if (selectedOption === "local") {
        document.getElementById("select_local").style.display = "grid";
        document.getElementById("divBotoes").style.display = "block";
        document.getElementById("select_youtube").style.display = "none";
    } else {
        document.getElementById("select_youtube").style.display = "none";
        document.getElementById("select_local").style.display = "none";
        document.getElementById("divBotoes").style.display = "none";
    }
}

document.getElementById("youtube").addEventListener("click", function() {
    document.getElementById("youtube").classList.remove("clicked");
    document.getElementById("local").classList.remove("clicked");
    this.classList.add("clicked");
    showHideElements("youtube");
});

document.getElementById("local").addEventListener("click", function() {
    document.getElementById("youtube").classList.remove("clicked");
    document.getElementById("local").classList.remove("clicked");
    this.classList.add("clicked");
    showHideElements("local");
});

document.getElementById("add_video_local").addEventListener("click", function() {
    document.getElementById("videoFileInput").click();
});