const form = document.querySelector('#add')
// const input = document.querySelector('#add-input')
const list = document.querySelector('#list')

/**
 * CREATE - Adding a note
 */
form.addEventListener('submit', function(e){
    e.preventDefault()
    // console.log(e.target[0].value);
    if(!e.target[0].value) return;

    // const newEl = document.createElement('li')
    // newEl.innerHTML = `
    //     <p>${e.target[0].value}</p>
    //     <p>
    //         <i class="fa fa-pencil"></i>
    //         <i class="fa fa-times"></i>
    //     </p>
    // `

    // list.appendChild(newEl)

    // e.target[0].value = ''

    //create elements
    const li = document.createElement('li')
    const firstP = document.createElement('p')
    const secondP = document.createElement('p')
    const firstIcon = document.createElement('i')
    const secondIcon = document.createElement('i')
    const input = document.createElement('input')

    //create attributes
    firstIcon.className = "fa fa-pencil"
    secondIcon.className = "fa fa-times"
    input.className = "edit-note"
    input.setAttribute('type', 'text')

    firstP.textContent = e.target[0].value

    //appending stage
    secondP.appendChild(firstIcon)
    secondP.appendChild(secondIcon)
    li.appendChild(firstP)
    li.appendChild(secondP)
    li.appendChild(input)
    list.appendChild(li)

    e.target[0].value = ''

})

/**
 * EDIT AND DELETE NOTE
 */

//list === ul :)
list.addEventListener('click', function(e){
    // console.log(this)
    // console.log(e.target.classList[0])
    // console.log(e.target.classList[1])

    if(e.target.classList[1] === 'fa-pencil'){

        let parentP = e.target.parentNode
        parentP.style.display = 'none'

        let note = parentP.previousElementSibling
        let input = parentP.nextElementSibling

        console.dir(parentP);

        input.style.display = 'block'
        input.value = note.textContent

        input.addEventListener('keypress', function(e){

            if(e.keyCode === 13){

                if(input.value !== ''){
                    note.textContent = input.value
                    parentP.style.display = 'block'
                    input.style.display = 'none'
                }else{
                    let li = input.parentNode
                    console.log(li.parentNode)
                }
            }
        })

    }else if(e.target.classList[1] === 'fa-times'){
        let list = e.target.parentNode.parentNode
        list.parentNode.removeChild(list)
    }
})


/**
 * HIDE LIST
 */

let hideItem = document.querySelector('#hide')

hideItem.addEventListener('click', function(){
    
    let label = document.querySelector('label')

    if(hideItem.checked){
        label.textContent = 'Unhide Notes'
        list.style.display = 'none'
    }else{
        label.textContent = 'Hide Notes'
        list.style.display = 'block'
    }

})

/**
 * SEARCH FILTER
 */

let searchInput = document.querySelector('#search-note input')

searchInput.addEventListener('keyup', function(e){

    let searchChar = e.target.value.toLowerCase()
    // console.log(searchChar);

    let notes = list.getElementsByTagName('li')
    // console.log(notes)

    Array.from(notes).forEach((note) => {
        // console.dir(note);
        let parText = note.firstElementChild.textContent

        if(parText.toLocaleLowerCase().indexOf(searchChar) !== -1){
             note.style.display = 'block'
        }else{
            note.style.display = 'none'
        }
    })
})