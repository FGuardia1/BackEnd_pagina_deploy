const socket = io.connect();

const desnormalizar = normalizr.denormalize;

const authorSchema = new normalizr.schema.Entity("author");

const mensajeSchema = new normalizr.schema.Entity("mensaje", {
  author: authorSchema,
});
const chatSchema = new normalizr.schema.Entity("chat", {
  mensajes: [mensajeSchema],
});

const renderProduct = (data) => {
  const html = data
    .map((elem, index) => {
      return `
	    <tr>
          <td>${elem.title}</td>
          <td>${elem.price}</td>
          <td class="w-25 p-3"><img
              src="${elem.thumbnail}"
              alt="..."
              class="img-fluid"
            /></td>
        </tr>`;
    })
    .join(" ");
  document.querySelector("#tableBody").innerHTML = html;
};

const renderMessages = (data) => {
  const html = data
    .map((elem, index) => {
      let date = new Date(elem.date).toLocaleString();
      return `<div >
				<strong class="text-primary">${elem.author.id}</strong><span style="color:brown">[${date}]</span>:
				<i style="color:green">${elem.text}</i>  
    <img width="20" height="20" src=${elem.author.avatar} />`;
    })
    .join(" ");
  document.querySelector("#messages").innerHTML = html;
};

const renderProductAdd = (data) => {
  const html = `
	<td>${data.title}</td>
	<td>${data.price}</td>
	<td alt="Max-width 50%"><img
		src="${data.thumbnail}"
		alt="..."
		class="img-fluid "
	  /></td>`;
  const tr = document.createElement("tr");
  tr.innerHTML = html;
  document.querySelector("#tableBody").append(tr);
};

const renderMessageAdd = (data) => {
  let date = new Date(data.date).toLocaleString();
  const html = `
  <strong class="text-primary">${data.author.id}</strong><span style="color:brown">[${date}]</span>:
  <i style="color:green">${data.text}</i>
	<img width="20" height="20" src=${data.author.avatar} />`;
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").append(div);
};

const addProduct = (e) => {
  const product = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  socket.emit("new-product", product);
  return false;
};

const addMessage = (e) => {
  const message = {
    author: {
      id: document.querySelector("#userEmail").value,
      nombre: document.querySelector("#userNombre").value,
      apellido: document.querySelector("#userApellido").value,
      edad: document.querySelector("#userEdad").value,
      alias: document.querySelector("#userAlias").value,
      avatar: document.querySelector("#userAvatar").value,
    },
    text: document.querySelector("#text").value,
    date: new Date(),
  };
  socket.emit("new-message", message);
  return false;
};

const setCompresion = (lenghtNorm, lenghtOrig) => {
  let porc = (lenghtNorm / lenghtOrig) * 100;
  porc = (100 - porc).toFixed(2);

  document.querySelector(
    "#compresionChat"
  ).innerHTML = `La compresion es de ${porc}%`;
};

socket.on("list-product", (data) => {
  renderProduct(data);
});

socket.on("product-push", (data) => {
  renderProductAdd(data);
});

socket.on("messages", (data) => {
  const data_denormalizada = desnormalizar(
    data.result,
    chatSchema,
    data.entities
  );
  setCompresion(
    JSON.stringify(data).length,
    JSON.stringify(data_denormalizada).length
  );
  renderMessages(data_denormalizada.mensajes);
});

socket.on("messages-push", (data) => {
  renderMessageAdd(data);
});
