$(document).ready(function() {
    $('#buscar').on('click', function() {
        const cidade = $('#cidade').val();
        const cep = $('#cep').val();

        // Consultar a cidade pelo CEP
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            type: 'GET',
            success: function(data) {
                $('#cidade').val(data.localidade);
                fetchWeather(data.localidade);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erro ao consultar CEP.');
            }
        });

        function fetchWeather(city) {
            $.ajax({
                url: `http://api.weatherstack.com/current?access_key=b5a036aa82247a78c97e9afe8f823bce&query=${city}`,
                type: 'GET',
                success: function(data) {
                    if (data && data.current) {
                        $('#resultado').html(`
                            <h2>Previsão para ${city}</h2>
                            <p>Temperatura: ${data.current.temperature}°C</p>
                            <p>Condição: ${data.current.weather_descriptions[0]}</p>
                        `);

                        $.ajax({
                            url: '/history',
                            type: 'POST',
                            data: JSON.stringify({
                                city: data.location.name,
                                temperature: data.current.temperature,
                                condition: data.current.weather_descriptions[0]
                            }),
                            contentType: 'application/json',
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
    });

    $('#consultar-historico').on('click', function() {
        $.get('/history', function(data) {
            if (Array.isArray(data)) {
                let historicoHtml = '<h2>Histórico de Consultas</h2>';
                data.forEach(entry => {
                    historicoHtml += `
                        <div class="historico-item">
                            <h3>${entry.city}</h3>
                            <p>Temperatura: ${entry.temperature}°C</p>
                            <p>Condição: ${entry.condition}</p>
                            <p>Data: ${new Date(entry.created_at).toLocaleString()}</p>
                        </div>
                    `;
                });
                $('#historico').html(historicoHtml);
            } else {
                alert('Histórico não encontrado ou formato inválido.');
            }
        }).fail(function() {
            alert('Não foi possível consultar o histórico.');
        });
    });

    $('#comparar').on('click', function() {
        const cidade1 = $('#cidade1').val();
        const cidade2 = $('#cidade2').val();

        function fetchWeatherComparison(city, callback) {
            $.ajax({
                url: `http://api.weatherstack.com/current?access_key=YOUR_ACCESS_KEY&query=${city}`,
                type: 'GET',
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
                    <div>
                        <h3>${cidade1}</h3>
                        <p>Temperatura: ${data1.current.temperature}°C</p>
                        <p>Condição: ${data1.current.weather_descriptions[0]}</p>
                    </div>
                    <div>
                        <h3>${cidade2}</h3>
                        <p>Temperatura: ${data2.current.temperature}°C</p>
                        <p>Condição: ${data2.current.weather_descriptions[0]}</p>
                    </div>
                `);
            });
        });
    });
});
