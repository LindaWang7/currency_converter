const dropList = document.querySelectorAll(".form-box  select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select");
    // getButton = document.querySelector(".form-box  button");

var droplist_len = dropList.length;

for (let i = 0; i < droplist_len; i++) {
    for (let currency_code in country_list) {
        //Default, USD --> CAD conversion
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "CAD" ? "selected" : "";
        // Option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // Inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

// if currency code of country list is equal to option value
// selecting img tag of particular drop list
// passing country code of a selected currency code in a img url
function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) { 
            let imgTag = element.parentElement.querySelector("img"); 
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});
$('.form-box  button').click((e)=>{
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
})
// getButton.addEventListener("click", e => {
//     e.preventDefault(); //preventing form from submitting
//     getExchangeRate();
// });

// const exchangeIcon = document.querySelector(".form-box  .icon");
// exchangeIcon.addEventListener("click", () => {
//     let tempCode = fromCurrency.value; // temp currency code of FROM drop list
//     fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
//     toCurrency.value = tempCode; // passing temp currency code to TO currency code
//     loadFlag(fromCurrency);
//     loadFlag(toCurrency); 
//     getExchangeRate(); 
// })
$('.form-box  .icon').click(()=>{
    let tempCode = fromCurrency.value; // temp currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temp currency code to TO currency code
    loadFlag(fromCurrency);
    loadFlag(toCurrency); 
    getExchangeRate(); 
})

function getExchangeRate() {
    // const amount = document.querySelector(".form-box  input");
    // const exchangeRateTxt = document.querySelector(".form-box  .exchange-rate");
    // let amountVal = amount.value;
    let amountVal=$(".form-box  input").val();
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    $('.form-box  .exchange-rate').html('Getting exchange rate...') ;
    let url = `https://v6.exchangerate-api.com/v6/ecd20b2a4db2ac2d7098a691/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        $('.form-box  .exchange-rate').html(`${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`) ;
        // exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() => { // if user is offline or any other error occured while fetching data then catch function will run
        // exchangeRateTxt.innerText = "Something went wrong";
        $('.form-box  .exchange-rate').htm('Something went wrong')
    });
}