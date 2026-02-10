class Medico{
    constructor({id, nome, email, crm, telefones}){
        this.id = id;
        this.nome = nome; 
        this.email = email;
        this.crm = crm;
        this.telefones = telefones;
    }
}

const medicoList = document.getElementById('conjunto');

document.addEventListener('DOMContentLoaded', listMedicos);

function listMedicos(){
    fetchMedicos()
    .then(medicos => {
        renderMedicos(medicos);
    })
    .catch(error => {
        console.error('Houve um problema ao buscar os contatos: ', error);
    });
}

function fetchMedicos(){
    return fetch('https://clinica-medica-l4xt.onrender.com/medicos')
    .then(response => {
        if(!response.ok){
            throw new Error('Resposta de rede não foi ok');
        }
        return response.json();
    })
    .then(medicos => {
        const medicosList = [];
        for(let key in medicos){
            const medico = new Medico({
                id: key, 
                nome: medicos[key].nome,
                telefones: medicos[key].telefones,
                email: medicos[key].email,
                crm: medicos[key].crm
            });

            medicosList.push(medico);
        }

        return medicosList;
    });
}

function renderMedicos(medicos){
    medicoList.innerHTML = '';

    medicos.forEach(medico => {
        const medicoCard = createMedicoCard(medico);
        medicoList.appendChild(medicoCard);
    });
}


function createMedicoCard(medico){
    const medicoCard = document.createElement('div');
    medicoCard.classList.add('card');

    const nome = document.createElement('p');
    nome.textContent = medico.nome;

    const telefone = document.createElement('p');
    telefone.textContent = `Telefone: ${medico.telefones}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${medico.email}`;

    const crm = document.createElement('p');
    crm.textContent = `CRM: ${medico.crm}`;

    medicoCard.appendChild(nome);
    medicoCard.appendChild(email);
    medicoCard.appendChild(crm);
    medicoCard.appendChild(telefone);

    return medicoCard;

}