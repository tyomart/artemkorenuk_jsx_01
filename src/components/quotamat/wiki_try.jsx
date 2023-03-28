// const WikiTry = () =>  {

//     const html = async() => await (await fetch('https://en.wikiquote.org/wiki/Special:Random')).text(); // html as text
// const doc = new DOMParser().parseFromString(html(), 'text/html');
// console.log('w ',doc.title, doc.body);




// const apiUrl = 'https://en.wikiquote.org/w/api.php';

// fetch(apiUrl + '?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&exlimit=1&exchars=200&titles=Albert%20Einstein')
//   .then(response => response.json())
//   .then(data => {
//     const quote = data.query.pages[Object.keys(data.query.pages)[0]].extract;
//     console.log(quote);
//   })
//   .catch(error => console.error(error));

// const url = 'https://en.wikiquote.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Lists_of_people_by_name&cmprop=title&cmnamespace=0&cmlimit=500&origin=*';

// fetch(url, {
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     }
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => console.error(error));


//     return <div>wikitry</div>
// }

// export default WikiTry



// This code sends a GET request to the Wikiquote API with the following query parameters:

// - format=json: specifies the API response format as JSON.
// - action=query: specifies the API action as a query.
// - generator=random: specifies that we want a random page.
// - grnnamespace=0: specifies that the random page should be in the main namespace (i.e., articles).
// - prop=extracts: specifies that we want the extract of the page (i.e., the quote).
// - exlimit=1: specifies that we want only one extract (i.e., one quote).
// - exchars=200: specifies that we want only the first 200 characters of the extract (i.e., a short quote).
// - titles=Albert%20Einstein: specifies that we want a random quote from Albert Einstein's articles.

// You can change the titles parameter to fetch random quotes from other articles.

// Note that the returned quote may contain HTML tags that you may want to remove or parse before displayin



// const url = 'https://en.wikiquote.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Lists_of_people_by_name&cmprop=title&cmnamespace=0&cmlimit=500&origin=*';

// fetch(url, {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     }
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => console.error(error));


// In this code, we are fetching the list of pages that belong to the Category:Lists_of_people_by_name 
// category. We are providing the cmprop=title parameter to get only the page titles and we limit 
// the number of pages to 500 using the cmlimit parameter. The origin=* parameter is used to allow 
// Cross-Origin Resource Sharing (CORS) for the API call.

// Once we get the response, we log the data to the console. 
// You can modify this code to suit your needs, 
// such as 
// filtering out the irrelevant pages or processing the page data further.

// To use this code to obtain random quotes from Wikiquote, you would need to write some additional code that calls the "queryTitles" and 
// "getSectionsForPage" functions and extracts a random quote from the returned sections. Here is an example implementation:

// 1. Define a function that takes a random page title, queries the API to get the page ID, and then calls "getSectionsForPage" to get the sections for the page:

// function getRandomPage(callback) {
//   // Choose a random page title from an array of options (e.g. famous quotes)
//   var pageTitles = ["Albert Einstein", "Martin Luther King Jr.", "Nelson Mandela"];
//   var pageTitle = pageTitles[Math.floor(Math.random() * pageTitles.length)];
  
//   // Query the API to get the page ID
//   Wikiquote.queryTitles(pageTitle, function(pageId) {
//     // Get the sections for the page
//     Wikiquote.getSectionsForPage(pageId, function(sections) {
//       // Pass the page title, sections, and a callback function to handle the quote to the main callback function
//       callback({ title: sections.titles, sections: sections.sections, handleQuote: handleQuote });
//     }, function(error) {
//       console.log(error);
//     });
//   }, function(error) {
//     console.log(error);
//   });
// }


// 2. Define a function that takes the page title and sections, selects a random section, and then uses regular expressions to extract a random quote:

// function handleQuote(title, sections) {
//   // Choose a random section index from the available options
//   var sectionIndex = Math.floor(Math.random() * sections.length);
//   var section = sections[sectionIndex];
  
//   // Remove any text that is not part of a quote (e.g. section heading)
//   var quoteRegex = /\"([^\"]+)\"/g;
//   var quotes = [];
//   var match = quoteRegex.exec(section.text);
//   while (match != null) {
//     quotes.push(match[1]);
//     match = quoteRegex.exec(section.text);
//   }
  
//   // Choose a random quote from the available options
//   var quoteIndex = Math.floor(Math.random() * quotes.length);
//   var quote = quotes[quoteIndex];
  
//   // Display the quote in the console
//   console.log(title + ": " + quote);
// }


// // 3. Call the "getRandomPage" function and pass it the "handleQuote" function as the callback:

// getRandomPage(function(page) {
//   page.handleQuote(page.title, page.sections);
// });


// This will choose a random page title from the available options, query the API to get the page ID, 
// and then retrieve the sections for the page. It will then select a random section and extract a random quote from that section using regular expressions. 
// Finally, it will display the quote in the console. You can repeat this 
// process as many times as you like to get different random quotes.