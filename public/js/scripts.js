$(document).ready(function() {
    function expandContainer() {
        $('.container').addClass('expanded');
    }

    function collapseContainer() {
        $('.container').removeClass('expanded');
    }

    // Função para buscar a previsão do tempo para uma cidade
    function fetchWeather(city) {
        $.ajax({
            url: `http://api.weatherstack.com/current`,
            type: 'GET',
            data: {
                access_key: 'b5a036aa82247a78c97e9afe8f823bce',
                query: city
            },
            success: function(data) {
                if (data && data.current) {
                    const weatherIcon = data.current.weather_icons[0]; // Obtém o URL do ícone do clima
                    $('#resultado').html(`
                        <h2>Previsão para ${city}</h2>
                        <img src="${weatherIcon}" alt="Ícone do clima" class="weather-icon"/>
                        <p>Temperatura: ${data.current.temperature}°C</p>
                        <p>Condição: ${data.current.weather_descriptions[0]}</p>
                        <p>Umidade: ${data.current.humidity}%</p>
                        <p>Vento: ${data.current.wind_speed} km/h</p>
                        <p>Visibilidade: ${data.current.visibility} km</p>
                    `).removeClass('hidden');

                    // Requisição POST com CSRF Token
                    $.ajax({
                        url: '/history',
                        type: 'POST',
                        data: JSON.stringify({
                            city: data.location.name,
                            temperature: data.current.temperature,
                            condition: data.current.weather_descriptions[0],
                            humidity: data.current.humidity,
                            wind_speed: data.current.wind_speed,
                            visibility: data.current.visibility
                        }),
                        contentType: 'application/json',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function(response) {
                            if (response.success) {
                                console.log('Previsão salva no histórico');
                            } else {
                                console.error('Falha ao salvar previsão no histórico:', response);
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.error('Erro ao enviar dados para o servidor:', textStatus, errorThrown);
                        }
                    });
                } else {
                    alert('Dados de previsão do tempo não encontrados.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Não foi possível obter a previsão do tempo.');
            }
        });
    }

    // Função para buscar cidade usando o CEP
    function fetchCityFromCep(cep) {
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            type: 'GET',
            success: function(data) {
                if (data && data.localidade) {
                    $('#cidade').val(data.localidade);
                } else {
                    alert('Cidade não encontrada para o CEP informado.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erro ao consultar CEP.');
            }
        });
    }

    $('#buscar').on('click', function() {
        expandContainer();
        $('#historico').addClass('hidden');
        $('#comparacao').addClass('hidden');
      
        const cidade = $('#cidade').val();
        const cep = $('#cep').val();

        if (cidade) {
            fetchWeather(cidade);
        } else if (cep) {
            fetchCityFromCep(cep);
            // Verifica se o nome da cidade está preenchido após buscar pelo CEP
            setTimeout(function() {
                const cidadeAtualizada = $('#cidade').val();
                if (cidadeAtualizada) {
                    fetchWeather(cidadeAtualizada);
                } else {
                    alert('Não foi possível determinar a cidade a partir do CEP.');
                }
            }, 1000); // Atraso para garantir que a cidade seja preenchida após a consulta do CEP
        } else {
            alert('Por favor, informe um CEP ou uma cidade.');
        }
    });

    $('#consultar-historico').on('click', function() {
        expandContainer();
        $('#resultado').addClass('hidden');
        $('#comparacao').addClass('hidden');
        $('#cidade').val('');
        $('#cep').val('');

        $.get('/history', function(data) {
            if (Array.isArray(data)) {
                let historicoHtml = '<h2>Histórico de Consultas</h2>';
                data.forEach(entry => {
                    historicoHtml += `
                        <div class="historico-item">
                            <h3>${entry.city}</h3>
                            <p>Temperatura: ${entry.temperature}°C</p>
                            <p>Condição: ${entry.condition}</p>
                            <p>Umidade: ${entry.humidity}%</p>
                            <p>Vento: ${entry.wind_speed} km/h</p>
                            <p>Visibilidade: ${entry.visibility} km</p>
                            <p>Data: ${new Date(entry.created_at).toLocaleString()}</p>
                        </div>
                    `;
                });
                $('#historico').html(historicoHtml).removeClass('hidden');
            } else {
                alert('Histórico não encontrado ou formato inválido.');
            }
        }).fail(function() {
            alert('Não foi possível consultar o histórico.');
        });
    });

    $('#comparar').on('click', function() {
        expandContainer();
        $('#resultado').addClass('hidden');
        $('#historico').addClass('hidden');
        $('#cidade').val('');
        $('#cep').val('');

        const cidade1 = $('#cidade1').val();
        const cidade2 = $('#cidade2').val();

        function fetchWeatherComparison(city, callback) {
            $.ajax({
                url: `http://api.weatherstack.com/current`,
                type: 'GET',
                data: {
                    access_key: 'b5a036aa82247a78c97e9afe8f823bce',
                    query: city
                },
                success: function(data) {
                    callback(null, data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    callback('Não foi possível obter a previsão do tempo para ' + city);
                }
            });
        }

        fetchWeatherComparison(cidade1, function(err1, data1) {
            if (err1) {
                alert(err1);
                return;
            }

            fetchWeatherComparison(cidade2, function(err2, data2) {
                if (err2) {
                    alert(err2);
                    return;
                }

                $('#comparacao').html(`
                    <h2>Comparação de Previsões</h2>
                    <div class="comparacao-item">
                        <h3>${cidade1}</h3>
                        <img src="${data1.current.weather_icons[0]}" alt="Ícone do clima para ${cidade1}" class="weather-icon"/>
                        <p>Temperatura: ${data1.current.temperature}°C</p>
                        <p>Condição: ${data1.current.weather_descriptions[0]}</p>
                        <p>Umidade: ${data1.current.humidity}%</p>
                        <p>Vento: ${data1.current.wind_speed} km/h</p>
                        <p>Visibilidade: ${data1.current.visibility} km</p>
                    </div>
                    <div class="comparacao-item">
                        <h3>${cidade2}</h3>
                        <img src="${data2.current.weather_icons[0]}" alt="Ícone do clima para ${cidade2}" class="weather-icon"/>
                        <p>Temperatura: ${data2.current.temperature}°C</p>
                        <p>Condição: ${data2.current.weather_descriptions[0]}</p>
                        <p>Umidade: ${data2.current.humidity}%</p>
                        <p>Vento: ${data2.current.wind_speed} km/h</p>
                        <p>Visibilidade: ${data2.current.visibility} km</p>
                    </div>
                `).removeClass('hidden');
            });
        });
    });
});
