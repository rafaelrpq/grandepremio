// fetch ('https://grandepremio.com.br/programacao-da-tv', {
//     headers : {mode : 'no-cors'}
// })
// .then (req => req.text ())
// .then (text => {
//     console.log (text)
// })
// .catch (e => {
//     console.error ('error => ',e)
// })

let dados = {}
let host = 'https://grandepremio.com.br/programacao-da-tv'
async function scrap (host) {
    let url = 'https://api.api-ninjas.com/v1/webscraper?user_agent=html&url='+host
    let req = await fetch (url,
        {
            headers: {
                'X-Api-Key': '4GKo0wVXx2akBPaGTwyycQ==CsMYftLxfH2HIOKv'
            },
        }
    )
    dados = await req.json ();
}

scrap (host)
let parser = new DOMParser ()
let html;
let atual;
let titulos;
let tabelas;
let header = document.querySelector ('header')
let main = document.querySelector ('main')

setTimeout (() => {
    html  = parser.parseFromString (dados.data, 'text/html')
    atual = html.querySelectorAll ('a.programacao-tv')[0].getAttribute ('href')
    scrap (atual)
    setTimeout ( () => {
        html  = parser.parseFromString (dados.data, 'text/html')
        titulos = html.querySelectorAll ('h2 strong, h3 strong')
        tabelas = html.querySelectorAll ('table')
        main.innerHTML = ''

        tabelas.forEach ((tabela, i) => {
            main.innerHTML+= `<span>${titulos[i].innerText}</span>`
            main.append (tabela)
        })

        header.innerHTML = 'Grande Prêmio - Programação do Fim de Semana'
    },5000)
}, 5000)

