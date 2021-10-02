<h1>API_ESTOQUE</h1>

<h2>Requisitos</h2>
<p><i>- Node.js</i></p>
<p><i>- MYSQL</i></p>


<h2> Instalação local</h2>
<p>Dentro do diretorio, Deve ser feito a instalação das dependencias com o seguinte comando:</p>
<p><i>- npm install;</i></p>

<br>


<h2>Iniciando servidor</h2>

<p>Após isso, para iniciar, deve ser executado o arquivo app.js, que irá rodar o servidor e fazer a conexão com a API;</p>
<p><i>- nodemon app.js;</i></p>


<h2> Orientações </h2>

<p>- Por padrão, no arquivo "app.js" a aplicação estará configurada para escutar a porta 3001, podendo ser customizada caso a porta já esteja sendo utilizada;</p>

<p>- Cors liberado para API ser consumida por qualquer aplicação;</p>

<p>- No arquivo conect, deve ser costumizado para dados do local, criar o banco com nome "estoque" para ser conectado;</p>

<p>- Para criação da tabela, pode ser feito manualmente, para ser criado automaticamente, deve colocar ({force: true}) em todos os syncs das tabelas, após criar, tirar o force;</p> <br>

<h3>Rotas e method's</h3>

- Importar no Insomnia, o arquivo de collections "studio_moreiras" que se encontra na raiz do projeto.
