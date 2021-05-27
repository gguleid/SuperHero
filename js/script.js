const $container = $('.container');
let currentImgIndex = 0;
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
        <div class="character-info">
            <div>
                <br>
                <strong>Full Name</strong>: ${character.biography['full-name']}
                </br>
            </div>
            <div>
                <br>
                <strong>Aliases</strong>: ${character.biography['aliases']}
                </br>
            </div>
            <div>
            <br>
                <strong>Alightment</strong>: ${character.biography.alignment}
            </div>
        </div>
            <div class="pictures">
                <img id="image" src="${character.image.url}" alt="${character.name}">
            </div>
        `
    })
    $container.html(characterinfo)
}
// $name.html(`<strong>Name</strong>:${character.name}`);
// $fullName.text(character.biography['full-name']);
// $altego.text(character.biography['alter-egos']);
// $publisher.text(character.biography.publisher);
// $image.attr("src", character.image.url)