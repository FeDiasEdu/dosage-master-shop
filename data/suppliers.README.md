# Base de fornecedores e preços

A planilha `AURA_Final(1).xlsx` contém informações operacionais de fornecedores e preços de compra.

**Importante:** o repositório atual é público. Por isso, os dados reais de fornecedores, contatos e preços **não são armazenados no GitHub** para evitar exposição indevida.

A arquitetura do projeto deve tratar essa base como fonte privada, com acesso somente em ambiente protegido (por exemplo, banco privado/Supabase ou arquivo local fora do repositório público).

Estrutura esperada da fonte privada:

- `Codigo_Interno`
- `Pepítideo`
- `Dosagem`
- `Unidade`
- `Fornecedor`
- `Preco_Kit10`
- `MG Maior de venda`

Ela será usada apenas quando necessário para análises internas como disponibilidade, comparação de custos, ranking de compras e planejamento de catálogo. Esses dados não devem aparecer para usuários públicos do site.
