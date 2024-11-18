<template>
  <!-- Wrapper principal que contém a estrutura do login -->
  <div class="login-wrapper">
    <div class="login">
      
      <!-- Título da página de Login -->
      <h1>LOGIN</h1>

      <!-- Formulário para realizar o login -->
      <form @submit.prevent="loginUser">
        
        <!-- Campo de entrada para o nome da conta -->
        <div class="container">
          <input v-model="username" type="text" name="text" class="input" required />
          <label class="label">Nome da Conta</label>
        </div>
        
        <!-- Campo de entrada para a senha -->
        <div class="container">
          <input v-model="password" type="password" name="password" class="input" required />
          <label class="label">Senha</label>
        </div>
        
        <!-- Botões de ação: logar e ir para o cadastro -->
        <button class="form-submit-button" type="submit">Logar</button>
        <button class="form-submit-button" type="button" @click="goToCadastro">Cadastrar</button>

      </form>

      <!-- Exibe uma mensagem de erro ou sucesso após a tentativa de login -->
      <p v-if="message">{{ message }}</p>
      
      <!-- Botão para redirecionar o usuário para o painel CRUD -->
      <button @click="goToApp" class="form-redirect-button">crud</button>
      
    </div>
  </div>
</template>
  
<script>
import api from '../axios';

export default {
  data() {
    return {
      // Armazena o nome de conta, senha e a mensagem de erro ou sucesso
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    // Método assíncrono para realizar o login
    async loginUser() {
      try {
        // Envia uma requisição POST para o backend com o nome de conta e senha
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });
        // Se o login for bem-sucedido, armazena o token e redireciona para o dashboard
        this.message = 'Login bem-sucedido!';
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        // Exibe uma mensagem de erro caso algo dê errado
        this.message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erro ao fazer login.';
      }
    },
    // Método para redirecionar para o painel do App
    goToApp() {
      this.$router.push('/app'); // Redireciona para a página administrativa
    },
    // Método para redirecionar para a página de cadastro
    goToCadastro() {
      this.$router.push('/cadastro'); // Redireciona para a página de cadastro
    }
  }
};
</script>

  
<style scoped>
/* Estilos para o wrapper que centraliza o conteúdo */
.login-wrapper {
  font-family: Arial, sans-serif; /* Fonte padrão para o layout */
  background-color: #f2f2f2; /* Cor de fundo do login */
  display: flex;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  height: 100vh; /* Ocupa 100% da altura da tela */
}

/* Estilo para a caixa de login */
.login {
  display: flex;
  flex-direction: column; /* Organiza os elementos verticalmente */
  align-items: center; /* Centraliza os itens horizontalmente */
  justify-content: center; /* Centraliza os itens verticalmente */
  background-color: #ffffff; /* Cor de fundo da caixa */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px; /* Espaçamento interno */
  max-width: 400px; /* Largura máxima da caixa */
  width: 100%; /* Largura total da caixa */
  margin: 20px; /* Margem externa */
}

/* Estilo para o título */
h1 {
  font-size: 5rem; /* Tamanho grande do título */
  color: #333; /* Cor escura do título */
  text-align: center; /* Alinha o título ao centro */
}

/* Estilo para os containers de cada campo */
.container {
  position: relative; /* Necessário para o posicionamento do label */
  margin-bottom: 20px; /* Espaço entre os campos */
  width: 100%; /* O campo ocupa 100% da largura disponível */
}

/* Estilo para os campos de entrada */
.input {
  width: 100%; /* Campo ocupa toda a largura disponível */
  padding: 10px; /* Espaçamento interno */
  border: 1px solid #ccc; /* Cor da borda */
  border-radius: 4px; /* Bordas arredondadas */
  font-size: 1rem; /* Tamanho da fonte */
  background-color: #f9f9f9; /* Cor de fundo do campo */
  transition: border-color 0.3s ease; /* Transição suave para a cor da borda */
}

/* Estilo do campo de entrada quando está em foco (ao clicar) */
.input:focus {
  border-color: #4CAF50; /* Cor da borda quando em foco */
  outline: none; /* Remove o contorno padrão do navegador */
}

/* Estilo do label acima dos campos de entrada */
.label {
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 0.8rem; /* Tamanho reduzido do label */
  color: #888; /* Cor mais clara do texto */
  background-color: #fff; /* Cor de fundo do label */
  padding: 0 5px; /* Espaçamento para garantir que o texto não encoste na borda */
}

/* Estilo dos botões de submit e redirecionamento */
.form-submit-button, .form-redirect-button {
  width: 100%; /* Botão ocupa 100% da largura */
  padding: 10px; /* Espaçamento interno do botão */
  border: none; /* Remove a borda padrão */
  border-radius: 4px; /* Bordas arredondadas */
  font-size: 1rem; /* Tamanho da fonte */
  background-color: #4CAF50; /* Cor de fundo do botão */
  color: white; /* Cor do texto */
  cursor: pointer; /* Indica que o botão é clicável */
  transition: background-color 0.3s ease; /* Transição suave para a cor */
  margin-bottom: 10px; /* Espaço entre os botões */
}

/* Efeito de hover nos botões */
.form-submit-button:hover, .form-redirect-button:hover {
  background-color: #45a049; /* Muda a cor ao passar o mouse */
}

/* Estilo para a mensagem de erro ou sucesso */
.message {
  margin-top: 10px;
  color: #ff0000; /* Cor vermelha para mensagens de erro */
  font-size: 0.9rem;
}

/* Ajustes para telas menores */
@media (max-width: 500px) {
  .login {
    padding: 15px; /* Reduz o padding para telas pequenas */
  }
  h1 {
    font-size: 1.5rem; /* Reduz o tamanho do título em telas pequenas */
  }
  .input, .form-submit-button, .form-redirect-button {
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
}
</style>
