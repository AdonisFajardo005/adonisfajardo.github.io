function toggleMenu(){
document.getElementById("nav").classList.toggle("show");
}

fetch("https://api.github.com/users/AdonisFajardo005/repos")
.then(res => res.json())
.then(data => {

const repos = document.getElementById("repos")

data.slice(0,6).forEach(repo => {

const div = document.createElement("div")

div.className="repo"

div.innerHTML=`

<h3>${repo.name}</h3>

<p>${repo.description || "Proyecto de software"}</p>

<a href="${repo.html_url}" target="_blank">Ver repositorio</a>

`

repos.appendChild(div)

})

})