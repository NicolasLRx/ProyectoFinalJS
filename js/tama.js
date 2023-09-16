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

function alimentar() {
  let comida = 0;
  let opcAlim = parseInt(
    prompt(`
    
    Que puede comer? 
    Ingrese la opción deseada
       1 - Frutas
       2 - Verduras
       3 - Carne
       4 - Capola 
       0 - volver al menu anterior`)
  );

  switch (opcAlim) {
    case 1:
      comida = 1;
      alert(comer(comida, 10));

      break;
    case 2:
      comida = 2;
      alert(comer(comida, 20));

      break;
    case 3:
      comida = 3;
      alert(comer(comida, 30));

      break;

    case 4:
      comida = 4;
      alert(comer(comida, 40));
      // Capola es veneno segun mi hijo, ja.
      break;

    case 0:
      console.log("Volviendo al menu anterior.");
      break;

    default:
      console.log("Opción no válida, ingrese alguna presente en el menu");
      alimentar();
      break;
  }
}
let contHambre = 0; // contador para cantidad de veces que come comida saludable, si es mayor a 3 suma salud y vuelve a 0.
function comer(com, cant) {
  let estado = "";

  if (com == 1 || com == 2 || com == 3) {
    contHambre++;
    estado = "Ñam!";
    modifStat("+", cant, "saciedad");
  } else if (com == 4) {
    estado = "Puajj!";
    modifStat("-", cant, "saciedad");
    modifStat("-", cant, "salud");
  }

  if (contHambre == 3) {
    modifStat("+", 20, "salud");
    modifStat("+", 10, "humor");
    contHambre = 0;
  }

  return estado;
}

function jugar() {
  let salirMenu = false;
  do {
    let est = tama.estado();
    let opcionIngresada = parseInt(
      prompt(`${est}
                  ¿A que desea Jugar?
                     1 - Piedra Papel tijera
                     2 - Juguete
                     0 - Salir del menu`)
    );
    switch (opcionIngresada) {
      case 1:
        jugarPpt();

        break;
      case 2:
        jugarJuguete();
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

function jugarPpt() {
  let opcUsuario;
  let us = "";
  let tam = "";
  let cont = 0; // si Juega 3  sube humor y baja saciedad
  let contP = 0; // si llega a 3 baja humor
  let contG = 0; // si gana 3 gana sube dinero
  do {
    tama.controlarEstado();
    let resultado = "Ganaste!";
    opcUsuario = parseInt(
      prompt(`
     Jueguemos - Piedra Papel, Tijera -
     ¿Cuál es tu elección?   
     1 - Piedra
     2 - Papel
     3 - Tijera
     0 - Volver al menú
     `)
    );

    if (isNaN(opcUsuario)) {
      alert("Ingrese un valor numérico válido.");
    } else if (opcUsuario === 0) {
      console.log("Volviendo al menú principal.");
    } else if (opcUsuario >= 1 && opcUsuario <= 3) {
      cont++;
      let opcTama = enteroAleatorio();
      us = eleccion(opcUsuario);
      tam = eleccion(opcTama);

      alert(
        "Elegiste: " +
          us +
          "\n." +
          "\n." +
          "\n" +
          tama.nombre +
          " eligio : " +
          tam
      );

      if (opcUsuario == opcTama) {
        resultado = "Empate!";
      } else if (opcUsuario == 1) {
        if (opcTama == 2) {
          resultado = "Gana: " + tama.nombre;
          contG++;
        } else {
          contP++;
        }
      } else if (opcUsuario == 2) {
        if (opcTama == 3) {
          resultado = "Gana: " + tama.nombre;
          contG++;
          cont;
        } else {
          contP++;
        }
      } else if (opcUsuario == 3) {
        if (opcTama == 1) {
          resultado = "Gana: " + tama.nombre;
          contG++;
        } else {
          contP++;
        }
      }
      alert(resultado);
    } else {
      alert("Ingrese una opción válida (1, 2, 3 o 0).");
    }

    if (cont == 3) {
      alert(
        tama.nombre + " se esta divirtiendo, pero le da un poco de hambre!"
      );
      modifStat("+", 10, "humor")
      modifStat("-", 10, "saciedad");
      cont = 0;
    }
    if (contP == 3) {
      alert("A " + tama.nombre + " no le gusta perder! Se pone de mal humor!");
      modifStat("-", 20 , "humor");
      contP = 0;
    }
    if (contG == 3) {
      alert(tama.nombre + "Se esta divirtiendo y gano $2 !");
      modifStat("+", 20, "humor")
      modifStat("+", 2 , "dinero");
      contG = 0;
    }
  } while (opcUsuario !== 0);
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
    tipo = "Piedra!";
  } else if (t == 2) {
    tipo = "Papel!";
  } else if (t == 3) {
    tipo = "Tijera!";
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

  jugar();
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
  if (tama.hasOwnProperty(stat)) {
    if (oper === "+") {
      let resul = tama[stat] + cant;

      if (tama[stat] == 100) {
        alert(`${stat} esta al maximo!`);
      } else if (resul >= 100) {
        tama[stat] = 100;
        alert(`${stat} llego al maximo!`);
      } else {
        tama[stat] = resul;
      }
    } else if (oper === "-") {
      let resul = tama[stat] - cant;

      if (resul <= 0) {
        alert(`${stat} llego al minimo!`);
        tama[stat] = 0;
      } else {
        tama[stat] = resul;
      }
    }
  } else {
    console.log(`La propiedad ${stat}  no existe`);
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
alert("Bienvenido a Tamagochi!");
let nombre = prompt("Elijamos un nombre : ");
nombre = nombre.toUpperCase();

//creo objeto
const tama = new Tamagochi(nombre);
alert("Bienvenido : " + tama.nombre);

//llamo al menu

menuOpcines();
