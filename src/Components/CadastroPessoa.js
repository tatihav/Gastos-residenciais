// O useState cria variáveis para armazenar os dados, salvar a lista de pessoas e as transações. Também permite que o React atualize a tela automaticamente quando mudar os dados.

import { useState } from "react";

// Criei um componente set que recebe pessoas e transações para exibir e modificar a lista.
function CadastroPessoa({ pessoas, setPessoas, transacoes, setTransacoes }){
    const [form, setForm] = useState({ nome: "", idade: ""});
// Aqui usei o handleChange para atualizar o estado do formulário.     
    function handleChange(e){
        setForm({ ...form, [e.target.name]: e.target.value});
    }
// Quis fazer um alerta e uma trava caso o usuário esqueça de digitar em algum campo.    
    function adicionarPessoa() {
        if (!form.nome || !form.idade) return alert("Por favor, preencha todos os campos.")
// Cada nova pessoa recebe um identificador único e sequencial, assim cada pessoa tem um identificador diferente.          
     const novaPessoa = {
        identificador: pessoas.length + 1,
        nome: form.nome,
        idade: parseInt(form.idade),
     };
// Atualizando a lista de pessoas e como serForm limpando os campos de formulário     
     setPessoas([...pessoas, novaPessoa]);
     setForm({ nome: "", idade: ""});
    }
// Essa parte do código remove uma pessoa da lista usando o ID, remove também as transações dessa pessoa caso tenha. o set faz com que a lista seja atualizada    
    function deletarPessoa(id){
        const novasPessoas = pessoas.filter((p) => p.identificador !== id);
        setPessoas(novasPessoas);
        if (transacoes && setTransacoes){
            const novasTransacoes = transacoes.filter((t) => t.pessoaId !== id);
            setTransacoes(novasTransacoes);
        }
    }
// Criado um formulário onde o usuário pode adicionar uma pessoa (Nome e idade). A lista de pessoas é atualizada usando .map(). E cada pessoa tem um botão excluir.     
    return(
        <div>
            <p> Cadastrar Nova Pessoa</p>
            <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
            <input name="idade" placeholder="Idade" value={form.idade} onChange={handleChange} />
            <button onClick={adicionarPessoa}> Adicionar</button>
            <h3> Lista de Pessoas</h3>
            <ul>
                {pessoas.map((p) =>(
                    <li key={p.identificador}>
                        {p.identificador} - {p.nome} ({p.idade} anos)
                        <button onClick={() => deletarPessoa(p.identificador)}> Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
export default CadastroPessoa