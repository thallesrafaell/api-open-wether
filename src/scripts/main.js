
//evento de carregamento
document.addEventListener("DOMContentLoaded", function () {
    const botaoBuscar = document.getElementById("btn-buscar");
  //evento de click
 botaoBuscar.addEventListener('click', function(e){
    const hide = document.getElementById('resultado')

    e.preventDefault()
    chamadaApi()
    
    
  })
});


//funcao fech
function chamadaApi() {
    const apiKey = "bc6e0025a1b550b6e2fa7fd5193edd7d";
    const cidade = document.getElementById("cidade").value;
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    fetch(endpoint)
    .then(function (resposta) {
        return resposta.json()
    })
    .then(function(json){
        //seletores da api 
        const apiCidade = json.name
        const apiflag = json.sys.country
        const apiTemp = Math.floor(json.main.temp)
        const apiTempo = json.weather[0].description
        const apiTempoIcon = json.weather[0].icon
        const apiHumidade = json.main.humidity
        const apiVelocidade = Math.floor(json.wind.speed)

        //seletores do html
        const respostaCidade = document.getElementById('reposta-cidade')
        const flag = document.getElementById('flag')
        const graus = document.getElementById('graus')
        const tempo = document.getElementById('tempo')
        const tempoIcon = document.getElementById('tempo-icon')
        const humidade = document.getElementById('humidade')
        const velocidade = document.getElementById('velocidade')
        


        //manipulação do DOM
        respostaCidade.textContent =  apiCidade 
        flag.setAttribute('src', `https://flagsapi.com/${apiflag}/flat/64.png`)
        graus.innerHTML = `${apiTemp}°C`
        tempo.textContent = apiTempo
        tempoIcon.setAttribute('src', `https://openweathermap.org/img/wn/${apiTempoIcon}@2x.png`)
        humidade.textContent = `${apiHumidade}%`
        velocidade.textContent =`${apiVelocidade} Km/h`

        document.querySelector('#icon-buscar').classList.add('d-none')
        document.querySelector('#icon-load').classList.remove('d-none')
        
    }).finally(function (json) {
        setTimeout(function () {
        document.querySelector('#icon-buscar').classList.remove('d-none')
        document.querySelector('#icon-load').classList.add('d-none')
        document.getElementById('resultado').classList.remove('conteudo__resultado--hidde')

        }, 1500)
    })
}