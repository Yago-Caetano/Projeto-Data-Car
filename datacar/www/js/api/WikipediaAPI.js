
  function searchWikipediaArticles(query){
    console.log(`Termo de procura: ${query}`)
    return  new Promise(
      function(resolve,reject)
      {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json`)}`)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
        .then(data => resolve(data.contents)).catch(err => reject(err))
      }
    )
  }


export default({searchWikipediaArticles})