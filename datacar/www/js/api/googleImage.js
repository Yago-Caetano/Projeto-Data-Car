
const API_KEY = "AIzaSyAWwdrlYnZFb_eKSSnCgHut8DmiFb5Jfvc"
const CX = "bb9fefbbb2b3122b2"

  function searchGoogleImage(query){
    console.log(`Termo de procura: ${query}`)
    return  new Promise(
      function(resolve,reject)
      {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&q=${query}&cx=${CX}`)
        .then(response => {
          if (response.ok) 
             resolve(response.json())
        }).catch(err=>{reject(err)})
      }
    )
  }


export default({searchGoogleImage})