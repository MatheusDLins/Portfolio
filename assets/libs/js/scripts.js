const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}
  
const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}


let lista = [];

let inputNome = document.querySelector('#inputNome');
let inputEmail = document.querySelector('#inputEmail');
let inputTelefone = document.querySelector('#inputTelefone');
let inputComentario = document.querySelector('#inputComentario');

let btnNovoEmail = document.querySelector('#btnNovoEmail');

let listaEmail = document.querySelector('#listaEmail');

recuperarLista();

btnDeletarEmail.addEventListener('click', () => {
    let confirmacao = window.confirm('Tem certeza que deseja excluir TODOS os e-mails? ');
    if(confirmacao) {
        const valor = localStorage.getItem('listaDeEmails');

        let emails = JSON.parse(valor);
        for (const email of emails){
            deletarEmail(email['id']);
        }
        localStorage.clear();
    }
})

btnNovoEmail.addEventListener('click', () => {
    
    let confirmacao = window.confirm('Os dados enviados nesse formulario ainda não estão indo para o email do proprietario do site, apenas para a seção a baixo "E-mails recebidos" e armazenados na Local Storage, deseja continuar?');
    if(confirmacao) {

        inserirItem({
            nome: inputNome.value,
            email: inputEmail.value,
            telefone: inputTelefone.value,
            comentario: inputComentario.value,
            id: gerarID(),
            
        });
            
        //Limpar campos
        inputNome.value = '';
        inputEmail.value = '';
        inputTelefone.value = '';
        inputComentario.value = '';
    }
})


function recuperarLista(){

    let listaEmails = localStorage.getItem('listaDeEmails');
    if(listaEmails){
        let emails = JSON.parse(listaEmails);
        for (const email of emails){
            inserirItem(email, false);
        }

    }
}

function gerarID(){
    return Math.floor(Math.random()*7000)
}

function inserirItem(tarefa, novoItem = true){
    lista.push(tarefa);
    listaEmail.appendChild(criarItemLista(tarefa));
    if(novoItem){
        localStorage.setItem('listaDeEmails', JSON.stringify(lista));
    }
}


function criarItemLista(tarefa){
    let li = criarTagLI(tarefa);
    listaEmail.appendChild(li);
    return li;
}

function criarTagLI(tarefa){

    let li = document.createElement("li");
    li.id = tarefa.id;

    //corpo
    let div1 = document.createElement("div");
    div1.classList.add("d-flex");
    div1.classList.add("flex-column");
    div1.classList.add("bd-highlight");
    div1.classList.add("mb-3");

    let spanNome = document.createElement("span");
    spanNome.classList.add('nomeEnviado');
    spanNome.innerHTML = tarefa.nome;

    let spanEmail = document.createElement("span");
    spanEmail.classList.add('emailEnviado');
    spanEmail.innerHTML = tarefa.email;

    let spanTelefone = document.createElement("span");
    spanTelefone.classList.add('telefoneEnviado');
    spanTelefone.innerHTML = tarefa.telefone;

    let spanComentario = document.createElement("span");
    spanComentario.classList.add('comentarioEnviado');
    spanComentario.innerHTML = tarefa.comentario;

    //botao
    let div2 = document.createElement("div");


    //add

    div1.appendChild(spanNome);
    div1.appendChild(spanEmail);
    div1.appendChild(spanTelefone);
    div1.appendChild(spanComentario);



    li.appendChild(div1);
    li.appendChild(div2);

    return li;
}

function deletarEmail(id){
        let li = document.getElementById(''+ id + '');
        if(li) {
            listaEmail.removeChild(li);
        }
}