import fipe from './api/fipe.js'


window.addEventListener('load',async ()=>{

    console.log("Dados recuperados:")
    console.log(`Marca: ${window.localStorage.getItem("marca")}`)
    console.log(`Carro: ${window.localStorage.getItem("carro")}`)
    console.log(`Ano: ${window.localStorage.getItem("ano")}`)

    const carro = await fipe.getVeiculoFromId(window.localStorage.getItem("carro"),
                            window.localStorage.getItem("ano"),
                            window.localStorage.getItem("marca"));

    var doc = ""    

    var fipeContainer = document.getElementsByClassName("fipe-container")[0]
    var listAux = document.createElement("ul")

    Object.entries(carro).map(objDetails=>{

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



})


window.addEventListener('close',() =>{
    window.localStorage.clear()
})