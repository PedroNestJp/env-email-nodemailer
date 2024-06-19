import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    mensagem: '',
    anexo: ''
  });
  function handleInputChange(event) {
    if (event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampos(campos);
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(campos);
    send();
    window.alert("Email enviado com sucesso!");
  }

  function send() {
    const formData = new FormData();
    Object.keys(campos).forEach(key => {
      formData.append(key, campos[key]);
    })
    axios.post("/send", formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
      .then(response => window.alert(response))
      .catch(error => console.log(error))
  }

  return (
    <div className="main">
      <div className="container">
        <form onSubmit={handleFormSubmit} encType=" multipart/form-data ">
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" placeholder="E-mail de destino.." onChange={handleInputChange} />
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" placeholder="Nome da pessoa.." onChange={handleInputChange} />
          <label htmlFor="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" placeholder="Escreva algo.." className="textArea" onChange={handleInputChange}></textarea>
          <label htmlFor="anexo">Anexo</label>
          <input type="file" id="anexo" name="anexo" onChange={handleInputChange} />
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default App;
