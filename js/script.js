/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

$.ajax("https://www.superheroapi.com/api.php/2813687215612178/search/superman")
.then(function(data){
characters = data;
render();

});

function render() {
    const 
}