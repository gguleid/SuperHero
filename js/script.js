const $container = $('.container');
let currentImgIndex;
let highestIndex;
let characters;
function handleGetData(event) {
    event.preventDefault();
    let searchText = $("input#search").val()
    $.ajax({
            url: `https://www.superheroapi.com/api.php/2813687215612178/search/${searchText}`
        })
        .then(function (data) {
                characters = data;
                render();
            },
            function (error) {
                console.log("bad request: ", error);
            });
}
$('form').on('submit', handleGetData);
function render() {
    let characterinfo = ''
    $.each(characters.results, (index, character) => {
        characterinfo +=
            `    
        <div class="name">
            <div id=name>
                <h2>${character.name}</h2>
            </div>
        </div>
        <div class="container">
        <div class="carousel-container">
        <div class="carousel-images">
        <img id="image" src="${character.image.url}" alt="${character.name}">
        </div>
        <div class="character-info">
            <div id="full-name">
                <br>
                <strong>Full Name</strong>: ${character.biography['full-name']}
                </br>
            </div>
            <div id="aliases">
                <br>
                <strong>Aliases</strong>: ${character.biography['aliases']}
                </br>
            </div>
            <div id="alightment">
            <br>
                <strong>Alightment</strong>: ${character.biography.alignment}
            </div>
            <div class="carousel-button previous">
                        <span class="lnr lnr-chevron-left"></span>
        </div>
            <div class="carousel-button next">
          <span class="lnr lnr-chevron-right"></span>
        </div>
        </div>
      </div>
        </div>
        `
    })
    $container.html(characterinfo)
}
$(() => {
    let currentImgIndex = 0;
    let highestIndex = $('.carousel-images').children().length - 1
    $('.next').on('click', () => {
        $('.carousel-images').children().eq(currentImgIndex).css('display', 'none');
        if (currentImgIndex < highestIndex) {
            currentImgIndex++
            $('.carousel-images').children().eq(currentImgIndex).css('display', 'block');
        } else {
            currentImgIndex = 0;
            $('.carousel-images').children().eq(currentImgIndex).css('display', 'block');
        }
    });
    $('.previous').on('click', () => {
        $('.carousel-images').children().eq(currentImgIndex).css('display', 'none');
        if (currentImgIndex > 0) {
            currentImgIndex--
            $('.carousel-images').children().eq(currentImgIndex).css('display', 'block');
        } else {
            currentImgIndex = highestIndex;
            $('.carousel-images').children().eq(currentImgIndex).css('display', 'block');
        }
    });
});
// $name.html(`<strong>Name</strong>:${character.name}`);
// $fullName.text(character.biography['full-name']);
// $altego.text(character.biography['alter-egos']);
// $publisher.text(character.biography.publisher);
// $image.attr("src", character.image.url)