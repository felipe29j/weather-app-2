<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Weather App</title>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/scripts.js') }}" defer></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Weather App</h1>
        </header>

        <!-- Seção de Consulta -->
        <section class="search-section">
            <h2>Consulta de Previsão</h2>
            <input type="text" id="cep" placeholder="Digite o CEP" class="input-field">
            <input type="text" id="cidade" placeholder="Digite o nome da cidade" class="input-field">
            <button id="buscar" class="btn">Buscar</button>
            <button id="consultar-historico" class="btn">Consultar Histórico</button>
        </section>

        <!-- Resultado da Consulta -->
        <section id="resultado" class="resultado hidden"></section>

        <!-- Histórico -->
        <section id="historico" class="historico hidden"></section>

        <!-- Comparação -->
        <section class="compare-section">
            <h2>Comparar Previsões</h2>
            <input type="text" id="cidade1" placeholder="Digite a primeira cidade" class="input-field">
            <input type="text" id="cidade2" placeholder="Digite a segunda cidade" class="input-field">
            <button id="comparar" class="btn">Comparar</button>
            <div id="comparacao" class="comparacao hidden"></div>
        </section>
    </div>
</body>
</html>
