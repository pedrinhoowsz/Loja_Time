export class Produto {
  id: number = 0;
  nome: string = '';
  descricao: string = '';
  preco: number = 0;
  imagem: string = '';
  time: string = '';
  categoria: string = '';
  /** Lista separada por vírgula, ex.: "P,M,G,GG" */
  tamanhos: string = '';
  ativo: boolean = true;

  /** Tamanhos já separados em array */
  static listaTamanhos(p: Produto): string[] {
    return p.tamanhos
      ? p.tamanhos.split(',').map(t => t.trim()).filter(t => t.length > 0)
      : [];
  }
}
