// Criado um componente que recebe pessoas e transacoes. Um array totaisPorPessoa, para que cada pessoa cadastrada receba o cálculo da receita, despesa e saldo.
function ConsultaTotais({ pessoas, transacoes}){
    const totaisPorPessoa = pessoas.map((pessoa) =>{
// Criado um array transacaoPessoa para guardar as transações que pertencem à pessoa atual.        
        const transacoesPessoa = transacoes.filter((t) => t.pessoaId === pessoa.identificador);
// Filtrando apenas as transações do tipo receita, e soma seus valores. E após o mesmo com as despesa.       
        const totalReceita = transacoesPessoa
            .filter((t) => t.tipo === "receita")
            .reduce((acc,t) => acc + t.valor, 0);
        const totalDespesa = transacoesPessoa
            .filter((t) => t.tipo === "despesa")
            .reduce((acc,t) => acc + t.valor, 0);
// Criado um novo objeto com os totais de cada pessoa. Incluindo o cálculo do saldo.        
    return {
        ...pessoa,
        totalReceita,
        totalDespesa,
        saldo: totalReceita - totalDespesa,
    };

});
// Calculo para os resultados gerais, somando todas as receitas e despesas do sistema para obter saldo final.
const totalReceitaGeral = transacoes
    .filter((t) => t.tipo ==="receita")
    .reduce((acc,t) => acc + t.valor, 0);
const totalDespesaGeral = transacoes
    .filter((t) => t.tipo ==="despesa")
    .reduce((acc,t) => acc + t.valor, 0);
const saldoGeral = totalReceitaGeral - totalDespesaGeral;

// Criação da estrutura da interface. Exibimos uma lista com os totais individuais de cada pessoa. E após uma seção para os totais gerais.
return(
    <div>
        <h2> Consulta de Totais</h2>
        <h3> Totais por Pessoa</h3>
        <ul>
            {totaisPorPessoa.map((p) => (
                <li key={p.identificador}>
                    <strong>{p.nome}</strong>: Receita R$ {p.totalReceita.toFixed(2)},
                    Despesa R$ {p.totalDespesa.toFixed(2)}, Saldo R$ {p.saldo.toFixed(2)}
                </li>
            ))}
        </ul>
  
        <h3> Total Geral</h3>
        <p><strong> Receita:</strong> R$ {totalReceitaGeral.toFixed(2)}</p>
        <p><strong> Despesa:</strong> R$ {totalDespesaGeral.toFixed(2)}</p>
        <p><strong> Saldo Líquido:</strong> R$ {saldoGeral.toFixed(2)}</p>
    </div>
);    
}
export default ConsultaTotais