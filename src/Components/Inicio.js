import styles from './Inicio.module.css';


// Essa página Inicio fiz apenas para colocar uma mensagem de boas-vindas.
function Inicio() {
    return(
        <div className={styles.container}>
            <h1 className={styles.texto}> Bem-Vindo ao Seu Sistema de Gerenciamento de Gastos! </h1>
        </div>
    );
}
export default Inicio