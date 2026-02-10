class Consulta{
    constructor({id, data, hora, status, paciente, medico}){
        this.id = id; 
        this.data = data;
        this.hora = hora; 
        this.status = status;
        this.paciente = paciente;
        this.medico = medico;
    }
}

const consultaList = document.getElementById('conjunto');

document.addEventListener('DOMContentLoaded', listConsultas);

function listConsultas(){
    fetchConsultas()
    .then(consultas => {
        renderConsultas(consultas);
    })
    .catch(error => {
        console.error('Houve um problema ao buscar os contatos: ', error);
    });
}

function fetchConsultas(){
    return fetch('https://clinica-medica-l4xt.onrender.com/consultas')
    .then(response => {
        if(!response.ok){
            throw new Error('Resposta de rede não foi ok');
        }
        return response.json();
    })
    .then(consultas => {
        const consultasList = [];
        for(let key in consultas){
            const consulta = new Consulta({
                id: key, 
                data: consultas[key].data,
                hora: consultas[key].hora,
                status: consultas[key].status,
                paciente: consultas[key].nomePaciente,
                medico: consultas[key].nomeMedico 
            });

            consultasList.push(consulta);
        }

        return consultasList;
    });
}

function renderConsultas(consultas){
    consultaList.innerHTML = '';

    consultas.forEach(consulta => {
        const consultaCard = createConsultaCard(consulta);
        consultaList.appendChild(consultaCard);
    });
}


function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function formatarHora(hora) {
    return hora.slice(0, 5);
}


function createConsultaCard(consulta){
    const consultaCard = document.createElement('div');
    consultaCard.classList.add('card');

    const data = document.createElement('p');
    data.textContent = `Data: ${formatarData(consulta.data)}`;

    const hora = document.createElement('p');
    hora.textContent = `Hora: ${formatarHora(consulta.hora)}`;

    const status = document.createElement('p');
    status.textContent = `Status: ${consulta.status}`;

    const paciente = document.createElement('p');
    paciente.textContent = `Paciente: ${consulta.paciente}`;

    const medico = document.createElement('p');
    medico.textContent = `Medico: ${consulta.medico}`;

    consultaCard.appendChild(data);
    consultaCard.appendChild(hora);
    consultaCard.appendChild(status);
    consultaCard.appendChild(paciente);
    consultaCard.appendChild(medico);

    return consultaCard;

}