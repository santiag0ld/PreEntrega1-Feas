async function fetchStockMarketData(symbol) {
  const apiKey = '55ZPWD90TYP1CRQR'; 
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data['Time Series (Daily)'] || {};
  } catch (error) {
    console.error(`Error fetching stock market data for ${symbol}:`, error);
    return {};
  }
}

function displayStockMarketData(stockData, symbol) {
  const divStockData = document.getElementById('stockData');
  const stockItem = document.createElement('div');
  stockItem.classList.add('stock-item');

  const latestDate = Object.keys(stockData)[0];

  if (latestDate) {
    const stock = stockData[latestDate];

    const day = new Date(latestDate).toLocaleDateString(undefined, { day: 'numeric' });

    stockItem.innerHTML = `
      <h3>${symbol}</h3>
      <p>Date: ${day}</p>
      <p>Open: $${stock['1. open']}</p>
      <p>Close: $${stock['4. close']}</p>
      <p>High: $${stock['2. high']}</p>
      <p>Low: $${stock['3. low']}</p>
    `;
  } else {
    stockItem.innerHTML = `<h3>${symbol}</h3><p>No hay datos disponibles.</p>`;
  }

  divStockData.appendChild(stockItem);
}

window.addEventListener('load', async () => {
  const symbols = ['IBM', 'AAPL', 'GOOGL', 'AMD'];

  for (const symbol of symbols) {
    const stockData = await fetchStockMarketData(symbol);
    displayStockMarketData(stockData, symbol);
  }
});

document.getElementById("botoncalcular").addEventListener("click", async () => {
  const montoinicial = document.getElementById("montoinicial").value;
  const tasanominal = document.getElementById("tasanominal").value;
  const periodointeres = document.getElementById("periodointeres").value;
  const aportemensual = document.getElementById("aportemensual").value;

  if (!montoinicial || !tasanominal || !periodointeres || !aportemensual) {
    Swal.fire({
      icon: 'error',
      title: 'Campos obligatorios',
      text: 'Por favor, complete todos los valores.',
    });
    return;
  }

  if (parseInt(periodointeres) > 100) {
    Swal.fire({
      icon: 'error',
      title: 'Valores inválidos',
      text: 'La cantidad de años debe ser menor a 100.',
    });
    return;
  }

  const loadingSwal = Swal.fire({
    title: 'Calculando',
    text: 'Espere mientras se calcula el resultado.',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: async () => {
      const DatosUsuario = {
        inicial: parseInt(montoinicial),
        tasa: parseFloat(tasanominal),
        periodo: parseInt(periodointeres),
        aporte: parseInt(aportemensual),
      };

      const resultadofinal = calcularInteres(DatosUsuario);
      guardarEnLocal(resultadofinal);
      mostrar(resultadofinal);

      setTimeout(() => {
        loadingSwal.close();
      }, 3000);
    },
  });
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

  let delay = 3000;

  resultadoanual.forEach((resultado) => {
    setTimeout(() => {
      const divResultadoItem = document.createElement("div");
      divResultadoItem.classList.add("resultado-item");

      divResultadoItem.innerHTML = `
        <p>Año: ${resultado.año}</p>
        <p>Monto: $${resultado.monto}</p>
        <p>Aporte Total: $${resultado.aportetotal}</p>
        <hr>
      `;

      divResultado.appendChild(divResultadoItem);
    }, delay);

  });
}

function guardarEnLocal(resultadoanual) {
  localStorage.setItem("resultados", JSON.stringify(resultadoanual));
}

window.addEventListener("load", () => {
  localStorage.clear();

  const guardados = localStorage.getItem("resultados");
  if (guardados) {
    mostrar(JSON.parse(guardados));
  }
});
