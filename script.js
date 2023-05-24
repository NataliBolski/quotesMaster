
let quoteCont = document.getElementById('quote_Conteiner');
let quoteTxt = document.getElementById('quote');
let authorTxt = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuotBtn = document.getElementById('new_Quote');
let loader = document.getElementById('loader');
let logo = document.getElementById('logo');

let apiQuotes = []; 

function loading() {
    loader.hidden = false; 
    quoteCont.hidden = true; 
}

function complete() {
    quoteCont.hidden = false; 
    loader.hidden = true; 
}

//New Quot
function newQuote(){
    //Рандомайзер цитат
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorTxt.textContent = 'Unknown';
    } else {
        authorTxt.textContent = quote.author;
    }

    if(quote.text.length > 120) {
        quoteTxt.classList.add('long_Quote');
    } else {
        quoteTxt.classList.remove('long_Quote');
    }
    quoteTxt.textContent = quote.text; 
    complete();

}

// API асинхронка
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL); //запрос к API (возвращает promise с ответом)
        apiQuotes = await response.json();  //конв. в JSON 
        newQuote();
    } catch (error) {
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=
    ${quoteTxt.textContent} - ${authorTxt.textContent}`; 
    window.open(twitterUrl, '_blank'); 
}

newQuotBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote);


//On load 
getQuotes(); 
//loading();


