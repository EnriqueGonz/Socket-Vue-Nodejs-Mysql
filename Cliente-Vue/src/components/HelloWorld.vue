<template>
<html>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous"
  >
  <div>
    <div class="hello">
      <h1>Gestor de Base de Datos</h1>
    </div>
    <div class="bordes">
      <div class="alineacion">
        <label for="ip">Ip:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          id="ip"
          type="text"
          v-model="ip"
          placeholder="Example: 127.0.0.1"
        >
        <br>
        <br>
        <label for="user">User:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          id="user"
          type="text"
          v-model="user"
          placeholder="Example: root"
        >
        <br>
        <br>
        <label for="password">Password:</label>&nbsp;
        <input id="password" type="password" v-model="password" placeholder="Password:">
        <br>
        <br>
        <label for="bd">Base Dato:</label>
        <input id="bd" type="text" placeholder="Example: rmi">
        <button type="submit" class="btn btn-primary" @click="conectar">Conectar</button>
      </div>
      <div class="alineacion2">
        <h4>Escriba Query:</h4>
        <input
          id="query"
          v-model="query"
          style="width:450px;height:100px;"
          type="text"
          placeholder="Example: Select * from rmi.usuario"
        >
        <br>
        <button type="submit" class="btn btn-primary" @click="consultar">Consultar</button>
      </div>
    </div>
    <div class="tabla">
      <h1>resultados:</h1>
      <table id="miTabla" border="0" cellspacing="0" cellpadding="0"></table>
    </div>
  </div>
</html>
</template>

<script>
import io from "socket.io-client";
export default {
  async created() {
    this.obtenerResults();
  },
  data() {
    return {
      ip: "",
      user: "",
      password: "",
      db: "",
      query: "",
      socket: io("localhost:3000"),
      resultados: ""
    };
  },
  methods: {
    conectar() {
      this.socket.emit("datos", {
        host: this.host,
        user: this.user,
        password: this.password,
        db: this.db
      });
    },
    consultar() {
      this.socket.emit("datos2", {
        query: this.query
      });
    },
    obtenerResults() {
      this.socket.on("resultados", (results)=> {
        this.eliminarTabla()
        this.obtenerTabla(results);
      });
    },
    obtenerTabla(results) {
      var claves = [];

      if (results.length > 0) {
        claves = Object.keys(results[0]);
        // creamos una fila
        let fila = document.createElement("tr");
        for (let x = 0; x < claves.length; x++) {
          let celda = document.createElement("th");
          celda.textContent = claves[x];
          fila.append(celda);
        }
        document.getElementById("miTabla").append(fila);
      }

      for (let x = 0; x < results.length; x++) {
        let fila = document.createElement("tr");
        // para cada clave
        for (let y = 0; y < claves.length; y++) {
          // creamos una celda y rellenamos los datos
          let celda = document.createElement("td");
          celda.textContent = results[x][claves[y]];
          fila.append(celda);
        }
        // añadimos la fila a la tabla
        document.getElementById("miTabla").append(fila);
      }
    },
    eliminarTabla() {
      var Table = document.getElementById("miTabla");
      Table.innerHTML = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.alineacion {
  margin-top: 50px;
  margin-left: 80px;
  text-align: left;
  height: 150px;
  width: 270px;
  float: left;
  margin-right: 120px;
}
.alineacion2 {
  margin-top: 35px;
  margin-left: 80px;
  text-align: left;
  height: 150px;
  width: 270px;
  float: left;
  margin-right: 120px;
}
.bordes {
  border: 1px;
  border-style: double;
}
.tabla {
  text-align: left;
  margin-top: 300px;
  margin-left: 50px;
}
</style>
