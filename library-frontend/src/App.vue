<template>
  <div id="app">
    <!-- Componente responsável pelo formulário de livros, recebendo o livro para edição e disparando eventos -->
    <BookForm :bookToEdit="bookToEdit" @book-added="fetchBooks" @book-updated="fetchBooks" />
    
    <!-- Componente para exibir a lista de livros, disparando um evento ao selecionar um livro para editar -->
    <BookList @edit-book="setBookToEdit" ref="bookList" />
  </div>
</template>

<script>
// Faz a importação dos componentes BookList e BookForm
import BookList from './components/BookList.vue';
import BookForm from './components/BookForm.vue';

export default {
  data() {
    return {
      bookToEdit: null, // Armazena o livro a ser editado (inicia com valor nulo)
    };
  },
  components: {
    // Registra os componentes utilizados no template
    BookList,
    BookForm,
  },
  methods: {
    setBookToEdit(book) {
      this.bookToEdit = book; // Atualiza o livro a ser editado quando o evento é disparado
    },
    fetchBooks() {
      this.$refs.bookList.fetchBooks(); // Aciona o método fetchBooks do componente BookList para recarregar a lista de livros
      this.bookToEdit = null; // Reseta o livro a ser editado após a atualização
    },
  },
};
</script>
