console.log("teste");

let aumentarContadorOnClick = document
    .getElementById("botao__contador")
    .addEventListener("click", (e) => {
        let contadorAtual = aumentarContador();
        trocarCorAleatoriaContador(contadorAtual);
    });

let resetarContadorOnClick = document
    .getElementById("reset__contador")
    .addEventListener("click", (e) => {
        let contadorRaw = document.getElementById("contador");
        let contadorStr = contadorRaw.textContent;
        let contador = parseInt(contadorStr);
        contador = 0;
        trocarCorAleatoriaContador(contador);
        contadorRaw.innerHTML = 0;
    });

function aumentarContador() {
    let contador = document.getElementById("contador");
    let contadorRaw = contador.textContent;
    let contadorNumero = parseInt(contadorRaw);
    contadorNumero += 1;

    contador.innerHTML = contadorNumero;
    return contadorNumero;
}

function trocarCorAleatoriaContador(numero) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    if (numero > 0) {
        document.getElementById(
            "contador"
        ).style.color = `rgb(${r}, ${g}, ${b})`;
    } else {
        document.getElementById(
            "contador"
        ).style.color = `rgb(${0}, ${0}, ${0})`;
    }
}
