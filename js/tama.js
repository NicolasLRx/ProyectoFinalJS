//DECLARO CONSTANTES A USAR.
const fruta = 10;
const verdura = 20;
const carne = 30;
const capola = 40;
let tamago;
let ganador;
let tama ;
let cont = 0; // si Juega 3  sube humor y baja saciedad
let contP = 0; // si llega a 3 baja humor
let contG = 0; // si gana 3 gana sube dinero
let catalogoJuguete = [];

class Tamagochi {
  constructor(nombre) {
    this.nombre = nombre;
    this.saciedad = 50; //50 es sin hambre
    this.humor = 50; // 50 es sin humor, abajo es aburrido, arriba divertido
    this.salud = 50; // 50 es saludable
    this.baul = [];
    this.dinero = 10; // contado
    this.vivo = true;
    let pelota = new Juguete(0,"Pelota", Infinity, 5,Infinity);
    this.baul.push(pelota);
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
  constructor(id, nombre, duracion, diversion, precio) {
    this.id = id;
    this.nombre = nombre;
    this.duracion = duracion;
    this.diversion = diversion;
    this.precio = precio;
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
const resultadoHtml = document.getElementById("resultado")
const nuevo = document.getElementById("nuevoAmigo")
const continuar = document.getElementById("continuar")
const nombreTamaInput = document.getElementById("nombreTama");
const opcUsuario = document.querySelectorAll(".img-fluid.ppt")
const jugueteDom = document.getElementById("juguete")
const btnComprar = document.getElementById("comprarJuguete")
const eleccionTama = document.getElementById("eleccion")

//EVENTOS
if (nuevo) {
  nuevo.addEventListener("click", function () {
    const nombreTama = nombreTamaInput.value;

   
    if (nombreTama.trim() !== "") {
      tama = new Tamagochi(nombreTama);
           
    } else {
      tama = new Tamagochi("Tamito");
  
    }
    localStorage.setItem('tamagochi', JSON.stringify(tama));
    window.location.href='./pages/tamagochi.html'
  });
  
}

if(continuar){
  continuar.addEventListener("click", function(){
  let tamaGet;
  tamaGet = JSON.parse(localStorage.getItem('tamagochi')); 

  if(tamaGet!==null){
    window.location.href='./pages/tamagochi.html'
    tama = new Tamagochi (tamaGet.nombre)
    tama.saciedad = tamaGet.saciedad
    tama.humor = tamaGet.humor    
    tama.salud = tamaGet.salud
    tama.baul = tamaGet.baul
    tama.dinero = tamaGet.dinero
    tama.vivo = tamaGet.vivo
  
   
  }else{
       
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: "No hay una partida Guardada",
        })
  }

});
}

document.addEventListener("DOMContentLoaded", function () {
  
  const mostrarNombre = document.getElementById("nombreT");
  tama = JSON.parse(localStorage.getItem('tamagochi')); 
  if (mostrarNombre) {

    mostrarNombre.innerHTML = `<h1 class="display-1">${tama.nombre}</h1>`;
  }




});

if (btnVolverIndex) {
  btnVolverIndex.addEventListener(
    "click",
    () => (window.location.href = "tamagochi.html")
  );
}

if (btnCurar) {
  btnCurar.addEventListener("click", function () {
    modifStat("+", 15, "salud");


    const popover = new bootstrap.Popover(btnCurar);
    popover.hide();
    location.reload();
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


document.addEventListener("DOMContentLoaded", function () {


  const barraDeProgresoSac = document.getElementById("saciedad");
  const barraDeProgresoHum = document.getElementById("humor");
  const barraDeProgresoSal = document.getElementById("salud");

  const nuevoPorcentajeSac = tama.saciedad;
  const nuevoPorcentajeHum = tama.humor;
  const nuevoPorcentajeSal = tama.salud;

  barraDeProgresoSac.querySelector(".progress-bar").style.width = `${nuevoPorcentajeSac}%`;
  barraDeProgresoHum.querySelector(".progress-bar").style.width = `${nuevoPorcentajeHum}%`;
  barraDeProgresoSal.querySelector(".progress-bar").style.width = `${nuevoPorcentajeSal}%`;
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
  
  let resultado="Ganaste!"
  let opcTama = enteroAleatorio(); 
  tama = JSON.parse(localStorage.getItem('tamagochi'));
    cont++;
    
     let us = eleccion(opcUser);
     let tam = eleccion(opcTama);

    

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

   
    
  eleccionTama.innerHTML = `
    <h1 class="display-1">${tama.nombre} eligió:</h1> 
    <img src="../img/${tam}.png" alt="${tam}">
  `;
      
    if (cont == 3) {
       Swal.fire({
        icon: 'info',
        title: 'Iujuuu',
        text: tama.nombre + " se esta divirtiendo, pero le da un poco de hambre!",
      })
      modifStat("+", 10, "humor");
      modifStat("-", 10, "saciedad");
      cont = 0;
    }
    if (contP == 3) {
      
      Swal.fire({
        icon: 'warning',
        title: 'Grrrrrrrr',
        text: "A " + tama.nombre + " no le gusta perder! Se pone de mal humor!",
      })

      modifStat("-", 20, "humor");
      contP = 0;
      contG = 0;
    }
    if (contG == 3) {
      alert(tama.nombre + "Se esta divirtiendo y gano $2 !");
      Swal.fire({
        icon: 'success',
        title: '$$$$$',
        text: tama.nombre + "Se esta divirtiendo y gano $2 !",
      })
      modifStat("+", 20, "humor");
      modifStat("+", 2, "dinero");
      contG = 0;
      contP = 0;
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

function modifStat(oper, cant, stat) {
  
  if (tama) {
    let nuevoValor;

    if (oper === "+") {
      nuevoValor = tama[stat] + cant;
    } else if (oper === "-") {
      nuevoValor = tama[stat] - cant;
    }
    Toastify({
      text: `${stat} ${oper} ${cant}`,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
    

    if (nuevoValor >= 100) {
      tama[stat] = 100;
     
      Swal.fire({
        icon: 'success',
        title: 'Yeah!',
        text: `${stat} llegó al máximo!`,      
      })
    } else if (nuevoValor <= 0) {
      tama[stat] = 0;
     
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: `${stat} llegó al mínimo!`,      
      })
    
    
    
    } else {
      tama[stat] = nuevoValor;
    }


    localStorage.setItem('tamagochi', JSON.stringify(tama));
    controlarEstado() 
   
  
  } else {
    console.log('No se encontró un objeto tama en el localStorage');
  }

 
}

function  controlarEstado() {
  
  if (tama.saciedad <= 0 || tama.salud <= 0) {
    
    Swal.fire({
    icon: 'error',
    title: 'Oh noo!',
    text: tama.nombre + " se Murio X.x",
    }).then(() => {
      localStorage.removeItem("tamagochi");
      tama.vivo = false;
      setTimeout(function() {
        window.location.href = '../index.html';
      }, 1000); 
    });

  
       
    
  } else if (tama.saciedad <= 25 || tama.humor <= 25 || tama.salud <= 25) {
    
    Swal.fire({
      icon: 'warning',
      title: 'Esto no se ve bien',
      text: tama.nombre + " necesita atencion!",
    })
  }

}