function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
// window.onclick = function (event) {
//     if (!event.target.matches('.bts')) {
//         var dropdowns1 = document.getElementsByClassName("drop");
//         var i;
//         for (i = 0; i < dropdowns1.length; i++) {
//             var openDropdown1 = dropdowns1[i];
//             if (openDropdown1.classList.contains('show')) {
//                 openDropdown1.classList.remove('show');
//             }
//         }
//     }
// }