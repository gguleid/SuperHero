const $container = $('.container');
let characters=[];
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
    let highestIndex = characters.results.length
    $.each(characters.results, (index, character) => {
        characterinfo +=
            ` 
                <div class= "card">   
                    <div id=name>
                        <h2>${character.name}</h2>
                    </div>
                <div class="carousel-container">
                

                        <div class="carousel-images">
                            <img id="image" src="${character.image.url}" alt="${character.name}">
                        </div>

                        <div class="character-info">
                            <div id="full-name">
                                
                                <strong>Full Name</strong>: ${character.biography['full-name']}
                                <br>
                            </div>

                            <div id="aliases">
                                
                                <strong>Aliases</strong>: ${character.biography['aliases']}
                                <br>
                            </div>

                            <div id="alightment">
                                <br>
                                <strong>Alightment</strong>: ${character.biography.alignment}
                            </div>
                            <div class ="button">
                                <div class="carousel-button previous">
                                    <span class="lnr lnr-chevron-left"></span>
                                </div>

                                <div class="carousel-button next">
                                    <span class="lnr lnr-chevron-right"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        $container.html(characterinfo)
        $('.card').hide();
        $('.card:eq(0)').show();

        $(() => {
            let currentImgIndex =0;
            $('.next').on('click', () => {
                $(`.card:eq(${currentImgIndex})`).hide();
                if (currentImgIndex <= highestIndex) {
                    currentImgIndex++
                    $(`.card:eq(${currentImgIndex})`).show();
                } else if(currentImgIndex > highestIndex) { 
                     currentImgIndex = 0;
                    $(`.card:eq(${currentImgIndex})`).show();
                }
            });
           
            $('.previous').on('click', () => {
                $(`.card:eq(${currentImgIndex})`).hide();
                if (currentImgIndex > 0) {
                    currentImgIndex--
                    $(`.card:eq(${currentImgIndex})`).show();
                } else {
                    currentImgIndex > highestIndex;
                    $(`.card:eq(${currentImgIndex})`).show();
                }
            });
        });
    })
   
   
}
// $name.html(`<strong>Name</strong>:${character.name}`);
// $fullName.text(character.biography['full-name']);
// $altego.text(character.biography['alter-egos']);
// $publisher.text(character.biography.publisher);
// $image.attr("src", character.image.url)