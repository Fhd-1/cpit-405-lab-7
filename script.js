const xhrSearchBtn = document.getElementById("xhrSearch");
xhrSearchBtn.addEventListener("click", searchUsingXHR);
const fetchSearchBtn = document.getElementById("fetchSearch");
fetchSearchBtn.addEventListener("click", searchUsingFetch);
const fetchAsyncAwaitBtn = document.getElementById("fetchAsyncAwaitSearch");
fetchAsyncAwaitBtn.addEventListener("click", searchUsingFetchAsyncAwait);
const searchQuery = document.getElementById("queryInput");
const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "Hpd5BHu8Gzm1DXok7W8OxXUY5PyHOEbTNY7vnCbKbmQ";

function searchUsingXHR() {
    let queryTerm = searchQuery.value.trim();
    clearResults();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}?query=${queryTerm}`, true);
    xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let responseText = xhr.responseText;
            let responseObj = JSON.parse(responseText);
            createImages(responseObj);
        }
    };

    xhr.send();
}

function searchUsingFetch() {
    let queryTerm = searchQuery.value.trim();
    clearResults();

    fetch(`${API_URL}?query=${queryTerm}`, {
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            createImages(data);
        });
}

async function searchUsingFetchAsyncAwait() {
    let queryTerm = searchQuery.value.trim();
    clearResults();

    const response = await fetch(`${API_URL}?query=${queryTerm}`, {
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
        },
    });

    const data = await response.json();
    createImages(data);
}

function clearResults() {
    const resultsElem = document.getElementById("results");
    resultsElem.innerHTML = "";
}

function createImages(data) {
    const resultsElem = document.getElementById("results");

    for (let item of data.results) {
        let imgElem = document.createElement("img");
        imgElem.src = item.urls.small;
        imgElem.alt = item.alt_description;
        resultsElem.appendChild(imgElem);
    }
}








