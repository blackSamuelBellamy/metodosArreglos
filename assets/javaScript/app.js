const workListDiv = document.querySelector('.workListDiv')
const form = document.querySelector('.form')
const button = document.querySelector('.boton')
const input = document.getElementById('input')
const currentId = document.querySelector('.tareaDescription')
const total = document.querySelector('.total')
const realizadas = document.querySelector('.realizadas')
let e = 0

window.addEventListener('load', () => input.value = '')


const workList = [
    {
        id: 1,
        tarea: 'Bañarse',
        realizada: false
    },

    {
        id: 2,
        tarea: 'Desayunar',
        realizada: false
    },

    {
        id: 3,
        tarea: 'Aprender Javascript',
        realizada: false
    }
]

const totalTareas = () =>{
    workList.length == 1 ? total.textContent = `Tienes una tarea en total.`:
    total.textContent = `Tienes ${workList.length} tareas en total.`
}

const totalCompletadas = () =>{
   const totalDoneTasks = workList.filter(tarea => tarea.realizada == true)
   totalDoneTasks.length == 1 ? realizadas.textContent = `Tienes una tarea completada.`:
    realizadas.textContent = `Tienes ${totalDoneTasks.length} tareas realizadas.`
}

const Typing = () => {
    const message = " Escribe tu nueva tarea aquí..."

    if( e < message.length) {
        input.value += message.charAt(e);
        e ++;
        setTimeout(Typing, 100)
        if(e == message.length) input.value = ''
       
    }
}

Typing()

const asignarId = () => {

    let contador = 1
    workList.forEach(item => {
        item.id = contador
        contador++
    })
}

const idDivs = () => {
    const divsContainer = document.querySelectorAll('.tareaDiv')
    const idDesplegados = document.querySelectorAll('.tareaDescription')
    let contador = 1

        divsContainer.forEach(item => {
            item.id = contador
            contador ++
        })

    contador = 1
        idDesplegados.forEach(item => {
            item.setAttribute('data-id', contador) 
            contador ++         
        })
   }


const desplegarLista = (tarea, id) => {

    const tareaDiv = document.createElement('div')
    tareaDiv.setAttribute('id', id)
    tareaDiv.classList.add('tareaDiv')
    const tareaDescription = document.createElement('div')
    tareaDescription.classList.add('tareaDescription')
    const p = document.createElement('p')
    p.classList.add('p')
    p.textContent = tarea
    const iconCheck = document.createElement('i')
    iconCheck.classList.add('fa-solid', 'fa-check')
    const iconDelete = document.createElement('i')
    iconDelete.classList.add('fa-solid', 'fa-xmark')
    tareaDescription.appendChild(p)
    tareaDiv.appendChild(tareaDescription)
    tareaDiv.appendChild(iconCheck)
    tareaDiv.appendChild(iconDelete)
    workListDiv.appendChild(tareaDiv)
    tareaDescription.setAttribute('data-id', id)
    asignarId()
}

const listaInicial = () => {

    workList.forEach(lista => {
        desplegarLista(lista.tarea, lista.id)
    })
}

function createWorks() {
    this.id = workList.length + 1
    this.tarea = input.value
    this.realizada = false
}

const creationgNewTask = () => {
    const nuevaTarea = new createWorks()
    workList.push(nuevaTarea)
    desplegarLista(input.value, nuevaTarea.id)
    totalTareas()
    input.value = ''
}


button.addEventListener('click', () => {
    if (input.value !== '') creationgNewTask()
})

document.addEventListener('keypress', e => {
    if (input.value !== '' && e.keyCode == 13) creationgNewTask()
})


const cambiarEstado = () => {

    workListDiv.addEventListener('click', e => {

        if (e.target.className.includes("fa-check")) {
            e.target.parentNode.style.background = 'rgba(10, 245, 50, .6)'
            const currentIndex = workList.findIndex(item => item.id == e.target.parentNode.id)
            workList[currentIndex].realizada = true
            totalCompletadas()
            e.target.style.opacity = '0'
            e.target.style.cursor = 'auto'
        }
    })
}

const deleteTask = () => {
    workListDiv.addEventListener('click', e => {
        if (e.target.className.includes("fa-xmark")) {
            workList.splice(`
            ${workList.findIndex(item => item.id == e.target.parentNode.id)}`, 1)
            asignarId()
            e.target.parentNode.remove()
            idDivs()
            totalTareas()
            totalCompletadas()
        }
    })
}

listaInicial()
cambiarEstado()
deleteTask()
totalTareas()

//------- particules
particlesJS('particles-js',{"particles":{"number":{"value":80,"density":{"enable":!0,"value_area":800}},"color":{"value":"#ccc"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":!1,"anim":{"enable":!1,"speed":1,"opacity_min":0.1,"sync":!1}},"size":{"value":5,"random":!0,"anim":{"enable":!1,"speed":40,"size_min":0.1,"sync":!1}},"line_linked":{"enable":!0,"distance":150,"color":"#FFF","opacity":0.4,"width":1},"move":{"enable":!0,"speed":6,"direction":"none","random":!1,"straight":!1,"out_mode":"out","attract":{"enable":!1,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":!0,"mode":"repulse"},"onclick":{"enable":!0,"mode":"push"},"resize":!0},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":!0,"config_demo":{"hide_card":!1,"background_color":"#b61924","background_image":"","background_position":"50% 50%","background_repeat":"no-repeat","background_size":"cover"}})

 



