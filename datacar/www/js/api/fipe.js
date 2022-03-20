async function getYearsFromCarId(marcaCod,carId)
{
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCod}/modelos/${carId}/anos`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const json = await response.json();

        return json;

      }
      catch(error) {
        console.error(`Could not get veihcles: ${error}`);
      }
}



async function getVeiculoFromId(carroId,anoId,marcaCod)
{
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCod}/modelos/${carroId}/anos/${anoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const json = await response.json();

        return json;

      }
      catch(error) {
        console.error(`Could not get veihcles: ${error}`);
      }
}


async function getVeiculosDaMarca(marcaCod)
{
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCod}/modelos`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const json = await response.json();

        return json;

      }
      catch(error) {
        console.error(`Could not get veihcles: ${error}`);
      }
}

async function getMarcas()
{


    try {
        const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const json = await response.json();

        return json;

      }
      catch(error) {
        console.error(`Could not get veihcles: ${error}`);
      }


}


export default({getMarcas,getVeiculosDaMarca,getVeiculoFromId,getYearsFromCarId})