async function obtenerDatos() {
  try {
    let res = await fetch(
      "https://my-json-server.typicode.com/fedegaray/telefonos/db"
    );
    let datos = await res.json();
    return datos.dispositivos;
  } catch (error) {
    console.error("Tienes un error", error);
  }
}
obtenerDatos();
async function contenidoBody() {
  try {
    const res = await fetch(
      "https://my-json-server.typicode.com/fedegaray/telefonos/db"
    );
    const data = await res.json();

    const dispositivos = data.dispositivos; // ⚠️ Acceder correctamente al array
    let salida = "";

    for (const dispositivo of dispositivos) {
      salida += `
          <tr>
            <td>${dispositivo.marca}</td>
            <td>${dispositivo.modelo}</td>
            <td>${dispositivo.color}</td>
            <td>${dispositivo.almacenamiento}</td>
            <td>${dispositivo.procesador}</td>
          </tr>
        `;
    }

    document.getElementById("cuerpo-tabla").innerHTML = salida;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

async function consulta() {
  let consultaIndividual = document.getElementById("consulta").value;

  try {
    let res = await fetch(
      `https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${consultaIndividual}`
    );
    let datos = await res.json();

    // Asignar los valores al formulario
    document.getElementById("marca").value = datos.marca;
    document.getElementById("modelo").value = datos.modelo;
    document.getElementById("color").value = datos.color;
    document.getElementById("almacenamiento").value = datos.almacenamiento;
    document.getElementById("procesador").value = datos.procesador;
  } catch (error) {
    console.error("Tienes un error", error);
  }
}

async function agregarNuevoDispositivo() {
  let marca = document.getElementById("marca1").value;
  let modelo = document.getElementById("modelo1").value;
  let color = document.getElementById("color1").value;
  let almacenamiento = document.getElementById("almacenamiento1").value;
  let procesador = document.getElementById("procesador1").value;

  try {
    let res = await fetch(
      "https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marca: marca,
          modelo: modelo,
          color: color,
          almacenamiento: almacenamiento,
          procesador: procesador,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Error en la solicitud: " + res.statusText);
    }

    let data = await res.json();
    alert(
      "Dispositivo agregado correctamente: \n" +
        `Marca: ${data.marca}\nModelo: ${data.modelo}\nColor: ${data.color}\nAlmacenamiento: ${data.almacenamiento}\nProcesador: ${data.procesador}`
    );

    document.getElementById("marca1").value = "";
    document.getElementById("modelo1").value = "";
    document.getElementById("color1").value = "";
    document.getElementById("almacenamiento1").value = "";
    document.getElementById("procesador1").value = "";
  } catch (error) {
    console.error("Tienes un error", error);
  }
}

async function modificar() {
  let consultaIndividual = document.getElementById("consulta").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const color = document.getElementById("color").value;
  const almacenamiento = document.getElementById("almacenamiento").value;
  const procesador = document.getElementById("procesador").value;

  try {
    let res = await fetch(
      `https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${consultaIndividual}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marca: marca,
          modelo: modelo,
          color: color,
          almacenamiento: almacenamiento,
          procesador: procesador,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Error en la solicitud: " + res.statusText);
    }

    let data = await res.json();
    alert(
      `Dispositivo modificado correctamente:\n` +
        `Marca: ${data.marca}\nModelo: ${data.modelo}\n` +
        `Color: ${data.color}\nAlmacenamiento: ${data.almacenamiento}\nProcesador: ${data.procesador}`
    );
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("color").value = "";
    document.getElementById("almacenamiento").value = "";
    document.getElementById("procesador").value = "";
  } catch (error) {
    console.error("Tienes un error", error);
  }
}

async function eliminar() {
  let consultaIndividual = document.getElementById("consulta").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const color = document.getElementById("color").value;
  const almacenamiento = document.getElementById("almacenamiento").value;
  const procesador = document.getElementById("procesador").value;

  try {
    let res = await fetch(
      `https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${consultaIndividual}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Error en la solicitud: " + res.statusText);
    }

    alert(
      `Dispositivo Eliminado correctamente:\n` +
        `Marca: ${marca}\nModelo: ${modelo}\n` +
        `Color: ${color}\nAlmacenamiento: ${almacenamiento}\nProcesador: ${procesador}`
    );
    // Limpiar los campos
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("color").value = "";
    document.getElementById("almacenamiento").value = "";
    document.getElementById("procesador").value = "";
  } catch (error) {
    console.error("Tienes un error", error);
  }
}
