
  const datosUsuario = {
    inicial: parseInt(prompt("Ingrese el monto inicial de la inversión:")),
    tasa: parseInt(prompt("Ingrese la tasa de interés anual estimada:")),
    periodo: parseInt(prompt("Ingrese el tiempo de la inversión en años:")),
    aporte: parseInt(prompt("Ingrese el monto a adicionar mensualmente:"))
  }

function calcularInteres(inicial, tasa, tiempo, aporte) {
  const factor = tasa / 100;
    let monto = inicial;
    let resultadoanual = [];
    
    for (let anual = 1; anual <= tiempo; anual++) {
      let aportetotal = 0;
      for (let mes = 1; mes <= 12; mes++) {
      monto += monto * (factor / 12);
      monto += aporte;
      aportetotal += aporte;
      }
      
      resultadoanual.push ({
        año: anual,
        monto: monto.toFixed(2),
        aportetotal: aportetotal.toFixed(2),
      });
    }
    
    return resultadoanual;
  }

  const resultados = calcularInteres(datosUsuario.inicial, datosUsuario.tasa, datosUsuario.periodo, datosUsuario.aporte);

console.log("Detalles de la inversión:");

console.log("Monto inicial: $", datosUsuario.inicial);

console.log("Tasa de interés anual estimada: ", datosUsuario.tasa, "%");

if(datosUsuario.periodo == 1){
  console.log("Tiempo de la inversión: ", datosUsuario.periodo, "año");
} else {
  console.log("Tiempo de la inversión: ", datosUsuario.periodo, "años");
}

console.log("Monto mensual de la contribución: $", datosUsuario.aporte);

resultados.forEach((resultado) => {
  console.log("Año", resultado.año, ": $", resultado.monto, "(total aportado", resultado.aportetotal, ")");
});
  