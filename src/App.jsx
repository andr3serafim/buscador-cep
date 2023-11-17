import { useState } from 'react'
import './App.css'
import { FiSearch } from 'react-icons/fi'
import api from './services/Api'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch() {

    if (input === '') {
      alert("Informe o CEP")
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert("Erro ao buscar CEP")
      setInput('')
    }

  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador de CEP</h1>
      <div className='container-input'>
        <input className='input-cep'
          type="text"
          name=""
          id=""
          value={input}
          onChange={e => setInput(e.target.value)}  //passo o que foi digitado para o setInput alterar o valor
          placeholder='Digite o CEP' />
        <button className='button-search'
          onClick={handleSearch}
        ><FiSearch size={25} /></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span><strong>Logradouro:</strong> {cep.logradouro}</span>
          <span><strong>Complemento:</strong> {cep.complemento}</span>
          <span><strong>Bairro:</strong> {cep.bairro}</span>
          <span><strong>Localidade:</strong> {cep.localidade} - {cep.uf}</span>
        </main>)}
    </div>
  )
}

export default App