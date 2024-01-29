const keyAPI="C5gygLuETBkmpxd36JT1IrVDpbHhDalMX6IxPMQ_xbw"
const formEl=document.querySelector('form')
const searchInputEl=document.getElementById("search-input")
const searchResultsEl=document.querySelector(".search-results")
//const searchBtnEl=document.getElementById("search-btn")
const showMoreBtnEl=document.getElementById("show-more")


let inputData="";
let page=1;


async function searchImages(){
    inputData=searchInputEl.value
    //console.log(inputData);
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${keyAPI}`
    //console.log(url);
    const response=await fetch(url)
    const data=await response.json()
    //console.log(data);
    if(page===1){
        searchResultsEl.innerHTML=""
    }
    const results=data.results 
    results.map((result)=>{
        const imageWrapper=document.createElement('div')
        imageWrapper.classList.add('search-result')

        const image=document.createElement("img")

        image.src=result.urls.small
        image.alt=result.alt_description

        const imageLink=document.createElement("a")

        imageLink.href=result.links.html 
        imageLink.target="_blank"
        imageLink.textContent=result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)

        searchResultsEl.appendChild(imageWrapper)
    })

    page++
    
    if(page>1){
        showMoreBtnEl.style.display="block"
    }
    //console.log(result);
}


formEl.addEventListener('submit', (event)=>{
    event.preventDefault()
    //console.log('subm');
    page=1;
    searchImages()
})


showMoreBtnEl.addEventListener("click", ()=>{
    searchImages()
})