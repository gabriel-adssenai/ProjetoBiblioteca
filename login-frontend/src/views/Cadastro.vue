<template>
    <!-- Wrapper principal que contém toda a estrutura do login -->
    <div class="login-wrapper">
      <div class="login">
    
        <!-- Título da página de cadastro -->
        <h1>CADASTRO</h1>
    
        <!-- Formulário de cadastro -->
        <form @submit.prevent="criarUser">
    
          <!-- Campo de entrada para o nome de usuário -->
          <div class="container">
            <input v-model="username" type="text" name="text" class="input" required />
            <label class="label">Insira o nome do seu perfil</label>
          </div>
    
          <!-- Campo de entrada para a senha -->
          <div class="container">
            <input v-model="password" type="password" name="password" class="input" required />
            <label class="label">Crie uma senha</label>
          </div>
    
          <!-- Botões de ação: voltar e criar conta -->
          <button class="form-submit-button" type="button" @click="goToLogin">Voltar</button>
          <button class="form-submit-button" type="submit">Criar Conta</button>
    
        </form>
    
        <!-- Exibe uma mensagem de erro ou sucesso -->
        <p v-if="message">{{ message }}</p>
    
        <!-- Botão que redireciona para a página de CRUD -->
        <button @click="goToApp" class="form-redirect-button">crud</button>
    
      </div>
    </div>
  </template>
  
  <script>
import api from '../axios';

export default {
  data() {
    return {
      // Dados reativos que armazenam o nome de usuário, senha e a mensagem de erro ou sucesso
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    // Método que cria um novo usuário
    async criarUser() {
      try {
        // Faz a requisição POST para criar a conta
        const response = await api.post('/auth/register', {
          username: this.username,
          password: this.password,
        });
        // Caso o cadastro seja bem-sucedido, armazena o token e redireciona para o login
        this.message = 'Conta criada com sucesso!';
        localStorage.setItem('token', response.data.token);
        this.$router.push('/login');
      } catch (error) {
        // Exibe erro caso a requisição falhe
        this.message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erro ao criar conta.';
      }
    },
    // Método para redirecionar para a página do App
    goToApp() {
      this.$router.push('/app');
    },
    // Método para redirecionar de volta à página de login
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

  
<style scoped>
/* Estilos do container principal que ocupa toda a tela */
.login-wrapper {
  font-family: Arial, sans-serif; /* Fonte do layout */
  background-color: #f2f2f2; /* Cor de fundo do login */
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  height: 100vh; /* Altura 100% da tela */
}

/* Estilo da caixa de login/cadastro */
.login {
  display: flex;
  flex-direction: column; /* Organiza os itens de forma vertical */
  align-items: center; /* Centraliza os itens horizontalmente */
  justify-content: center; /* Centraliza os itens verticalmente */
  background-color: #ffffff; /* Cor de fundo da caixa */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para dar um destaque */
  padding: 50px; /* Espaçamento interno maior */
  max-width: 400px; /* Largura máxima da caixa */
  width: 100%; /* Largura total (para adaptação de tela) */
  margin: 20px; /* Espaçamento externo */
}

/* Título da página */
h1 {
  font-size: 5rem; /* Tamanho grande do título */
  color: #333; /* Cor escura para o título */
  text-align: center; /* Alinha o título ao centro */
}

/* Estilo para os containers de cada campo */
.container {
  position: relative; /* Necessário para o posicionamento do label */
  margin-bottom: 20px; /* Espaçamento entre os campos */
  width: 100%; /* Campo ocupa 100% da largura disponível */
}

/* Estilo para os campos de input */
.input {
  width: 100%; /* Campo ocupa toda a largura disponível */
  padding: 10px; /* Espaçamento interno do campo */
  border: 1px solid #ccc; /* Cor do borda do campo */
  border-radius: 4px; /* Borda arredondada */
  font-size: 1rem; /* Tamanho da fonte */
  background-color: #f9f9f9; /* Cor de fundo do campo */
  transition: border-color 0.3s ease; /* Transição suave na borda */
}

/* Foco do campo (quando o usuário clica no input) */
.input:focus {
  border-color: #4CAF50; /* Muda a cor da borda ao focar */
  outline: none; /* Remove o contorno padrão */
}

/* Estilo do label posicionado sobre o campo */
.label {
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 0.8rem; /* Tamanho pequeno para o label */
  color: #888; /* Cor mais clara para o label */
  background-color: #fff; /* Fundo branco para sobrepor o campo */
  padding: 0 5px; /* Pequeno espaçamento para o label */
}

/* Estilos para os botões de ação */
.form-submit-button, .form-redirect-button {
  width: 100%; /* Botão ocupa toda a largura */
  padding: 10px; /* Espaçamento interno do botão */
  border: none; /* Remove bordas */
  border-radius: 4px; /* Bordas arredondadas */
  font-size: 1rem; /* Tamanho do texto no botão */
  background-color: #4CAF50; /* Cor de fundo verde */
  color: white; /* Cor do texto */
  cursor: pointer; /* Indica que é clicável */
  transition: background-color 0.3s ease; /* Transição suave para a cor */
  margin-bottom: 10px; /* Espaçamento inferior entre os botões */
}

/* Efeito de hover nos botões */
.form-submit-button:hover, .form-redirect-button:hover {
  background-color: #45a049; /* Muda a cor do botão ao passar o mouse */
}

/* Estilo para mensagens de erro ou sucesso */
.message {
  margin-top: 10px;
  color: #ff0000; /* Cor vermelha para erros */
  font-size: 0.9rem;
}

/* Ajustes para dispositivos menores (telas pequenas) */
@media (max-width: 500px) {
  .login {
    padding: 15px; /* Reduz o padding para telas menores */
  }
  h1 {
    font-size: 1.5rem; /* Reduz o tamanho do título */
  }
  .input, .form-submit-button, .form-redirect-button {
    font-size: 0.9rem; /* Reduz o tamanho da fonte nos campos e botões */
  }
}
</style>