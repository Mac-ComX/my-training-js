var btnlgn = document.getElementById('btnlgn')
var btnreg = document.getElementById('btnreg')

btnlgn.addEventListener('click', openModal)
btnlgn.addEventListener('click', closePopup)
btnreg.addEventListener('click', openModal2)
btnreg.addEventListener('click', closePopup2)


// function animation() {
//     document.getElementById('popregi').style.animation = "zoomOut 0.7s ease forwards"
// }
function openModal() {
    poplgn.style.display = 'block'
}
function closePopup() {
    popregi.style.display = 'none'
}
function openModal2() {
    popregi.style.display = 'block'
}
function closePopup2() {
    poplgn.style.display = 'none'
}