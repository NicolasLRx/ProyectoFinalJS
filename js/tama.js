 //DECLARO CONSTANTES A USAR.
const fruta = 10;
const verdura = 20;
const carne = 30;
const capola = 40;
let tamago;
let ganador;

class Tamagochi {
  constructor(nombre) {
    this.nombre = nombre;
    this.saciedad = 50; //50 es sin hambre
    this.humor = 50; // 50 es sin humor, abajo es aburrido, arriba divertido
    this.salud = 50; // 50 es saludable
    this.baul = [];
    this.dinero = 10; // contado
    this.vivo = true;
    let pelota = new Juguete("Pelota", Infinity, 3);
    this.baul.push(pelota);
  }

  controlarEstado() {
    if (this.saciedad <= 0 || this.salud <= 0) {
      alert(this.nombre + " se Murio X.x");
      this.vivo = false;
    } else if (this.saciedad <= 25 || this.humor <= 25 || this.salud <= 25) {
      alert(this.nombre + " necesita atencion!");
    }
  }

  estado() {
    let estado = `Estado de  ${this.nombre}
      Apetito =  ${this.saciedad}         Humor   =  ${this.humor}
      Salud   =  ${this.salud}            Baul   =  ${this.baul.length}
      Dinero = $${this.dinero}`;

    return estado;
  }

  mostrarBaul() {
    let cant = this.baul.length;
    let mostrar = `Cantidad de juguetes : ${cant}`;

    for (let b of this.baul) {
      mostrar += "\n" + b.nombre + "   Usos restantes :  " + b.duracion;
    }
    return mostrar;
  }
}

class Juguete {
  constructor(nombre, duracion, diversion) {
    this.nombre = nombre;
    this.duracion = duracion;
    this.diversion = diversion;
  }

  mostrarJuguete() {
    let jug = `${this.nombre}. Duracion : ${this.duracion} `;
    return jug;
  }
}

//CAPTURAS DE DOM
const btnVolverIndex = document.getElementById("menuPrincipal");
const btnCurar = document.getElementById("btnCurar");
const alimentos = document.querySelectorAll(".img-fluid.alimentos");
const h1Nombre = document.getElementById("nombreTama")
const opcUsuario = document.querySelectorAll(".img-fluid.ppt")
const resultadoHtml = document.getElementById("resultado")
const nuevo = document.getElementById("nuevoAmigo")
const continuar = document.getElementById("continuar")
const nombreTamaInput = document.getElementById("nombreTama");




// STORAGE


// Recuperar el objeto tama del localStorage
/* 

// Verificar si tamaGuardado es nulo (es decir, no se encontró en el localStorage)
if (tama !== null) {
  // El objeto tama se ha recuperado con éxito desde el localStorage
  // Ahora puedes trabajar con tamaGuardado como lo harías con el objeto tama original
  console.log('Objeto tama recuperado del localStorage:', tama);
} else {
  // No se encontró un objeto tama en el localStorage
  console.log('No se encontró un objeto tama en el localStorage');
} */



//EVENTOS
if (nuevo) {
  nuevo.addEventListener("click", function () {
    const nombreTama = nombreTamaInput.value;

   
    if (nombreTama.trim() !== "") {
      tamago = new Tamagochi(nombreTama);
           
    } else {
      tamago = new Tamagochi("Tamito");
  
    }
    localStorage.setItem('tamagochi', JSON.stringify(tamago));
    window.location.href='./pages/tamagochi.html'
  });
  
}

if(continuar){
  continuar.addEventListener("click", function(){

  const tama = JSON.parse(localStorage.getItem('tamagochi')); 

  if(tama!==null){
    window.location.href='./pages/tamagochi.html'
  }else{
        alert("No hay una partida Guardada")
  }

 

});
}


document.addEventListener("DOMContentLoaded", function () {
   const mostrarNombre = document.getElementById("nombreT");
  if (mostrarNombre) {
    mostrarNombre.innerHTML = `<h1 class="display-1">${tamago.nombre}</h1>`;
  }
});




