

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for( state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

    } )
}

populateUFs()

    function getCities(event) {
        const citySelect = document.querySelector("select[name=city]")
        const stateInput = document.querySelector("input[name=state]")

        const ufValue = event.target.value

        const indexOfSelectedState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfSelectedState].text

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option>Selecione a cidade </option>"
        citySelect.disabled = true

        fetch(url)
    .then( res => res.json())
    .then( cities => {

        for( city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })
    }

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover classe
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    console.log(itemId)


    //Verificar se existem itens selecionados
    //se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })


    //Se já tiver selecionado, tirar da seleção
    if (alreadySelected != -1) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else {
        //se não tiver selecionado adicionar
        selectedItems.push(itemId)
    }

    console.log(selectedItems)

    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}