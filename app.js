document
  .querySelector("#search-button")
  .addEventListener("click", searchHandler);
document
  .querySelector("#giphy-input")
  .addEventListener("keydown", searchHandler);

document
  .querySelector("#remove-button")
  .addEventListener("click", searchHandler);

function searchHandler(e) {
  if (e.keyCode == 13 || e.target.value == "Search Giphy") {
    e.preventDefault();
    const giphyInput = document.querySelector("#giphy-input").value;
    giphySearch(giphyInput);
  } else if (e.target.value == "Remove Images") {
    removeImages();
  }
}

async function giphySearch(giphyInput) {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
      q: giphyInput,
    },
  });
  randomGiphy(res);
}

function randomGiphy(res) {
  const numberOfResults = res.data.data.length;
  console.log(numberOfResults);
  const randomResult =
    res.data.data[`${Math.floor(Math.random() * numberOfResults)}`].images
      .original.url;
  console.log(randomResult);
  addImagetoPage(randomResult);
}

function addImagetoPage(url) {
  const newImage = document.createElement("img");
  const imageResults = document.querySelector("#image-results");
  newImage.src = url;
  $(newImage).attr("object-fit", "contain");
  $(newImage).attr("width", "250px");
  $(newImage).attr("height", "250px");

  imageResults.appendChild(newImage);
  console.log(newImage);
}

function removeImages() {
  const imageResults = document.querySelector("#image-results");
  imageResults.innerHTML = "";
}
