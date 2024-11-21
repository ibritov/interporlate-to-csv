function interpolateToCSV(timestampStart, valueStart, timestampEnd, valueEnd) {
    const hourInterval = 3600; // Intervalo de 1 hora en segundos
    const timestamps = [];
    const values = [];

    for (let t = timestampStart; t <= timestampEnd; t += hourInterval) {
        timestamps.push(t);
        const interpolatedValue = valueStart + ((t - timestampStart) / (timestampEnd - timestampStart)) * (valueEnd - valueStart);
        values.push(interpolatedValue);
    }

    // Crear el contenido del CSV
    let csvContent = "timestamp,value_kwh,datetime\n";
    timestamps.forEach((timestamp, index) => {
        const dateTime = new Date(timestamp * 1000).toISOString();
        csvContent += `${timestamp},${values[index].toFixed(2)},${dateTime}\n`;
    });

    const outputDiv = document.getElementById("output");
    outputDiv.textContent = csvContent; // Asegura que el contenido sea copiable
    outputDiv.style.whiteSpace = "pre-wrap"; // Permite que el contenido respete los saltos de línea

    alert("El CSV ha sido generado. Copia el contenido del cuadro de texto.");
}
function generateCSV() {
    const timestampStart = parseInt(document.getElementById("timestampStart").value);
    const valueStart = parseFloat(document.getElementById("valueStart").value);
    const timestampEnd = parseInt(document.getElementById("timestampEnd").value);
    const valueEnd = parseFloat(document.getElementById("valueEnd").value);

    if (isNaN(timestampStart) || isNaN(valueStart) || isNaN(timestampEnd) || isNaN(valueEnd)) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    interpolateToCSV(timestampStart, valueStart, timestampEnd, valueEnd);
}
