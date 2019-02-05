var btnpopup = document.getElementById('btnpopup')
var overlay = document.getElementById('overlay')
var btnclose = document.getElementById('btnclose')

btnpopup.addEventListener('click', openModal)
btnclose.addEventListener('click', closePopup)

function openModal() {
    overlay.style.display = 'block'
}

function closePopup() {
    overlay.style.display = 'none'
}