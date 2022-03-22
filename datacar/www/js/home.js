import fipe from './api/fipe.js'


var MARCA_SELECIONADA = undefined
var NOME_MARCA_SELECIONADA = undefined
var CARRO_SELECIONADO = undefined
var ANO_SELECIONADO = undefined

window.addEventListener("load",async() =>{
  try{
      showLoading()
      const labels = await fipe.getMarcas()


      //fill label select
      var select = document.getElementById('select-marca')

      select.innerHTML = ""

      let lbOption = document.createElement('option')
      lbOption.selected = true
      lbOption.disabled = true
    
      lbOption.innerHTML = "Selecione um fabricante"
      select.appendChild(lbOption)

      //define a click listenner
      select.addEventListener('change',labelClick);

      labels.forEach(element => {
        var option = document.createElement("option");
        option.value = `${element.codigo}#${element.nome}`
        option.innerHTML = element.nome
        select.appendChild(option)
      });
  }
  catch{

  }
  hideLoading()

})





async function labelClick(event)
{
  MARCA_SELECIONADA = event.target.value.split("#")[0];
  NOME_MARCA_SELECIONADA = event.target.value.split("#")[1]

  showLoading()
  //take veichles from label
  const models = await fipe.getVeiculosDaMarca(MARCA_SELECIONADA)

 
  var selectModel = document.getElementById('select-modelos')

  //clear select
  selectModel.innerHTML = ""


  var selectAno = document.getElementById('select-anos')

  selectAno.innerHTML = ""


  let Option = document.createElement('option')
  Option.selected = true
  Option.disabled = true

  Option.innerHTML = "Selecione um Modelo"
  selectModel.appendChild(Option)

  let yOption = document.createElement('option')
  yOption.selected = true
  yOption.disabled = true

  yOption.innerHTML = "Selecione um Ano"
  selectAno.appendChild(yOption)


  //define a click listenner
  selectModel.addEventListener('change',modelClick);

  models.modelos.forEach(element => {
        var option = document.createElement("option");
        option.value = element.codigo
        option.innerHTML = element.nome
        selectModel.appendChild(option)
      });

  hideLoading()


}

function showLoading()
{
    document.getElementById("loading").style.display = 'flex'
    document.getElementsByClassName("container")[0].style.display = 'none'

}

function hideLoading(){
  document.getElementById("loading").style.display = 'none'
  document.getElementsByClassName("container")[0].style.display = 'flex'
}


async function modelClick(event)
{
  CARRO_SELECIONADO = event.target.value

  showLoading()
  const years = await fipe.getYearsFromCarId(MARCA_SELECIONADA,CARRO_SELECIONADO)

  console.log(years)

  //fill years select
  var selectYears = document.getElementById('select-anos')

  selectYears.innerHTML = ""

  let nOption = document.createElement('option')
  nOption.selected = true
  nOption.disabled = true

  nOption.innerHTML = "Selecione um ano"
  selectYears.appendChild(nOption)

  //define a click listenner
  selectYears.addEventListener('change',yearClick);

  years.forEach(element => {
        var option = document.createElement("option");
        option.value = element.codigo
        option.innerHTML = element.nome
        selectYears.appendChild(option)
      });

      hideLoading()

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