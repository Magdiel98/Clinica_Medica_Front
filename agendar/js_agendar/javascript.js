
//Receber Dados

class Medico{
    constructor({id, nome}){
        this.id = id;
        this.nome = nome; 
    }
}

class Paciente{
    constructor({id, nome}){
        this.id = id;
        this.nome = nome; 
    }
}


const listaPacientes = document.getElementById('paciente');
const listaMedicos = document.getElementById('medico');


document.addEventListener('DOMContentLoaded', listMedicos);
document.addEventListener('DOMContentLoaded', listPacientes);

function listMedicos(){
    fetchMedicos()
    .then(medicos => {
        renderMedicos(medicos);
    })
    .catch(error => {
        console.error('Houve um problema ao buscar os médicos: ', error);
    });
}

function listPacientes(){
    fetchPacientes()
    .then(pacientes => {
        renderPacientes(pacientes);
    })
    .catch(error => {
        console.error('Houve um problema ao buscar os médicos: ', error);
    });
}



function fetchMedicos(){
    return fetch('https://clinica-medica-l4xt.onrender.com/medicos')
    .then(response => response.json())
    .then(medicos => {
        // 'medicos' já é um array, vamos mapear o id real do objeto
        return medicos.map(m => new Medico({
            id: m.id, // Pega o ID que vem do banco (ex: 50, 51...)
            nome: m.nome
        }));
    });
}

function fetchPacientes(){
    return fetch('https://clinica-medica-l4xt.onrender.com/pacientes')
    .then(response => response.json())
    .then(pacientes => {
        return pacientes.map(p => new Paciente({
            id: p.id, // Pega o ID real do paciente
            nome: p.nome
        }));
    });
}

function renderMedicos(medicos){
    listaMedicos.innerHTML = '';

    medicos.forEach(medico => {
        const medicoOption = createMedicoOption(medico);
        listaMedicos.appendChild(medicoOption);
    });
}

function renderPacientes(pacientes){
    listaPacientes.innerHTML = '';

    pacientes.forEach(paciente => {
        const pacienteOption = createPacienteOption(paciente);
        listaPacientes.appendChild(pacienteOption);
    });
}

function createMedicoOption(medico){
    const medicoOption = document.createElement('option');
    medicoOption.textContent = medico.nome;

    medicoOption.value = medico.id; 

    return medicoOption; 
}

function createPacienteOption(paciente){
    const pacienteOption = document.createElement('option');
    pacienteOption.textContent = paciente.nome;

    pacienteOption.value = paciente.id; 

    return pacienteOption; 
}

//Enviar Dados 
const addAgendarForm = document.getElementById('form');


addAgendarForm.addEventListener('submit', submitAgenda);


function submitAgenda(event){
    event.preventDefault();

    const formData = new FormData(addAgendarForm);
    const agendaData = {
        data: formData.get('data'),
        hora: formData.get('hora'),
        pacienteId: Number(formData.get('paciente')),
        medicoId: Number(formData.get('medico')),
    };

    console.log("JSON que será enviado:", agendaData);

    addAgenda(agendaData)
        .then(() => {
            alert('Consulta agendada com sucesso!');
            addAgendarForm.reset();
        })
        .catch(error => {
            console.error('Detalhes do erro:', error);
            alert('Erro: ' + error.message);
        });

}

function addAgenda(agendaData){
    return fetch("https://clinica-medica-l4xt.onrender.com/consultas", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendaData),
    })
    .then(async response => {
        if(!response.ok){
            // Tenta pegar a mensagem de erro detalhada do servidor
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}: Falha na requisição`);
        }
        return response;
    });
}

