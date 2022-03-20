
const API_ID = "8Y5T3W-9XE2AQXWE5"

function executeQuery(queryText)
{


      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.wolframalpha.com/v2/query?input=${queryText}&appid=${API_ID}`)}`)
            .then(response => {
                  if (response.ok) return response.json()
                  throw new Error('Network response was not ok.')
                })
            .then(data =>{
              var parser = new DOMParser();
              var xmlDoc = parser.parseFromString(data.contents,"text/xml");
              
            });

}


export default({executeQuery})

