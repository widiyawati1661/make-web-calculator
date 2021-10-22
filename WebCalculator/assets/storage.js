const CACHE_KEY = "calculation_history";

function checkForStorage(){
    return typeof(Storage) !== "undefined"
}

function putHistory(data){
    if(checkForStorage()){
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null){
            historyData = [];
        }else{
            historyData =JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if(historyData.length > 5){
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory(){
    if (checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }else{
        return[];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    //selalu hapus konten HTML pada elemen historylist spy datanya gk ganda
    historyList.innerHTML = "";
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
        historyList.appendChild(row);
    }
 }
  
 renderHistory();
 //Terakhir kita gunakan fungsi putHistory() yang sudah kita buat ketika kalkulator melakukan proses kalkulasi, tepatnya pada fungsi performCalculation() berkas kalkulator.js.
 //Sebelum memanggil fungsi putHistory(), tentu kita harus menyiapkan data yang akan dikirimkan sebagai argumen fungsi tersebut. Pada performCalculation() kita buat variabel baru dengan nama history yang merupakan objek dari data history yang akan dikirimkan. Struktur objeknya tampak seperti berikut:
 
 const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
 }

 function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
  
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
 }