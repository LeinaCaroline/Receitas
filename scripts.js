/*
    Passo a passo da nossa construção:

[x] Pegar a informação do Input, quando o botão for clicado
[x] Ir até a API e trazer as receitas 
[x] Colocar as receitas na tela
[x] Saber qundo o usuário clicou em uma receita
[x] Buscar informações da receita individual na API
[x] Colocar a receita individual na tela
 */

// isso busca no html a informação
const form = document.querySelector('.search_form')
const recipeList = document.querySelector('.recipe_list') // ele procura esse recipe_list
const recipe_details = document.querySelector('.recipe_details')

form.addEventListener('submit', function (event) {
    event.preventDefault() // previne a atualização desnecessária

    const inputValue = event.target[0].value
    //console.log(event.target[0].value)

    searchRecipes(inputValue)


})


//Mapear isso para essa função para github  - Pesquisa a receita pelo input
async function searchRecipes(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,)


    recipeList.innerHTML = `<P>Carregando receitas ... </P>`
    try{const data = await response.json() //transformando em json

        //console.log(data)
        showRecipes(data.meals)
    }catch(err){
        recipeList.innerHTML = `<P>Nenhuma receita encontrada</P>`
    }
    
}


function showRecipes(recipes) {  //tempate string pq dá pra pular linha - Vemos a receita na tela
    recipeList.innerHTML = recipes.map(item => `  
        <div class="recipe-card" onclick="getRecipesDetails(${item.idMeal})">
           <img src="${item.strMealThumb}" alt ="receita-foto"> 
           <h3>${item.strMeal}</h3>
        </div>
        
        `).join('')

}// estilizando o recipe-card no css


//quando o usuário clica na receita - vamos ver mais detalhes da receita
async function getRecipesDetails(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,)
    const data = await response.json() //transformando em json

    const recipe = data.meals[0]

    console.log(data)

    let ingredients = ''  

    for(let i=1; i<=20; i++){
        if(recipe[`strIngredient${i}`]){
            ingredients+= `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`
        }else{
            break;
        }
    }

    //  target="_blank" sempre abre o linck em uma nova aba do meu navegador
    recipe_details.innerHTML = `
    <h1>${recipe.strMeal}</h1>
    <img src= "${recipe.strMealThumb}" alt= "${recipe.strMeal} class = "resipe.img">
    <h3> Categoria: ${recipe.strCategory}</h3>
    <h3> Origem: ${recipe.strArea}</h3>
    <h3>Ingredientes: </h3>
    <ul>${ingredients}</ul>
    <h3>Instruções: </h3>
    <p>${recipe.strInstructions}</p>
    <p> Tags: ${recipe.strTags}</p>
    <p>Vídeo: <a href= "${recipe.strYouTube}" target="_blank"> Assista no YouTube</a>${recipe.strTags}</p>

    
    
    `



}
