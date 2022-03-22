import fipe from './api/fipe.js'
import wikipedia from './api/WikipediaAPI.js'
import gImage from './api/googleImage.js'


var MODELO = ""

/*
    Add click listenner to header logo
*/
document.getElementById("header-logo").addEventListener('click',()=>{
    window.location.href = "home.html"
})


window.addEventListener('load',async ()=>{

    showLoading()

    MODELO = window.localStorage.getItem("marcaNome")



    const carro = await fipe.getVeiculoFromId(window.localStorage.getItem("carro"),
                            window.localStorage.getItem("ano"),
                            window.localStorage.getItem("marca"));

    var doc = ""    

    var fipeContainer = document.getElementsByClassName("fipe-container")[0]
    var tableAux = document.createElement("table")

    Object.entries(carro).map(objDetails=>{

        let tableRow = document.createElement('tr')

        if(objDetails[0] === "Modelo")
        {
            MODELO += ` ${objDetails[1].split(" ")[0]}`
        }


        let bold = document.createElement('b')
        bold.innerHTML = `${objDetails[0]}: `

        let td = document.createElement('td')
        td.appendChild(bold)

        tableRow.appendChild(td)


        let td2 = document.createElement('td')
        td2.innerHTML = `${objDetails[1]}`

        tableRow.appendChild(td2)
        

        /*listItem.appendChild(bold)
        listItem.appendChild(p)*/

        tableAux.appendChild(tableRow)


        })

    fipeContainer.appendChild(tableAux)

    //get wikipedia data
    fillWikiPediaContainer(await getWikipediaData());
    
    //load image
    const gReturn = await gImage.searchGoogleImage(MODELO + " Foto")

    let imgCotainer = document.getElementsByClassName("img-container")[0]
    
    let img = document.createElement('img')
    img.src = gReturn.items[0].pagemap.cse_image[0].src
    
    imgCotainer.appendChild(img)
    
    hideLoading()

})



window.addEventListener('close',() =>{
    window.localStorage.clear()
})


async function getWikipediaData()
{
    if(MODELO.length === 0)
    {
        //lançar excessão
        alert("Erro ao ler dados do wikipedia")
        return;
    }
   const wikiSearch = await wikipedia.searchWikipediaArticles(MODELO);
   return wikiSearch
}


function fillWikiPediaContainer(data)
{

    let jData = JSON.parse(data)
    let container = document.getElementsByClassName("wiki-container")[0]

    if(jData.query.search.length>0)
    {
        jData.query.search.forEach(element => {

            let div = document.createElement("div")
            div.className = "wiki-item"

            let divHeader = document.createElement('div')
            divHeader.className = "wiki-item-header"

            let wikiIcon = document.createElement('i')
            wikiIcon.className = "fa fa-brands fa-wikipedia-w"

            let h3 = document.createElement("h3")

            let a = document.createElement('a')

            h3.innerHTML=element.title
            a.href = `https://pt.wikipedia.org/wiki/${element.title.replace(" ","_")}`
            a.innerHTML = "Link do artigo"

            divHeader.appendChild(wikiIcon)
            divHeader.appendChild(h3)

            div.appendChild(divHeader)
            div.appendChild(a)
            container.appendChild(div)
        });

        
    }
    else
    {
        let div = document.createElement("div")
        div.className = "wiki-item"

        let p = document.createElement('p')
        p.innerHTML = ":( Infelizmente não encontramos resultados"

        div.appendChild(p)
        container.appendChild(div)
    }
}


async function getWolframData()
{
    const wolframResp = await wolfram.executeQuery(MODELO)
    console.log(wolframResp)
}


function showLoading()
{
    document.getElementById("loading").style.display = 'flex'
    document.getElementsByClassName("result-container")[0].style.display = 'none'

}

function hideLoading(){
  document.getElementById("loading").style.display = 'none'
  document.getElementsByClassName("result-container")[0].style.display = 'flex'
}