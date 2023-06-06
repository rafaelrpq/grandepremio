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
    let url = 'https://api.api-ninjas.com/v1/webscraper?url='+host

    try {
        let req = await fetch (url,
            {
                headers: {
                    'X-Api-Key': '4GKo0wVXx2akBPaGTwyycQ==CsMYftLxfH2HIOKv'
                },
            }
        )
        dados = await req.json ();
    } catch (e) {
        main.innerHTML = e
    }
}

scrap (host)
let parser = new DOMParser ()
let html;
let atual;
let titulos;
let tabelas;
let header = document.querySelector ('header span')
let main = document.querySelector ('main')

setTimeout (() => {
    try {
        html  = parser.parseFromString (dados.data, 'text/html')
        atual = html.querySelectorAll ('a.programacao-tv')[0].getAttribute ('href')
    } catch (e) {
        header.innerHTML = 'Falha ao buscar dados!'
        main.innerHTML = e+'<br>'
        main.innerHTML += '<p>Atualize a página ou tente novamente em alguns instantes<>'
        return ;
    }

    scrap (atual)

    setTimeout ( () => {
        try {
            html  = parser.parseFromString (dados.data, 'text/html')
            titulos = html.querySelectorAll ('h2 strong, h3 strong')
            tabelas = html.querySelectorAll ('table')
            main.innerHTML = ''

            tabelas.forEach ((tabela, i) => {
                main.innerHTML+= `<span>${titulos[i].innerText}</span>`
                main.append (tabela)
            })
            header.innerHTML = 'Grande Prêmio - Programação do Fim de Semana'

        } catch (e) {
            header.innerHTML = 'Falha ao buscar dados!'
            main.innerHTML = e
            return;
        }
    },5000)
}, 5000)


if ('serviceWorker' in navigator) {
    window.addEventListener ('load', () => {
        navigator.serviceWorker.register ('sw.js')
        .then (reg => {
            console.log ('registrado!')
            console.log (reg)
        })
        .catch (err => {
            console.log ('falha ao registrar')
            console.log (err)
        })
    })
}
