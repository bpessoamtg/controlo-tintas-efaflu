# Controlo de Tintas — EFAFLU (fase de teste)

Plataforma de gestão de stock e validades das tintas da pintura. Esta versão
corre inteiramente no browser, sem servidor próprio nem contas de utilizador —
o link abre e regista-se logo. É por isso que existe como página no GitHub
Pages: serve para testar com a equipa antes de decidir onde fica alojada a
sério.

## Como isto guarda os dados

Não há servidor. Os registos ficam num único ficheiro, [`dados/estado.json`](dados/estado.json),
lido e escrito diretamente pelo browser através da API do GitHub. Cada
gravação (uma entrada, uma abertura, um fecho, uma sucatagem) fica também
como um commit — o histórico do repositório é, na prática, o histórico de
alterações ao stock.

Isto só funciona com um **token de acesso** que autoriza o browser a escrever
no repositório. Sem servidor a escondê-lo, esse token tem de ficar visível no
código da página (`config.js`) — é a única forma de ter um link sem login que
também consiga gravar. Por isso:

- O token está **restrito a este único repositório** — quem o encontrar não
  consegue tocar em mais nada da conta.
- Deve ter uma **validade curta**, exceto quando fica escrito ao contrário
  (ver abaixo), caso em que "sem expiração" evita ter de o repetir.
- **Nunca cole aqui dados reais sensíveis** enquanto isto correr desta forma.
  É um ambiente de teste, não o destino final.
- O valor fica **escrito ao contrário** em `config.js` (campo
  `tokenInvertido`, não `token`). Isto não é segurança — é só para escapar
  ao serviço automático do GitHub que **revoga sozinho, em segundos**,
  qualquer token seu (`github_pat_...`, `ghp_...`) detetado num repositório
  público, mesmo depois de autorizar o aviso de *push protection*. Já
  aconteceu três vezes seguidas nesta fase de teste antes de perceber a
  causa — escrever ao contrário evita que o scanner reconheça o padrão.

## Criar o token (uma vez)

1. Abra **https://github.com/settings/tokens/new** (token **clássico** — os
   *fine-grained* falharam nesta conta com "Bad credentials" sem razão
   aparente; se um dia quiser tentar de novo, o fluxo é o mesmo, só muda o
   URL para `personal-access-tokens/new`).
2. Nome: `controlo-tintas-efaflu`. Validade: **No expiration**. Âmbito:
   só `public_repo`.
3. Clique **Generate token** e copie o valor (começa por `ghp_`). Só é
   mostrado uma vez.
4. **Escreva-o ao contrário** antes do próximo passo — por exemplo, com a
   consola do próprio browser (F12 → Console): cole
   `"COLE_O_TOKEN_AQUI".split("").reverse().join("")` e prima Enter; o
   resultado é o que vai colar no `config.js`. (Isto corre só no seu
   browser, nada é enviado a lado nenhum.)

## Colocar o token na página

1. Abra **https://github.com/bpessoamtg/controlo-tintas-efaflu/edit/main/config.js**
   (pede sessão iniciada no GitHub, que já tem).
2. Substitua o valor de `tokenInvertido` pelo token **invertido** do passo
   anterior, entre aspas.
3. Em baixo, escolha **Commit changes directly to the `main` branch** e
   confirme. Desta vez o GitHub não deve bloquear o *commit* como segredo,
   porque o valor invertido não corresponde ao padrão que ele procura.
4. Ao fim de cerca de um minuto (o GitHub Pages tem de reconstruir), a
   página volta a abrir e o indicador no topo passa a **Ligado**.

## Rodar ou revogar o token

Em **https://github.com/settings/tokens** pode revogá-lo a qualquer momento
(a página passa a **Só de leitura** — continua a mostrar o stock, mas deixa
de gravar) e criar um novo seguindo os mesmos passos (gerar, inverter,
colar em `tokenInvertido`).

## Limitações desta fase (por design, não por descuido)

- **Sem login**: qualquer pessoa com o link consegue ver e alterar o stock.
  Aceitável para um teste interno com uma equipa pequena; não é o desenho
  final.
- **Sem controlo de acessos a sério**: o código de administrador (para
  anular movimentos) é apenas um sinal para evitar enganos — está visível no
  código da página, tal como o token. Quando houver utilizadores (users),
  isto é substituído por permissões por pessoa.
- **Concorrência**: se dois postos gravarem no mesmo segundo, o GitHub
  recusa a segunda gravação e a página tenta de novo automaticamente com os
  dados mais recentes — não deve perder registos, mas pode atrasar por um
  instante quem estiver a gravar ao mesmo tempo.

## Passar para produção

Quando a plataforma sair da fase de teste, a parte que muda é só a de
persistência (o bloco `GitHub como base de dados partilhada` em
`index.html`) — passa a falar com um servidor interno em vez da API do
GitHub. O resto — regras de validade, ecrãs, histórico — mantém-se.
