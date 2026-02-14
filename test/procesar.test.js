import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  // Ahora espera también "longitud"
  assert.deepEqual(res.body, { 
    resultado: "Nombre procesado: JUAN",
    longitud: 4  
  });
});

test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  // Ahora también verifica longitud para "anónimo"
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
  assert.equal(res.body.longitud, 7); 
});
test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
});
test("procesar siempre devuelve mayúsculas en el resultado", () => {
  // Casos de prueba variados
  const casos = [
    { input: "juan", desc: "minúsculas" },
    { input: "JuAn", desc: "mezcla mayúsculas/minúsculas" },
    { input: "123", desc: "números" },
    { input: "juan123", desc: "letras y números" },
    { input: "áéíóú", desc: "caracteres acentuados" },
    { input: "JUAN", desc: "ya en mayúsculas" },
    { input: "", desc: "vacío (usa anónimo)" },
  ];

  casos.forEach(({ input, desc }) => {
    const req = { query: input === "" ? {} : { nombre: input } };
    
    const res = {
      statusCode: null,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      }
    };

    handler(req, res);
    //comentario prueba
    // Regla 1: Status 200
    assert.equal(res.statusCode, 200, `[${desc}] Debe responder con status 200`);
    
    // Regla 2: JSON tiene estructura correcta
    assert.ok(res.body.resultado, `[${desc}] Debe tener propiedad 'resultado'`);
    assert.ok(res.body.longitud !== undefined, `[${desc}] Debe tener propiedad 'longitud'`);
    
    // Regla 3: El texto en 'resultado' debe estar en mayúsculas
    const textoResultado = res.body.resultado;
    
    const nombreProcesado = textoResultado.replace("Nombre procesado: ", "");
    const estaEnMayusculas = nombreProcesado === nombreProcesado.toUpperCase();
    
    assert.ok(
      estaEnMayusculas,
      `[${desc}] El nombre procesado debe estar en mayúsculas. Recibido: "${nombreProcesado}"`
    );
    
    // Regla 4: La longitud debe ser un número positivo
    assert.ok(
      typeof res.body.longitud === "number" && res.body.longitud >= 0,
      `[${desc}] Longitud debe ser número positivo. Recibido: ${res.body.longitud}`
    );
  });
});
