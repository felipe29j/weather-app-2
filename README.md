# Weather App

## Descrição

Este é um aplicativo web de previsão do tempo que permite buscar o clima atual de uma cidade, comparar o clima de duas cidades e visualizar o histórico das previsões salvas.

## Estrutura do Projeto

A estrutura do projeto foi organizada para garantir clareza, modularidade e facilidade de manutenção. Abaixo estão os detalhes sobre a organização dos arquivos e os padrões de código aplicados.

### Arquivos e Diretórios

1. **`/public/css/styles.css`**
   - **Descrição:** Contém todos os estilos CSS utilizados na aplicação. 
   - **Padrões Aplicados:** Utilização de Flexbox para layout responsivo e centralização dos botões e inputs. Estilos globais são aplicados para garantir uma aparência consistente em toda a aplicação.

2. **`/public/js/scripts.js`**
   - **Descrição:** Contém o código JavaScript que gerencia a lógica de interação da aplicação, incluindo a busca de previsões, visualização do histórico e comparação de cidades.
   - **Padrões Aplicados:**
     - **Modularidade:** Funções são definidas para separar a lógica de diferentes interações (`expandContainer`, `collapseContainer`, `fetchWeather`, `fetchWeatherComparison`).
     - **Manipulação de DOM:** Manipulação do DOM é feita com jQuery para atualizar a interface do usuário com base nas interações do usuário.
     - **Centralização e Ocultação:** Utilização de classes CSS como `.hidden` para controlar a visibilidade dos elementos.

3. **`/resources/views/welcome.blade.php`**
   - **Descrição:** Arquivo Blade template que contém a estrutura HTML da aplicação.
   - **Padrões Aplicados:**
     - **Estrutura Semântica:** Utilização de elementos HTML5 semânticos (`<header>`, `<section>`, `<div>`) para estruturar o conteúdo de forma clara.
     - **Classes CSS:** Classes CSS são aplicadas para garantir que a apresentação visual seja consistente e mantenha o layout organizado.

4. **`/app/Http/Controllers/HistoryController.php`**
   - **Descrição:** Controlador responsável pela lógica de manipulação dos dados de histórico.
   - **Padrões Aplicados:**
     - **Validação de Dados:** Utilização do método `validate` para garantir que os dados recebidos nas requisições sejam válidos e seguros.
     - **Tratamento de Exceções:** Captura e registro de exceções para lidar com erros e falhas na aplicação.

5. **`/app/Models/History.php`**
   - **Descrição:** Modelo Eloquent que representa a tabela `histories` no banco de dados.
   - **Padrões Aplicados:**
     - **Atributos Preenchíveis:** Utilização da propriedade `$fillable` para definir os campos que podem ser preenchidos em massa, garantindo segurança na manipulação dos dados.

6. **`/database/migrations/2024_08_31_000000_create_histories_table.php`**
   - **Descrição:** Migração para criar a tabela `histories` no banco de dados.
   - **Padrões Aplicados:**
     - **Estrutura de Tabela:** Definição clara das colunas e tipos de dados para armazenar informações de previsão do tempo.

## Padrões de Código

1. **Organização e Modularidade**
   - **HTML:** Estrutura clara com seções distintas para busca, histórico e comparação.
   - **CSS:** Estilos são organizados para separar a apresentação do layout e da funcionalidade. Flexbox é utilizado para centralizar e organizar os elementos.
   - **JavaScript:** Lógica é modularizada em funções para melhorar a clareza e a manutenção do código.

2. **Boas Práticas de Segurança**
   - **Validação:** Validação de dados no controlador para proteger contra entradas inválidas ou maliciosas.
   - **Manipulação de Exceções:** Registro de erros e tratamento adequado das exceções para melhorar a robustez da aplicação.

3. **Responsividade**
   - **CSS:** Utilização de unidades de medida relativas e Flexbox para garantir que a interface seja responsiva e se adapte a diferentes tamanhos de tela.

## Configuração do Ambiente

### 1. Instalação

1. **Clonar o Repositório**

    git clone https://github.com/felipe29j/weather-app-2.git


2. **Instalar Dependências**

    cd weather-app-2
    composer install


## Instruções para Desenvolvimento

1. **Instalação**
   - Certifique-se de ter o PHP e o Composer instalados.
   - Execute `composer install` para instalar as dependências do projeto.

2. **Criar um Banco de Dados**

   Certifique-se de ter um banco de dados criado para a aplicação.
   Utilizei o nome weather_app.

3. **Atualizar o Arquivo `.env`**

   No arquivo `.env` localizado na raiz do seu projeto, configure as seguintes variáveis para conectar ao seu banco de dados:

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nome_do_seu_banco
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha

4. **Configuração API WEATHER**

No scripts.js trocar a chave da api sua_chave_api

    url: `http://api.weatherstack.com/current?access_key=sua_chave_api&query=${city}`,

function fetchWeather e function fetchWeatherComparison

5. **Execução**
   - Execute as migrações com `php artisan migrate`.
   - Inicie o servidor de desenvolvimento com `php artisan serve`.

6. **Acesso**
   - Acesse a aplicação em `http://localhost:8000`.


