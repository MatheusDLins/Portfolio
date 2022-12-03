let lista = [];

let inputNome = document.querySelector('#inputNome');
let inputEmail = document.querySelector('#inputEmail');
let inputTelefone = document.querySelector('#inputTelefone');
let inputComentario = document.querySelector('#inputComentario');

let btnNovoEmail = document.querySelector('#btnNovoEmail');

let listaEmail = document.querySelector('#listaEmail');

recuperarLista();

btnNovoEmail.addEventListener('click', () => {
    
    
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
})

function recuperarLista(){

    let listaEmails = sessionStorage.getItem('listaDeEmails');
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
        sessionStorage.setItem('listaDeEmails', JSON.stringify(lista));
    }
}


function criarItemLista(tarefa){
    let li = criarTagLI(tarefa);
    listaEmail.appendChild(li);
    return li;
}

function criarTagLI(tarefa){

    let li = document.createElement("li");

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

    let btnExcluir = document.createElement("button");
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="bi bi-trash text-white"></i>';

    //add

    div1.appendChild(spanNome);
    div1.appendChild(spanEmail);
    div1.appendChild(spanTelefone);
    div1.appendChild(spanComentario);

    div2.appendChild(btnExcluir);

    li.appendChild(div1);
    li.appendChild(div2);

    return li;
}