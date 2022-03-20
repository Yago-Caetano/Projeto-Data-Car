import fipe from './api/fipe.js'
import wikipedia from './api/WikipediaAPI.js'

var MODELO = ""


window.addEventListener('load',async ()=>{

    MODELO = window.localStorage.getItem("marcaNome")

    const carro = await fipe.getVeiculoFromId(window.localStorage.getItem("carro"),
                            window.localStorage.getItem("ano"),
                            window.localStorage.getItem("marca"));

    var doc = ""    

    var fipeContainer = document.getElementsByClassName("fipe-container")[0]
    var listAux = document.createElement("ul")

    Object.entries(carro).map(objDetails=>{

        if(objDetails[0] === "Modelo")
        {
            MODELO += ` ${objDetails[1].split(" ")[0]}`
        }

        let listItem = document.createElement('li')

        let bold = document.createElement('b')
        bold.innerHTML = `${objDetails[0]}: `

        let p = document.createElement('p')
        p.innerHTML = `${objDetails[1]}`

        listItem.appendChild(bold)
        listItem.appendChild(p)

        listAux.appendChild(listItem)


        })

    fipeContainer.appendChild(listAux)

    //get wikipedia data
    fillWikiPediaContainer(await getWikipediaData());
    

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
            let h3 = document.createElement("h3")
            let a = document.createElement('a')

            h3.innerHTML=element.title
            a.href = `https://pt.wikipedia.org/wiki/${element.title.replace(" ","_")}`
            a.innerHTML = "Link"

            div.appendChild(h3)
            div.appendChild(a)
            container.appendChild(div)
        });

        
    }
    else
    {
        let p = document.createElement('p')
        p.innerHTML = ":( Infelizmente não encontramos resultados"
        container.appendChild(p)
    }
}
