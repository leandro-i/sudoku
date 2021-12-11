let grilla = document.getElementById('grilla');
const numpad = document.getElementById('numpad');
const casillas = document.querySelectorAll('.casilla');
const btn_borrador = document.querySelector('.btn_borrador');
const btn_eliminar = document.getElementById('btn_eliminar');
const borradores = document.querySelectorAll('.borradores');
let borrador_bool = false;

const modal = document.querySelector('.modal');
const btn_modal = document.querySelector('.btn-close');

// Cargar board previo, si existe
window.addEventListener('load', cargar_previo);

// Función cerrar modal
if (modal && btn_modal) {
    modal.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('modal')) {
            modal.style.display = 'none';
        }
        e.stopPropagation();
    })    
    btn_modal.addEventListener('click', e => modal.style.display = 'none');
}

// Cargar número en el board
numpad.addEventListener('mousedown', e => e.preventDefault())
numpad.addEventListener('click', e => {
    e.preventDefault();
    let casilla = document.activeElement;
    if (e.target.tagName == 'INPUT' && casilla.tagName == 'INPUT' && casilla.classList.contains('vacio')) {
        if (!borrador_bool) {
            eliminar_borradores(casilla);
            if (casilla.classList.contains('casilla')) {
                casilla.setAttribute('value', e.target.value)
            }
        } else {
            borrador(casilla, e.target.value);
        }
        almacenar();
    }
    e.stopPropagation();
})

// Función botón de borradores
btn_borrador.addEventListener('mousedown', e => e.preventDefault());
btn_borrador.addEventListener('click', e => {
    e.preventDefault();
    borrador_bool = borrador_bool? false : true;
    btn_borrador.classList.toggle('activado');
    e.stopPropagation();
})

// Función borrar contenido de la casilla
btn_eliminar.addEventListener('mousedown', e => e.preventDefault());
btn_eliminar.addEventListener('click', e => {
    e.preventDefault();
    let casilla = document.activeElement;
    if (casilla.tagName == 'INPUT' && casilla.classList.contains('vacio')) {
        casilla.setAttribute('value', '')
        eliminar_borradores(casilla);
        almacenar();
    }
    e.stopPropagation();
})

// Función escribir con el teclado
document.addEventListener('keypress', e => {
    let casilla = document.activeElement;
    let number = e.key;
    if (casilla.tagName == 'INPUT' && casilla.classList.contains('vacio') && !isNaN(number) && number !== '0' && number !== ' ') {
        if (!borrador_bool) {
            eliminar_borradores(casilla);
            casilla.setAttribute('value', number)
        } else {
            borrador(casilla, number);
        }
        almacenar();
    }
})

// Activar/desactivar botón de borrador con <<barra espaciadora>>
document.addEventListener('keypress', e => {
    if (e.code == 'Space') {
        let click = new Event('click');
        btn_borrador.dispatchEvent(click);
    }
})

// Borrar contenido de la casilla con <<backspace>>
document.addEventListener('keyup', e => {
    if (e.code == 'Backspace') {
        let click = new Event('click');
        btn_eliminar.dispatchEvent(click);
    }
})

// Función crear/eliminar anotaciones
function borrador(casilla, number) {
    if (casilla.value != '') {
        casilla.setAttribute('value', '')
    }
    let text = document.createElement('span');
    text.textContent = number;
    text.classList.add('anotacion');
    for (let i = 0; i < casilla.parentNode.children.length; i++) {
        let element = casilla.parentNode.children[i];
        if (element.textContent == number) {
            element.remove();
            return
        }
    }

    switch (number) {
        case '1':
            text.style.color = '#371d8f';
            break;
        case '2':
            text.style.left = '36%';
            text.style.color = '#ff6338';
            break;
        case '3':
            text.style.right = 0;
            text.style.color = '#4d8c20';
            break;
        case '4':
            text.style.top = '32%';
            text.style.color = '#910a91';
            break;
        case '5':
            text.style.top = '32%';
            text.style.left = '36%';
            text.style.color = '#806c16';
            break;
        case '6':
            text.style.top = '32%';
            text.style.right = 0;
            text.style.color = '#454545';
            break;
        case '7':
            text.style.bottom = 0;
            text.style.color = '#009479';
            break;
        case '8':
            text.style.bottom = 0;
            text.style.left = '36%';
            text.style.color = '#0053b8';
            break;
        case '9':
            text.style.bottom = 0;
            text.style.right = 0;
            text.style.color = '#960000';
            break;    
        default:
            break;
    }
    casilla.parentNode.insertBefore(text, casilla);
    
    text.addEventListener('click', e => {
        e.preventDefault();
        Array.from(text.parentNode.children).forEach(element => {
            if (element.tagName == 'INPUT') {
                element.focus();
            }
        })
        e.stopPropagation();
    })
    text.addEventListener('mousedown', e => e.preventDefault());
    
}

function eliminar_borradores(casilla) {
    let anotaciones = Array.from(casilla.parentNode.children);
    anotaciones.forEach(element => {
        if (element.tagName == 'SPAN') {
            element.remove();                    
        }
    })
}

// Guardar el html del board en el localStorage
function almacenar() {
    localStorage.removeItem('sudoku');
    localStorage.setItem('sudoku', document.getElementById('grilla').outerHTML);
}

// Cargar board previo, si es la misma dificultad
function cargar_previo() {
    let dificultad = localStorage.getItem('dificultad');
    let itemSudoku = localStorage.getItem('sudoku');
    if (window.location.pathname.includes(dificultad) && itemSudoku) {
        document.getElementById('grilla').outerHTML = itemSudoku;
    } else {
        localStorage.removeItem('sudoku');
    }
    localStorage.setItem('dificultad', window.location.pathname);
}

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
// }