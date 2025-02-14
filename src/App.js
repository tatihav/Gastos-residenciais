import { useState } from "react";
import Inicio from './Components/Inicio';
import CadastroPessoa from './Components/CadastroPessoa';
import CadastroTransacao from './Components/CadastroTransacao';
import ConsultaTotais from './Components/ConsultaTotais';

function App() {

// O UseState controla a tela ativa para aparecer apenas as informações referente ao botão clicado.
  const [telaAtiva, setTelaAtiva ] = useState("");
  const [pessoas, setPessoas ] = useState([]);
  const [transacoes, setTransacoes ] = useState([]);
      
return (
  // Incluíndo a tela de inicio, e adicionando os botões de navegação. Apenas a tela correspondente ao botão será exibida.
  <div>
    <Inicio />

   <button onClick={() =>setTelaAtiva("pessoas")}>Cadastro de Pessoas</button> 
   <button onClick={() =>setTelaAtiva("transacoes")}>Cadastro de Transações</button> 
   <button onClick={() =>setTelaAtiva("totais")}>Consulta de Totais</button> 

   {telaAtiva === "pessoas" && <CadastroPessoa pessoas={pessoas} setPessoas={setPessoas} transacoes={transacoes} setTransacoes={setTransacoes} />}
   {telaAtiva === "transacoes" && <CadastroTransacao transacoes={transacoes} setTransacoes={setTransacoes} pessoas={pessoas} />}
   {telaAtiva === "totais" && <ConsultaTotais pessoas={pessoas} transacoes={transacoes} />}



  </div>
        
  );
}

export default App;
