
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const entrar = document.getElementById("entrar");

entrar.addEventListener("click", function() {
    const emailUsuario = email.value;
    const senhaDigitada = senha.value;

    if (emailUsuario === "" || senhaDigitada === "") {
        alert("Preencha todos os campos!");
    } else if (emailUsuario === "admin" && senhaDigitada === "1234") {
        alert("Login realizado com sucesso!");
    } else {
        alert("Usuário ou senha incorretos!");
    }
});
