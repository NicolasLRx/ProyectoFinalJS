
let h = 0;
let contHambre=0; // contador para cantidad de veces que come comida saludable, si es mayor a 3 suma salud y vuelve a 0.

class Tamagochi{

   constructor(nombre){
      this.nombre = nombre;
      this.saciedad = 5; //5 es sin hambre
      this.humor = 5; // 5 es sin humor, abajo es aburrido, arriba divertido
      this.salud =5; // 5 es saludable
      this.baul =0;
   }

   controlarEstado(){
      
      if(this.saciedad == 0 || this.humor == 0 || this.salud == 0){
         alert (this.nombre + " necesita atencion!");
      }
   }


   estado(){
      let estado = `Estado de  ${this.nombre}
      Apetito =  ${this.saciedad}         Humor   =  ${this.humor}
      Salud   =  ${this.salud}            Baull   =  ${this.baul}`
      
      return  estado;
   }


}

class Juguete{
   
}


function alimentar(){
      
    let comida=0;
    let opcAlim = parseInt(prompt(`
    
    Que puede comer? 
    Ingrese la opción deseada
       1 - Frutas
       2 - Verduras
       3 - Carne
       4 - Capola 
       0 - volver al menu anterior`))
       
       switch(opcAlim){
          case 1:
            comida=1;
            alert(comer(comida));
            
             
          break
          case 2:
            comida=2;
            alert(comer(comida));
           

          break
          case 3:
            comida=3;
            alert(comer(comida));
           
           break         

          case 4: 
          comida=4;
          alert(comer(comida));
         // Capola es veneno segun mi hijo, ja.
          break     
          
          case 0:
            console.log("Volviendo al menu anterior.");
          break   
        
          default:
             console.log("Opción no válida, ingrese alguna presente en el menu");
             alimentar();
          break
       }

}

function comer(com){
   let estado="";
  
   
   if(saciedad == 10){
      
      estado="Estoy lleno!";


   }else if(com==1 || com==2 || com== 3){

      contHambre++;
      saciedad++;
      estado= "Ñam!";

   }else if(com==4){
      saciedad--;
      estado= "Puajj!";
      salud--;
      humor--;
   }

   if(contHambre==3){
      salud++;
      humor++;
      contHambre=0;
   }

   return estado;
}

function jugar() {
   let opcUsuario;
   let us="";
   let tam="";
   let cont = 0; // si Juega 3  sube humor y baja saciedad
   let contH=0; // si pierde 3 baja humor 
   do {
   estadoGral();
     let resultado = "Ganaste!";
     opcUsuario = parseInt(prompt(`
     Jueguemos - Piedra Papel, Tijera -
     ¿Cuál es tu elección?   
     1 - Piedra
     2 - Papel
     3 - Tijera
     0 - Volver al menú
     `));
 
     if (isNaN(opcUsuario)) {
       console.log("Ingrese un valor numérico válido.");
     } else if (opcUsuario === 0) {
       console.log("Volviendo al menú principal.");
     } else if (opcUsuario >= 1 && opcUsuario <= 3) {
      
      cont++;
      let opcTama= enteroAleatorio();
      us=eleccion(opcUsuario);
      tam=eleccion(opcTama);

      console.log("Elegiste: "+ us );
      console.log(".");
      console.log(".");
      console.log(nombre+ " eligio : "+ tam);
      
      if(opcUsuario == opcTama){
         resultado =  "Empate!";

      } else if( opcUsuario == 1){
         if(opcTama == 2){
            resultado = "Gana: " + nombre;
         }else{
            contH++;
         }
      }else if( opcUsuario == 2){
         if(opcTama == 3){
            resultado = "Gana: " + nombre;
         }else{
            contH++;
         }
      }else if( opcUsuario == 3){
         if(opcTama == 1){
            resultado = "Gana: " + nombre;
         }else{
            contH++;
         }
      }
      console.log(".");
      console.log(".");
      console.log(resultado);

     } else {
       console.log("Ingrese una opción válida (1, 2, 3 o 0).");
     }

     if(cont==3){
      console.log(nombre+" se esta divirtiendo, pero le da un poco de hambre!");
      humor++;
      saciedad--;
      cont=0;
     }
     if(contH==3){
      console.log("A "+nombre+" no le gusta perder! Se pone de mal humor!");
      humor--;
      contH =0;
     }

   } while (opcUsuario !== 0);
 }

 function enteroAleatorio(){
   var min = 1; // Valor mínimo
   var max = 4; // Valor máximo
  let aleatorio = Math.floor(Math.random() * (max - min) + min);
  return aleatorio;
 }


 function eleccion(t){
   let tipo = "";

   if(t == 1){
      tipo = "Piedra!";
   }else if( t == 2){
      tipo = "Papel!";
   } else if( t== 3){
      tipo = "Tijera!";
   }
   return tipo;
 }


function menuOpcines(){
   let salirMenu = false;
      do{
         tama.controlarEstado();
         let est = tama.estado();
         let opcionIngresada = parseInt(prompt(`${est}
                  Ingrese la opción deseada
                     1 - Alimentar
                     2 - Jugar
                     3 - Curar
                     0 - Salir del menu`))
         switch(opcionIngresada){
               case 1:
                  alimentar();
                  
               break
               case 2:
                  jugar();
               break
               case 3:
                  salud++;
                  console.log( nombre+ " se siente un poco mejor!")
               break         
               case 0:
                  console.log(`Gracias por jugar con` +nombre+`! Saludos!`)
                  salirMenu = true
               break   
               default:
                  console.log("Opción no válida, ingrese alguna presente en el menu")
               break
           }
     }while(!salirMenu)
}
 


//comienza
alert("Bienvenido a Tamagochi!");
let nombre = prompt("Elijamos un nombre : ");
nombre = nombre.toUpperCase();

//creo objeto
const tama =  new Tamagochi (nombre);
console.log("Bienvenido : "+ nombre);


//llamo al menu
menuOpcines();