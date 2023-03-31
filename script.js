let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let cardsBox = document.getElementById("cardsBox");
let nextBtn = document.getElementById("nextBtn");
let goBackBtn = document.getElementById("goBackBtn");
let query = ""; //input search value
let pageNumber = 1;
const auth = "563492ad6f917000010000010eca883fc3f4401a883eaf16d11d4662";

searchBar.addEventListener("keyup", function (event) {
  query = event.target.value;
});
searchBtn.addEventListener("click", function () {
  cardsBox.innerHTML = "";
  getPhotos(query, pageNumber);
});
nextBtn.addEventListener("click", function () {
  cardsBox.innerHTML = "";
  pageNumber += 1;
  getPhotos(query, pageNumber);
  goBackBtn.classList.remove("hidden");
});
goBackBtn.addEventListener("click", function () {
  console.log("click");
  window.history.back();
});

async function getPhotos(query, pageNumber) {
  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=21&page=${pageNumber}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const response = await data.json();
  console.log(response);

  for (let item of response.photos) {
    let imageSrc = `${item.src.large2x}`;
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog); //https://dev.to/sbodi10/download-images-using-javascript-51a9

    let card = `<div class="card" style="background-image: url(${item.src.large})">
    <figcaption class="imgAuthor">📸 by: ${item.photographer}</figcaption>
    <a href="${imageURL}" download="${item.alt}" class="download">\u21E9</a>
    </div>`;

    cardsBox.innerHTML += card;
  }
}
getPhotos();
