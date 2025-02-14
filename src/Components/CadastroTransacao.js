// O useState cria variáveis para armazenar os dados do formulário e atualizar a lista de transações. Garante que a tela atualize automaticamente quando mudar os dados.
import { useState } from "react";

// Criado um componente que recebe transacoes e setTransacoes, permitindo adicionar novas transações. Também recebe pessoas, para garantir que cada transação seja vinculada a uma pessoa já cadastrada. 

function CadastroTransacao({ transacoes, setTransacoes, pessoas}){
    const [form, setForm] = useState({ descricao: "", valor: "", tipo: "despesa", pessoaId: ""});
// a função handleChange atualiza os dados digitados no formulário.     
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }
//Antes de cadastrar verifica se os campos estão todos preenchidos, respeitando aqui a regra do menor de idade que não pode adicionar receitas.     
    function adicionarTransacao() {
        if (!form.descricao || !form.valor || !form.pessoaId){
            return alert("Preencha todos os campos.")
        }
        
        const pessoaSelecionada = pessoas.find((p) => p.identificador === parseInt(form.pessoaId));
        if (!pessoaSelecionada) {
            return alert("Pessoa não encontrada!");
        }
        if (pessoaSelecionada.idade < 18 && form.tipo === "receita"){
            return alert("Menores de idade só podem adicionar despesas.")
        }
    // Criado um novo objeto novaTransacao, gerando um id único. Garante também que o valor e pessoaID sejam convertidos para números, evitando erros.    
        const novaTransacao = {
            id: transacoes.length + 1,
            descricao: form.descricao,
            valor: parseFloat(form.valor),
            tipo: form.tipo,
            pessoaId: parseInt(form.pessoaId),
        };
    // Atualiza a lista de transações e limpa os campos do formulário.    
        setTransacoes([...transacoes, novaTransacao]);
        setForm({ descricao: "", valor: "", tipo: "despesa", pessoaId: ""});

    }
// Criado a interface do formulário, contendo campos para descrição, valor, receita ou despesa, um seletor para vincular a transação a uma pessoa.    
    return(
        <div> 
            <h2>Cadastro de Transações</h2>
            <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
            <input name="valor" placeholder="Valor" type="number" value={form.valor} onChange={handleChange} />
            <select name="tipo" value={form.tipo} onChange={handleChange} >
                <option value="despesa">Despesa</option>
                <option value="receita">Receita</option>
            </select>
            <select name="pessoaId" value={form.pessoaId} onChange={handleChange}>
                <option value=""> Selecione uma Pessoa </option>
                {pessoas.map((p) => (
                    <option key={p.identificador} value={p.identificador}>
                        {p.nome} (ID: {p.identificador})
                    </option>
                ))}
            </select>
            <button onClick={adicionarTransacao}> Adicionar </button>
            <h3> Lista de Transações</h3>
            <ul>
                {transacoes.map((t) =>(
                    <li key={t.id}>
                        {t.id} - {t.descricao} - R$ {t.valor} ({t.tipo}) - Pessoa ID: {t.pessoaId}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CadastroTransacao