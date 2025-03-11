
// https://api.unsplash.com/search/photos?page=1&query=football&per_page=10&client_id=Me6fB5-_arQczhwxQHiNbv83FSku5S5EF5EZOm2N8Hw

const form = document.querySelector("form");
const input = document.querySelector("#searchInput");
const searchBtn = document.querySelector("button");
const ACCESS_key = "Me6fB5-_arQczhwxQHiNbv83FSku5S5EF5EZOm2N8Hw";
const imgContainer = document.querySelector(".imgContainer");

let page = 1;

// const API_key =  "<https://api.unsplash.com/search/photos?page=1&query=office>";

//  Secret Key : UqftjDwcbwPEZpvz52BRMV3R8f4UFyqgF1MhNyYqv3o


form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchURL();
});
async function fetchURL() {
    try {
        const query = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${input.value}&per_page=10&client_id=${ACCESS_key}`)
        const result = await query.json();
        console.log(result.results);

        displayData(result.results);
    }
    catch (error) {
        console.log("Error occurs");
    }
}

function displayData(data) {
    if (page == 1) {
        imgContainer.innerHTML = "";
    }

    data.forEach((obj) => {
        const parent = document.createElement("div");
        const image = document.createElement("img");
        const imgDesc = document.createElement("a");

        parent.classList.add("parent");
        image.classList.add("image");
        imgDesc.classList.add("img-desc");

        image.src = obj.urls.regular;
        imgDesc.innerText = obj.alt_description;
        imgDesc.href = obj.links.html;
       
        parent.append(image, imgDesc);
        imgContainer.append(parent);

    });
    if (data.length > 0) {
        showMoreBtn.style.display = "block";
    }
    else {
        showMoreBtn.style.display = "none";

    }


}
const showMoreBtn = document.createElement("button");
showMoreBtn.classList.add("showMoreBtn");
showMoreBtn.innerText = "Show more";

showMoreBtn.style.display = "none";

document.querySelector(".wrapper").appendChild(showMoreBtn);


showMoreBtn.addEventListener("click", () => {
    page = page + 1;
    fetchURL();
});