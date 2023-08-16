document.getElementById("botoncalcular").addEventListener("click", () => {
  const DatosUsuario = {
    inicial: parseInt(document.getElementById("montoinicial").value),
    tasa: parseFloat(document.getElementById("tasanominal").value),
    periodo: parseInt(document.getElementById("periodointeres").value),
    aporte: parseInt(document.getElementById("aportemensual").value),
  };

  const resultadofinal = calcularInteres(DatosUsuario);
  guardarEnLocal(resultadofinal);
  mostrar(resultadofinal);
});

function calcularInteres(DatosUsuario) {
  const factor = DatosUsuario.tasa / 100;
  let monto = DatosUsuario.inicial;
  let resultadoanual = [];

  for (let anual = 1; anual <= DatosUsuario.periodo; anual++) {
    let aportetotal = 0;
    for (let mes = 1; mes <= 12; mes++) {
      monto += monto * (factor / 12);
      monto += DatosUsuario.aporte;
      aportetotal += DatosUsuario.aporte;
    }

    resultadoanual.push({
      año: anual,
      monto: monto.toFixed(2),
      aportetotal: aportetotal.toFixed(2),
    });
  }

  return resultadoanual;
}

function mostrar(resultadoanual) {
  const divResultado = document.getElementById("resultadofinal");
  divResultado.innerHTML = "A continuación se encuentra el rendimiento estimado de su inversion:";

  resultadoanual.forEach((resultado) => {
    const divResultadoItem = document.createElement("div");
    divResultadoItem.classList.add("resultado-item");

    divResultadoItem.innerHTML = `
      <p>Año: ${resultado.año}</p>
      <p>Monto: $${resultado.monto}</p>
      <p>Aporte Total: $${resultado.aportetotal}</p>
      <hr>
    `;

    divResultado.appendChild(divResultadoItem);
  });
}

function guardarEnLocal(resultadoanual) {
  localStorage.setItem("resultados", JSON.stringify(resultadoanual));
}

window.addEventListener("load", () => {
  const guardados = localStorage.getItem("resultados");
  if (guardados) {
    mostrar(JSON.parse(guardados));
  }
});
