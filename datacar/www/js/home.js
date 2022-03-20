import fipe from './api/fipe.js'


var MARCA_SELECIONADA = undefined
var NOME_MARCA_SELECIONADA = undefined
var CARRO_SELECIONADO = undefined
var ANO_SELECIONADO = undefined

window.addEventListener("load",async() =>{
  try{
      const labels = await fipe.getMarcas()


      //fill label select
      var select = document.getElementById('select-marca')

      select.innerHTML = ""

      //define a click listenner
      select.addEventListener('click',labelClick);

      labels.forEach(element => {
        var option = document.createElement("option");
        option.value = `${element.codigo}#${element.nome}`
        option.innerHTML = element.nome
        select.appendChild(option)
      });
  }
  catch{

  }


})

async function labelClick(event)
{
  MARCA_SELECIONADA = event.target.value.split("#")[0];
  NOME_MARCA_SELECIONADA = event.target.value.split("#")[1]

  //take veichles from label
  const models = await fipe.getVeiculosDaMarca(MARCA_SELECIONADA)


  //fill label select
  var selectModel = document.getElementById('select-modelos')

  //clear select
  selectModel.innerHTML = ""

  //define a click listenner
  selectModel.addEventListener('click',modelClick);

  models.modelos.forEach(element => {
        var option = document.createElement("option");
        option.value = element.codigo
        option.innerHTML = element.nome
        selectModel.appendChild(option)
      });

}

async function modelClick(event)
{
  CARRO_SELECIONADO = event.target.value

  const years = await fipe.getYearsFromCarId(MARCA_SELECIONADA,CARRO_SELECIONADO)

  console.log(years)

  //fill years select
  var selectYears = document.getElementById('select-anos')

  //clear select
  selectYears.innerHTML = ""

  //define a click listenner
  selectYears.addEventListener('click',yearClick);

  years.forEach(element => {
        var option = document.createElement("option");
        option.value = element.codigo
        option.innerHTML = element.nome
        selectYears.appendChild(option)
      });


}

async function yearClick(event)
{
  ANO_SELECIONADO = event.target.value
}

document.getElementById("bt-search").addEventListener("click", function( event ) {

    if(MARCA_SELECIONADA && CARRO_SELECIONADO && ANO_SELECIONADO)
    {
      
      window.localStorage.clear();
      window.localStorage.setItem("marca",MARCA_SELECIONADA);
      window.localStorage.setItem("marcaNome",NOME_MARCA_SELECIONADA)
      window.localStorage.setItem("carro",CARRO_SELECIONADO);
      window.localStorage.setItem("ano",ANO_SELECIONADO);

      //muda de tela
      window.location.href="result.html";
    }
    else
    {
      alert("Preencha todos os campos")
    }

  });