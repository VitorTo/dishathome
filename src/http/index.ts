import type ICategoria from '@/interfaces/ICategoria'
import type IReceitas from '@/interfaces/IReceita'

export async function obterCategorias() {
  const resposta = await fetch('https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/07e853b7d0626db51ce2e84bb2f15ca450b7bd7f/categorias.json');

  const categorias: ICategoria[] = await resposta.json();

  return categorias;
}

export async function obterReceitas(ingredientes: string[]) {
  console.log(ingredientes);
  const ingredientesFormatados = ingredientes.join(',');

  const resposta = await fetch('https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/receitas.json');

  const receitas: IReceitas[] = await resposta.json();

  return receitasFiltradas(receitas, ingredientes);
}

function receitasFiltradas(receitas: IReceitas[], ingredientes: string[]) {
  return receitas.filter(receita => {
    const ingredientesDaReceita = receita.ingredientes;
    return ingredientes.every(ingrediente => ingredientesDaReceita.includes(ingrediente));
  });
}