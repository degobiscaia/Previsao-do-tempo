document.querySelector('#search').addEventListener('submit',async(event)=>{
    event.preventDefault();

    const nomeCidade=document.querySelector('#nome_cidade').value;

    if(!nomeCidade){
        document.querySelector("#tempo").classList.add('show');
        return alert('Você precisa digitar uma cidade')
        
    }

    const apikey = `78b4a6a39053eccb33223822600dd48e`;
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apikey}&units=metric&lang=pt_br`;

    const results = await fetch(apiurl);
    const json = await results.json();

   

   if(json.cod === 200){
    document.querySelector("#tempo").classList.remove('show');
    showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        sea_level:json.main.sea_level,
        temp_max:json.main.temp_max,
        temp_min:json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        wind: json.wind.speed,
        humidity: json.main.humidity,
        
    });

   }else{
     document.querySelector("#tempo").classList.add('show');
     return alert(`[ERRO] Não foi possível localizar!`)
   }

    
});

function showInfo(json){

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_img').setAttribute(`src`,`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#tempo_valor').innerHTML = `${json.temp.toFixed(0).toString().replace('.',',')}<sup>ºC</sup>`;
    document.querySelector('#tempo_descricao').innerHTML = `${json.description}`;
    document.querySelector('#pres_mar'). innerHTML = `${json.sea_level} hpa`;
    document.querySelector('#temp_max'). innerHTML = `${json.temp_max.toFixed(1).toString().replace('.',',')}<sup>ºC</sup>`;
    document.querySelector('#temp_min'). innerHTML = `${json.temp_min.toFixed(1).toString().replace('.',',')}<sup>ºC</sup>`;
    document.querySelector('#temp_vel'). innerHTML = `${json.wind.toFixed(1).toString().replace('.',',')} Km/h`;   
    document.querySelector('#temp_hum'). innerHTML = `${json.humidity}%`;   
    
}