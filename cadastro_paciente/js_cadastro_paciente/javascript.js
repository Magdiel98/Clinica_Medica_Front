const addPacienteForm = document.getElementById('form');


addPacienteForm.addEventListener('submit', submitPaciente);


function submitPaciente(event){
    event.preventDefault();

    const formData = new FormData(addPacienteForm);
    const pacienteData = {
        nome: formData.get('name'),
        email: formData.get('email'),
        cpf: formData.get('cpf').trim().toUpperCase(),
        telefones: [
            formData.get('telefone')
        ]
    };

    addPaciente(pacienteData)
        .then(() => {
            alert('Paciente cadastrado com sucesso!');
            addPacienteForm.reset();
        })
        .catch(error => {
            console.error('Detalhes do erro:', error);
            alert('Erro: ' + error.message);
        });

}

function addPaciente(pacienteData){
    return fetch("http://localhost:8080/pacientes", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pacienteData),
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

