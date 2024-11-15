<script lang="ts">

import SelecionarIngredientes from './SelecionarIngredientes.vue';
import SuaLista from './SuaLista.vue';
import Rodape from './Rodape.vue';
import BuscarReceitas from './BuscarReceitas.vue';
import MostrarReceitas from './MostrarReceitas.vue';
import { obterReceitas } from '../http';
import type IReceita from '../interfaces/IReceita';
import BackHome from './BackHome.vue';

type Pagina = "SelecionarIngredientes" | "MostrarReceitas";

export default {
	components: { SelecionarIngredientes, SuaLista, BuscarReceitas, Rodape, MostrarReceitas, BackHome },
	data() {
		return {
			ingredientes: [] as string[],
			pagina: "SelecionarIngredientes" as Pagina,
			receitas: [] as IReceita[],
		};
	},
	methods: {
		removerIngrediente(ingrediente: string) {
			this.ingredientes = this.ingredientes.filter(iLista => ingrediente !== iLista);
		},
		adicionarIngrediente(ingrediente: string) {
			this.ingredientes.push(ingrediente);
		},
		async navegar(pagina: Pagina) {
			if (pagina === "MostrarReceitas") {
				this.receitas = await obterReceitas(this.ingredientes);
			}

			setTimeout(() => {
				this.pagina = pagina;
			}, 500);
		},
	},
	computed: {
		showSelecionarIngredientes() {
			return this.pagina === "SelecionarIngredientes";
		},
		showMostrarReceitas() {
			return this.pagina === "MostrarReceitas";
		}
	}

}
</script>

<template>
	<main class="conteudo-principal">
		<SuaLista :ingredientes="ingredientes" />

		<keep-alive include="SelecionarIngredientes">
			<SelecionarIngredientes v-if="showSelecionarIngredientes" @remover-ingrediente="removerIngrediente"
				@adicionar-ingrediente="adicionarIngrediente" />
			<MostrarReceitas v-else-if="showMostrarReceitas" :receitas="receitas" />
		</keep-alive>

		<BuscarReceitas 
			v-if="showSelecionarIngredientes" 
			@buscar-receitas="navegar('MostrarReceitas')"
			:active="ingredientes.length > 0" 
		/>
		<back-home v-if="showMostrarReceitas" @back-home="navegar('SelecionarIngredientes')" />
	</main>

	<Rodape />
</template>

<style scoped>
.conteudo-principal {
	padding: 6.5rem 7.5rem;
	border-radius: 3.75rem 3.75rem 0rem 0rem;
	background: var(--creme, #FFFAF3);
	color: var(--cinza, #444);

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5rem;
}

@media only screen and (max-width: 1300px) {
	.conteudo-principal {
		padding: 5rem 3.75rem;
		gap: 3.5rem;
	}
}

@media only screen and (max-width: 767px) {
	.conteudo-principal {
		padding: 4rem 1.5rem;
		gap: 4rem;
	}
}
</style>
