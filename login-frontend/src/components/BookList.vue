<template>
    <div class="book-list-container">
      <!-- Contêiner para a lista de livros -->
      <ul class="book-list">
        <!-- Para cada livro na lista, cria um item de lista correspondente -->
        <li v-for="book in books" :key="book._id" class="book-item">
          <!-- Mostra o título, autor e ano de publicação do livro -->
          <span>{{ book.title }} - {{ book.author }} ({{ book.year }})</span>
          <!-- Botão que aciona a função para editar o livro -->
          <button @click="editBook(book)" class="edit-button">Editar</button>
          <!-- Botão que chama a função para remover o livro da lista -->
          <button @click="deleteBook(book._id)" class="delete-button">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  // Importa a API para realizar as chamadas HTTP necessárias
  import api from '../services/api'; 
  
  export default {
    data() {
      return { 
        books: [] // Variável que mantém a lista de livros no estado local
      };
    },
    methods: {
      fetchBooks() { // Método que busca os livros do servidor
        api.getBooks().then(response => {
          this.books = response.data; // Atualiza a lista de livros com os dados recebidos
        });
      },
      deleteBook(id) { // Método que exclui um livro com base em seu ID
        api.deleteBook(id).then(() => {
          this.fetchBooks(); // Recarrega a lista de livros após a exclusão
        });
      },
      editBook(book) { // Método para iniciar a edição de um livro
        this.$emit('edit-book', book); // Emite um evento para o componente pai com o livro selecionado
        console.log('Editando livro:', book); // Registra no console o livro que está sendo editado
      },
    },
    mounted() {
      this.fetchBooks(); // Executa a busca de livros quando o componente é montado
    },
  };
  </script>
  
  <style scoped>
  /* Importa a fonte Jost do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
  
  /* Define a fonte Jost para o texto do elemento span */
  span {
    font-family: 'Jost', sans-serif;
  }
  
  .book-list-container {
    margin-top: 20px; /* Espaço acima do contêiner da lista de livros */
  }
  
  .book-list {
    list-style: none; /* Remove a marcação padrão da lista */
    padding: 0; /* Remove o preenchimento da lista */
  }
  
  .book-item {
    display: flex; /* Alinha os itens na horizontal */
    justify-content: space-between; /* Distribui o espaço entre os itens */
    align-items: center; /* Alinha os itens verticalmente ao centro */
    padding: 15px; /* Espaço interno dos itens da lista */
    border: 2px solid #2b2d42; /* Borda ao redor de cada item */
    border-radius: 10px; /* Cantos arredondados para um visual suave */
    margin-bottom: 10px; /* Espaço abaixo de cada item */
    background-color: #f6f6f6; /* Cor de fundo padrão dos itens */
    transition: background-color 0.3s, transform 0.2s; /* Transições suaves para mudanças de estado */
  }
  
  .book-item:hover {
    background-color: #c4e3f3; /* Cor de fundo ao passar o mouse */
    transform: scale(1.02); /* Leve aumento no tamanho ao passar o mouse */
  }
  
  span {
    font-family: 'Nunito', sans-serif; /* Fonte para o texto do livro */
    font-weight: 600; /* Peso da fonte para destaque */
    color: #3c3f4d; /* Cor do texto */
  }
  
  .edit-button, .delete-button {
    padding: 12px 20px; /* Espaçamento interno dos botões */
    border: none; /* Remove a borda padrão dos botões */
    border-radius: 8px; /* Cantos arredondados nos botões */
    cursor: pointer; /* Muda o cursor para indicar que é clicável */
    font-weight: bold; /* Destaca o texto dos botões */
    transition: background-color 0.3s, transform 0.2s; /* Transições suaves para alterações nos botões */
    font-size: 14px; /* Tamanho da fonte dos botões */
  }
  
  .edit-button {
    background-color: #3a86ff; /* Cor de fundo do botão de editar */
    color: white; /* Cor do texto do botão de editar */
  }
  
  .edit-button:hover {
    background-color: #2f5bbf; /* Cor de fundo ao passar o mouse no botão de editar */
    transform: scale(1.05); /* Aumenta o botão ao passar o mouse */
  }
  
  .delete-button {
    background-color: #ff006e; /* Cor de fundo do botão de excluir */
    color: white; /* Cor do texto do botão de excluir */
  }
  
  .delete-button:hover {
    background-color: #e40055; /* Cor de fundo ao passar o mouse no botão de excluir */
    transform: scale(1.05); /* Aumenta o botão ao passar o mouse */
  }
  </style>
  