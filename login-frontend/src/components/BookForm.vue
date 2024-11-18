<template>
    <div class="bookform-container">
      <!-- Formulário que bloqueia o envio padrão e chama um método customizado -->
      <form @submit.prevent="handleSubmit">
        <!-- Campo de entrada para o título do livro -->
        <input class="input-field" v-model="book.title" placeholder="Título" required />
        <!-- Campo de entrada para o nome do autor -->
        <input class="input-field" v-model="book.author" placeholder="Autor" required />
        <!-- Campo de entrada para o ano de publicação -->
        <input class="input-field" v-model="book.year" placeholder="Ano" required />
        <!-- Botão de submissão, alterando o texto conforme se está adicionando ou editando -->
        <button class="submit-button" type="submit">{{ book._id ? 'Atualizar' : 'Adicionar' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  // Faz a importação do serviço de API para as requisições
  import api from '@/services/api'; 
  
  export default {
    // Recebe o livro a ser editado como propriedade do componente
    props: ['bookToEdit'], 
    data() {
      return {
        // Inicializa o estado do livro, usando o livro recebido via prop ou um objeto vazio
        book: this.bookToEdit || { title: '', author: '', year: null }, 
      };
    },
    watch: {
      // Monitora alterações na propriedade bookToEdit
      bookToEdit: {
        immediate: true, // Executa a função assim que o componente for montado
        handler(newVal) {
          // Atualiza o estado do livro sempre que a prop mudar
          this.book = newVal || { title: '', author: '', year: null }; 
        },
      },
    },
    methods: {
      handleSubmit() {
        // Verifica se o livro já tem um ID para definir se é uma atualização ou adição
        if (this.book._id) {
          api.updateBook(this.book._id, this.book).then(() => {
            // Dispara um evento ao atualizar o livro
            this.$emit('book-updated'); 
          });
        } else {
          // Caso não tenha um ID, adiciona um novo livro
          api.addBook(this.book).then(() => {
            // Dispara um evento ao adicionar um novo livro
            this.$emit('book-added'); 
          });
        }
      },
    },
  };
  </script>  
  
  <style scoped>
.bookform-container {
  max-width: 420px;
  margin: 30px auto;
  padding: 25px;
  border: 2px solid #5c67f2; 
  border-radius: 20px; 
  background-color: #f4f7fe; 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); 
}

.input-field {
  width: 96%; /* Largura do campo */
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #3e4ca7; /* Cor da borda */
  border-radius: 15px; /* Bordas arredondadas */
  font-size: 17px;
  font-family: 'Poppins', sans-serif; 
  background-color: #eef0fc; /* Cor de fundo suave */
  transition: border-color 0.4s, box-shadow 0.4s; /* Transições suaves */
}

.input-field:focus {
  border-color: #2a357c; /* Cor da borda ao focar */
  box-shadow: 0 0 10px rgba(60, 70, 170, 0.5); /* Adiciona uma sombra ao focar */
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4a55d1; 
  color: white;
  border: none;
  border-radius: 25px; 
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px; /* Espaçamento entre letras */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s; /* Transições para efeito */
}

.submit-button:hover {
  background-color: #3642a5; /* Muda a cor de fundo ao passar o mouse */
  transform: scale(1.06); /* Aumenta o tamanho ao passar o mouse */
  box-shadow: 0 8px 16px rgba(60, 70, 170, 0.4); /* Adiciona uma sombra ao passar o mouse */
}

  </style>