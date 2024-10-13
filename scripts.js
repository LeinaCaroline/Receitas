/*
    Passo a passo da nossa construção:

[x] Pegar a informação do Input, quando o botão for clicado
[x] Ir até a API e trazer as receitas 
[] Colocar as receitas na tela
[] Saber qundo o usuário clicou em uma receita
[] Buscar informações da receita individual na API
[] Colocar a receita individual na tela
 */

// isso busca no html a informação
const form = document.querySelector('.search_form')

form.addEventListener('submit', function(event){
    event.preventDefault() // previne a atualização desnecessária

    const inputValue = event.target[0].value
    //console.log(event.target[0].value)

    searchRecipes(inputValue)


})


async function searchRecipes(ingredient){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const data = await response.json()
    console.log(data)
}


