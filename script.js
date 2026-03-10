function goToGithub(){

window.open(
"https://github.com/AdonisFajardo005",
"_blank"
);

}


/* animación scroll */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible")

}

})

})

document.querySelectorAll(".fade-in").forEach(el=>{

observer.observe(el)

})


/* repositorios github */

fetch("https://api.github.com/users/AdonisFajardo005/repos")

.then(res=>res.json())

.then(data=>{

const repos=document.getElementById("repos")

data.slice(0,6).forEach(repo=>{

const card=document.createElement("div")

card.className="repo-card"

card.innerHTML=`

<h3>${repo.name}</h3>

<p>${repo.description || "Proyecto de desarrollo"}</p>

<a href="${repo.html_url}" target="_blank">
Ver repositorio
</a>

`

repos.appendChild(card)

})

})

