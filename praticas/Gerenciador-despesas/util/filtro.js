export const TODAS_CATEGORIAS = 'Todas';

export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === TODAS_CATEGORIAS) {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}
