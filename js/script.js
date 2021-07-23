

const APP_ID = "c427fdd7";
const APP_KEY = "15f8d86990cbfbe962aef02199af45f5";

const form = document.getElementById("form");
const searchBox = document.getElementById("searchBox");
const main = document.getElementById("main");


// FORM

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const filter = searchBox.value;

    fetchData(filter);

    searchBox.value = "";

})


// FETCH DATA

function fetchData(data) {

    const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${data}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    fetch(URL)
    .then(res => res.json())
    .then(datas => {

        const hits = datas.hits;

        getData(hits);
    })
}


// DISPLAY DATA

function getData(results){

    let output = '';

    results.map(result => {

        let calories = result.recipe.calories;
        let caloriesValue = Math.round(calories);


        output += `
            <div class="box">
                <img src="${result.recipe.image}" alt="Recipe Image" class="recipe__img">
                <div class="info__box">
                    <div class="info">
                        <div class="name">${result.recipe.label}</div>
                        <div class="calories">Calories: ${caloriesValue}</div>
                    </div>
                    <div class="view__link">
                        <a href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                </div>
            </div>
        `;
    })

    main.innerHTML = output;
}