import type ICategoria from '@/interfaces/ICategoria'
import type IReceitas from '@/interfaces/IReceita'

export async function obterCategorias() {
  const resposta = await fetch('https://gist.githubusercontent.com/VitorTo/946480443a12ca009f9e4d0ef819c055/raw/e1e1479ffaa6c55013a72e9c04ca44d74a36b407/categorias.json');

  const categorias: ICategoria[] = await resposta.json();

  return categorias;
}

export async function obterReceitas(ingredientes: string[]) {

  const resposta = await fetch('https://gist.githubusercontent.com/VitorTo/946480443a12ca009f9e4d0ef819c055/raw/6286a97637ad1fa3c6cc3a76bbc0973e4ab3f569/receitas.json');

  const receitas: IReceitas[] = await resposta.json();

  return receitasFiltradas(receitas, ingredientes);
}

function receitasFiltradas(receitas: IReceitas[], ingredientes: string[]) {
  return receitas.filter(receita => {
    const ingredientesDaReceita = receita.ingredientes;
    return ingredientesDaReceita.every(ingrediente => ingredientes.includes(ingrediente));
  });
}