if (btnVolverIndex) {
  btnVolverIndex.addEventListener(
    "click",
    () => (window.location.href = "tamagochi.html")
  );
}
if (btnCurar) {
  document.addEventListener("DOMContentLoaded", function () {
    // Inicializa el popover de Bootstrap
    const popover = new bootstrap.Popover(btnCurar);

    // Agrega un evento para capturar el cierre del popover
    btnCurar.addEventListener("hidden.bs.popover", function () {
      // Aquí puedes realizar otras acciones después de que se cierre el popover
    });
  });
}

alimentos.forEach((alimento) => {
  alimento.addEventListener("click", () => {
    const valor = alimento.getAttribute("data-valor");
    let statFood;

    if (valor == 1) {
      statFood = verdura
    } else if (valor == 2) {
      statFood = fruta
    } else if (valor == 3) {
      statFood = carne
    } else if (valor == 4) {
      statFood = capola
    }

    comer(valor, statFood);
  });
});


opcUsuario.forEach((opc) => {
  opc.addEventListener("click", () => {
    const valor = opc.getAttribute("data-value");
    ganador = jugarPpt(valor);
   
    resultadoHtml.innerHTML = `<h1 class="display-1">${ganador}</h1>`;
  });
});
   
//FUNCTIONS

let contHambre = 0; // contador para cantidad de veces que come comida saludable, si es mayor a 3 suma salud y vuelve a 0.
function comer(com, cant) {
  if (com == 1 || com == 2 || com == 3) {
    contHambre++;
    modifStat("+", cant, "saciedad");
  } else if (com == 4) {
    modifStat("-", cant, "saciedad");
    modifStat("-", cant, "salud");
  }

  if (contHambre == 3) {
    modifStat("+", 20, "salud");
    modifStat("+", 10, "humor");
    contHambre = 0;
  }
}

function jugarPpt(opcUser) {
  let cont = 0; // si Juega 3  sube humor y baja saciedad
  let contP = 0; // si llega a 3 baja humor
  let contG = 0; // si gana 3 gana sube dinero
  let resultado="Ganaste!"
  let opcTama = enteroAleatorio(); 
    cont++;
    
      us = eleccion(opcUser);
      tam = eleccion(opcTama);

    

      if (us === tam) {
        resultado = "Empate!";
      } else if (us === "Piedra") {
        if (tam === "Papel") {
          resultado = "Gana: " + tama.nombre;
          contG++;
        } else {
          contP++;
        }
      } else if (us === "Papel") {
        if (tam === "Tijera") {
          resultado = "Gana: " + tama.nombre;
          contG++;
          cont;
        } else {
          contP++;
        }
      } else if (us === "Tijera") {
        if (tam === "Piedra") {
          resultado = "Gana: " + tama.nombre;
          contG++;
        } else {
          contP++;
        }
      }

      
    
      
    if (cont == 3) {
      alert(
        tama.nombre + " se esta divirtiendo, pero le da un poco de hambre!"
      );
      modifStat("+", 10, "humor");
      modifStat("-", 10, "saciedad");
      cont = 0;
    }
    if (contP == 3) {
      alert("A " + tama.nombre + " no le gusta perder! Se pone de mal humor!");
      modifStat("-", 20, "humor");
      contP = 0;
    }
    if (contG == 3) {
      alert(tama.nombre + "Se esta divirtiendo y gano $2 !");
      modifStat("+", 20, "humor");
      modifStat("+", 2, "dinero");
      contG = 0;
    }

    return resultado;
}

function enteroAleatorio() {
  var min = 1; // Valor mínimo
  var max = 4; // Valor máximo
  let aleatorio = Math.floor(Math.random() * (max - min) + min);
  return aleatorio;
}

function eleccion(t) {
  let tipo = "";

  if (t == 1) {
    tipo = "Piedra";
  } else if (t == 2) {
    tipo = "Papel";
  } else if (t == 3) {
    tipo = "Tijera";
  }
  return tipo;
}

