const nickname = prompt("Digite seu nickname: ")
const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", { name: nickname })
    .then()
    .catch(
        () => {
            alert('Esse nome já existe, tente outro :)');
            document.location.reload(true);
        }
    );

promiseStatus(true);

function promiseStatus(initiate) {
    if (initiate !== true) {
        axios.post("https://mock-api.driven.com.br/api/v4/uol/status", { name: nickname })
            .then()
            .catch(
                () => {
                    alert('Sua sessão expirou! Entre novamente ;)');
                    document.location.reload(true);
                }
            );
    };
    setTimeout(promiseStatus, 5000);
};

loadMessage(true);

function loadMessage(initiate) {
    if (initiate !== true) {
        axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
            .then(
                response => {
                    console.log("aqui")
                    showMessages(response.data)
                }
            )
    };
    setTimeout(loadMessage, 3000)
};

function showMessages(messages) {
    let container = document.querySelector(".container")
    container.innerHTML = messages.map((obj) => {
        if (obj.type === "status") {
            return (`<div class="msg status"><span>${obj.time}</span> <strong>${obj.from}</strong> ${obj.text}</div>`)
        } else if (obj.type === "message") {
            return (`<div class="msg message"><span>${obj.time}</span> <strong>${obj.from}</strong> para <strong>${obj.to}</strong>: ${obj.text}
            </div>`)
        } else if (obj.type === "private_message") {
            return (`<div class="msg direct"><span>${obj.time}</span> <strong>${obj.from}</strong> reservadamente para <strong>${obj.to}</strong>: ${obj.text}</div>`)
        }
    });

}

function sendMsg() {
    const message = document.querySelector(".text-area").value
    const payload = {
        from: nickname,
        to: "Todos",
        text: message,
        type: "message"
    }
    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", payload)
        .then(
            (r) => console.log(r.data)
        )
    // TODO: fazer limpar a barra de escrever e aplicar o scroll
}


