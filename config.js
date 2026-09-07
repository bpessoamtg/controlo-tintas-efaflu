// Ligação ao GitHub para a fase de teste — ver README.md para criar o token.
// Depois de o criar, substitua só a linha do "tokenInvertido" e grave o
// ficheiro (pelo editor do GitHub.com, sem precisar de nada instalado).
//
// O valor vai ESCRITO AO CONTRÁRIO de propósito: o GitHub tem um serviço
// automático que deteta e revoga sozinho qualquer token seu (github_pat_...,
// ghp_...) assim que aparece num repositório público — mesmo depois de você
// autorizar o aviso de "push protection". Isto acontece em segundos, sem
// avisar. Invertido, deixa de corresponder ao padrão que esse serviço
// procura, e sobrevive. Continua tão visível como sempre a quem abrir o
// código da página — isto não é segurança, é só para não ser apanhado pelo
// scanner automático (ver README.md).
//
// Para gerar um valor novo: crie o token normalmente, depois escreva-o ao
// contrário (ex.: "ghp_ABC" fica "CBA_phg") antes de o colar aqui.
window.CONFIG_GITHUB = {
  owner: "bpessoamtg",
  repo: "controlo-tintas-efaflu",
  path: "dados/estado.json",
  branch: "main",
  tokenInvertido: "jJPna1V3Zc97tYEUnAPoBzpSMO1T2ImvPQYN_phg"
};
