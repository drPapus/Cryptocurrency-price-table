const requestURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

//const requestURL = 'https://jsonplaceholder.typicode.com/users'

//const requestURL = 'https://jsonplaceholder.typicode.com/todos'

function sendRequest(method, url) {
     const headers = {
          'Content-Type': 'application/json'
     }
     return fetch(url, {
         method,
         headers: headers
     }).then(response => {
          if(response.ok){
               return response.json()
          }
          return response.json().then( error => {
               const e = new Error('Somthing wrong')
               e.data = error
               throw e
          } )
         
     })
}
sendRequest('GET', requestURL)
.then(function (data) {
     appendData(data)
     //console.log(data)
     //console.table(data)
})
.catch(err => console.log(err))

let words = [];

 function appendData(data) {

     data.sort(function (a, b) {
          let keyA = a.current_price;
          let keyB = b.current_price;
          if(keyA < keyB) return 1;
          if(keyA > keyB) return -1;
          return 0;
     })

     // data.sort(function (a, b) {
     //      let keyA = a.name;
     //      let keyB = b.name;
     //      if(keyA < keyB) return 1;
     //      if(keyA > keyB) return -1;
     //      return 0;
     // })


     // data.sort(function (a, b) {
     //      let keyA = a[sortProperty];
     //      keyB = b[sortProperty];
     //      if(keyA < keyB) return -1;
     //      if(keyA > keyB) return 1;
     //      return 0;
     // })
// console.table()

//      data.forEach(element => {
//           Object.values(element).forEach(el =>{
//               if (!isNaN(el)) {
//                console.log(el)
              
//               }            
//      }) 
// })

//console.table(data)
     

     let myTable = document.querySelector('#table')
     let table = document.createElement('table');
     table.setAttribute("class", "table table-bordered")
     let headerRow = document.createElement('thead');

     const headers = Array.from(new Set(data.map(Object.keys).flat()));

     headers.forEach(headerText => {
          let header = document.createElement('th');
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header)
     });

     // data.forEach(elem => {
          
     //      let row = document.createElement('tr');
     //      Object.values(elem).forEach(text =>{ 
     //      let cell = document.createElement('td');
     //      let textNode = document.createTextNode(text);
     //      cell.appendChild(textNode);
     //      row.appendChild(cell)
     //      })
     //      table.appendChild(row);  
     // })

     // table.appendChild(headerRow);
     // myTable.appendChild(table);

     /////////////////////////////////////////////start input

     let input = document.getElementById("input");
     let suggestion = document.getElementById("suggestion");
     //clear
     window.onload = () => {
          input.value = "";
          clearSuggestion();
     };
     const clearSuggestion = () => {
          suggestion.innerHTML = "";
     };

      const clearSuggTable = () => {
           table.innerHTML = "";
      };

        //check words with inp
     const caseCheck = (word) => {
          word = word.split("");
     let inp = input.value;
     for (let i in inp) {
          if (inp[i] == word[i]) {
            continue;
          } else if (inp[i].toUpperCase() == word[i]) {
            word.splice(i, 1, word[i].toLowerCase());
          } else {
            word.splice(i, 1, word[i].toUpperCase());
          }
        }
        return word.join("");
      };

      input.addEventListener("input", (e) => {
          clearSuggestion();
          clearSuggTable();

     //////
          data.forEach(element => {
               for (const key in element) {
                    if (Object.hasOwnProperty.call(element, key)) {
                        // console.log(key + " -> " + element[key]);
                         words.push(element[key])
                              //console.log(words)
                              let regex = new RegExp("^" + input.value, "i");
                              for (let i in words) {
                              if (regex.test(words[i]) && input.value != "") {
                                   words[i] = caseCheck(words[i]);
                                   suggestion.innerHTML = words[i];

                                   if(words[i] == element[key]){
                                       // data.forEach(elem => {
                                             let row = document.createElement('tr');
                                             Object.values(element).forEach(text =>{   

                                             let cell = document.createElement('td');
                                             let textNode = document.createTextNode(text);
                                             cell.appendChild(textNode);
                                             row.appendChild(cell)
                                             })
                                             table.appendChild(row);  
                                       // }) 
                                        break;
                                   }
                              }  
                         } 
                    
                    }  
               }
          })
     /////
     table.appendChild(headerRow);
     myTable.appendChild(table);


     //console.table(data)

    
     
     
     })


/////////////////////////////////////////end input
     



    
  
}




