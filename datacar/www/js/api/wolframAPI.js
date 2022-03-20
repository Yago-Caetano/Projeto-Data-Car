
const API_ID = "8Y5T3W-9XE2AQXWE5"

function executeQuery(queryText)
{

  return new Promise(
    function(resolve,reject)
      {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.wolframalpha.com/v2/query?input=${queryText.replace(" ","+")}&appid=${API_ID}`)}`)
        .then(response => {
              if (response.ok) return response.json()
              throw new Error('Network response was not ok.')
            })
        .then(data =>{
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(data.contents,"text/xml");
          resolve(xmlDoc)
        }).catch(err=>{reject(err)})
      }
  )
      

}


export default({executeQuery})

