<script lang="ts">
import { obterCategorias } from '../http/index';
import type ICategoria from '../interfaces/ICategoria';
import CardCategoria from './CardCategoria.vue';

export default {
  name: 'SelecionarIngredientes',
  emits: ['remover-ingrediente', 'adicionar-ingrediente'],
  components: {
    CardCategoria
  },
  data() {
    return {
      categorias: [] as ICategoria[],
      searchTerm: '',
      selectedIngredientes: [] as string[]
    }
  },
  computed: {
    filteredCategorias() {
      if (!this.searchTerm) {
        return this.categorias;
      }
      return this.categorias
        .map(categoria => {
          const ingredientesFiltrados = categoria.ingredientes.filter(ingrediente =>
            ingrediente.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          if (ingredientesFiltrados.length > 0) {
            return {
              ...categoria,
              ingredientes: ingredientesFiltrados
            };
          }
          return null;
        })
        .filter(categoria => categoria !== null) as ICategoria[];
    }
  },
  async created() {
    this.categorias = await obterCategorias();
  },
  methods: {
    adicionarIngrediente(ingrediente: string) {
      if (!this.selectedIngredientes.includes(ingrediente)) {
        this.selectedIngredientes.push(ingrediente);
      }
      this.$emit('adicionar-ingrediente', ingrediente);
    },
    removerIngrediente(ingrediente: string) {
      const index = this.selectedIngredientes.indexOf(ingrediente);
      if (index > -1) {
        this.selectedIngredientes.splice(index, 1);
      }
      this.$emit('remover-ingrediente', ingrediente);
    }
  }
}
</script>

<template>
  <section class="selecionar-ingredientes">
    <h1 class="cabecalho titulo-ingredientes">Ingredientes</h1>

    <input class="search-input" type="text" v-model="searchTerm" placeholder="Pesquisar ingrediente..." />

    <p class="paragrafo-lg instrucoes">
      Selecione abaixo os ingredientes que você quer usar nesta receita:
    </p>

    <ul class="categorias">
      <li v-for="categoria in filteredCategorias" :key="categoria.nome">
        <CardCategoria 
          :categoria="categoria"
          :selected-ingredientes="selectedIngredientes"
          @remover-ingrediente="removerIngrediente"
          @adicionar-ingrediente="adicionarIngrediente" />
      </li>
    </ul>

    <p class="paragrafo dica">
      *Atenção: consideramos que você tem em casa sal, pimenta e água.
    </p>
  </section>
</template>

<style scoped>

.search-input {
	border: 1px solid #F0633C;
    padding: .5rem 1rem;
    border-radius: 6px;
    font-size: 14px;
	font-weight: 600;
    width: 20rem;
    margin-bottom: 20px;
}

.selecionar-ingredientes {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.titulo-ingredientes {
	color: var(--verde-medio, #3D6D4A);
	display: block;
	margin-bottom: 1.5rem;
}

.instrucoes {
	margin-bottom: 2rem;
}

.categorias {
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
	gap: 1.5rem;
	flex-wrap: wrap;
}

.dica {
	align-self: flex-start;
	margin-bottom: 3.5rem;
}

@media only screen and (max-width: 767px) {
	.dica {
		margin-bottom: 2.5rem;
	}
}
</style>