function jugarJuguete() {
  let opcE = prompt(tama.mostrarBaul() + "\n Que Juguete desea elegir?");
  let buscarJuguete = tama.baul.find((elem) => {
    return elem.nombre.toLowerCase() == opcE.toLocaleLowerCase();
  });

  if (buscarJuguete == undefined) {
    alert(`No se encontro el juguete`);
    jugar();
  } else {
    modifStat("+", buscarJuguete.diversion, "humor");
    alert(
      tama.nombre +
        " esta juando con " +
        buscarJuguete.nombre +
        " y su humor subio + " +
        buscarJuguete.diversion
    );
  }
  buscarJuguete.duracion--;

  tama.baul = tama.baul.filter((elem) => {
    if (elem.duracion <= 0) {
      alert(`El Juguete  ${elem.nombre} se agoto y se elimino del baul.`);
      return false;
    }
    return true;
  });
}

function comprarJuguete() {
  let salirMenu = false;
  let jug;
  do {
    let opcionIngresada = parseInt(
      prompt(`Bienvenido a la tienda de juguetes ${tama.nombre}
                   
                     ¿Que juguete desea comprar?
                      1 - Plastilina   ($1)  Usos 1
                      2 - Libro        ($5)  Usos 10
                      3 - Bicicleta    ($10) Usos 15
                      0 - Salir del menu`)
    );
    switch (opcionIngresada) {
      case 1:
        comprar(1, "Plastilina", 1, 10);
        break;
      case 2:
        comprar(5, "Libro", 10, 30);
        break;
      case 3:
        comprar(10, "Bicicleta", 15, 40);
        break;
      case 0:
        console.log(`Volviendo al menu anterior`);
        salirMenu = true;
        break;
      default:
        console.log("Opción no válida, ingrese alguna presente en el menu");
        break;
    }
  } while (!salirMenu);
}

function modifStat(oper, cant, stat) {
  
    let nuevoValor;
    
    if (oper === "+") {
      nuevoValor = tama[stat] + cant;
    } else if (oper === "-") {
      nuevoValor = tama[stat] - cant;
    }

    if (nuevoValor >= 100) {
      tama[stat] = 100;
      alert(`${stat} llegó al máximo!`);
    } else if (nuevoValor <= 0) {
      tama[stat] = 0;
      alert(`${stat} llegó al mínimo!`);
    } else {
      tama[stat] = nuevoValor;
    }

    modificarPorcentaje(stat, tama[stat]);
  
}

function modificarPorcentaje(id, nuevoPorcentaje) {
  const progress = document.getElementById(id);

  if (progress) {
    // Actualiza el atributo "aria-valuenow"
   /*  progress.setAttribute("aria-valuenow", nuevoPorcentaje); */
    // Actualiza el estilo de la barra de progreso
    progress.style.width =  nuevoPorcentaje+"%";
  }
}


function comprar(precio, descripcion, usos, diversion) {
  if (tama.dinero < precio) {
    alert("Dinero Insuficiente");
  } else {
    tama.dinero -= precio;
    let compra = new Juguete(descripcion, usos, diversion);
    tama.baul.push(compra);
  }
}

function menuOpcines() {
  let salirMenu = false;
  do {
    tama.controlarEstado();
    if (!tama.vivo) {
      alert("Gracias por Jugar!");
      break;
    } else {
      est = tama.estado();
      let opcionIngresada = parseInt(
        prompt(`${est}
                  Ingrese la opción deseada
                     1 - Alimentar
                     2 - Jugar
                     3 - Curar
                     4 - Comprar Juguete
                     0 - Salir del menu`)
      );
      switch (opcionIngresada) {
        case 1:
          alimentar();

          break;
        case 2:
          jugar();
          break;
        case 3:
          modifStat("+", 30, "salud");
          console.log(nombre + " se siente un poco mejor!");
          break;
        case 4:
          comprarJuguete();
          break;
        case 0:
          console.log(`Gracias por jugar con` + nombre + `! Saludos!`);
          salirMenu = true;
          break;
        default:
          console.log("Opción no válida, ingrese alguna presente en el menu");
          break;
      }
    }
  } while (!salirMenu);
}

//comienza
/* alert("Bienvenido a Tamagochi!");
let nombre = prompt("Elijamos un nombre : ");
nombre = nombre.toUpperCase();

//creo objeto
const tama = new Tamagochi(nombre);
alert("Bienvenido : " + tama.nombre);

//llamo al menu

menuOpcines();
 */
