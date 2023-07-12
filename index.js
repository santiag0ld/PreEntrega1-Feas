  
  const inicial = parseInt(prompt("Ingrese el monto inicial de la inversion:"));
  const tasa = parseInt(prompt("Ingrese la tasa de interes anual estimada:"));
  const periodo = parseInt(prompt("Ingrese el tiempo de la inversion en años:")); 
  

function calcularInteres(principal, tasa, tiempo) {
    let monto = inicial;
    
    for (let anual = 1; anual <= tiempo; anual++) {
      monto += monto * (tasa / 100);
    }
    
    return monto;
  }

  const MontoFinal = calcularInteres(inicial, tasa, periodo);
  if (periodo == 1) {
    console.log("El monto total de su inversión luego de", periodo, "a\u00f1o será de: $",MontoFinal);
  } else{
  console.log("El monto total de su inversión luego de", periodo, "a\u00f1os será de: $",MontoFinal);
  }

  