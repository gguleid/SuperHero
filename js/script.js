const $name = $("#name");
const $fullName = $("#full-name");
const $altego = $("#alter-egos");
const $publisher = $("#publisher");
const $image = $("#image");
let characters;


function handleGetData(event){
    event.preventDefault();
    let searchText = $("input#search").val()
$.ajax({
    url: `https://www.superheroapi.com/api.php/2813687215612178/search/${searchText}`
})
    .then(function (data) {
        $characters = data;
        render();
    },
    function (error){
        console.log("bad request: ", error);
    });
}

$('form').on('submit', handleGetData);

function render() {
    $name.text($characters.results[0].name);
    $fullName.text($characters.results[0].biography['full-name']);
    $altego.text($characters.results[0].biography['alter-egos']);
    $publisher.text($characters.results[0].biography.publisher);
    $image.attr("src", $characters.results[0].image.url)
}