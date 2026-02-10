const addPacienteForm = document.getElementById('form');


addPacienteForm.addEventListener('submit', submitPaciente);

function validacao(pacienteData){
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexTelefone = /^\(\d{2}\)\d{4,5}-\d{4}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexCPF.test(pacienteData.cpf)){
        alert('Formato de CPF inválido! Use: XXX.XXX.XXX-XX');
        return false;
    }

    if(!regexTelefone.test(pacienteData.telefones[0])){
        alert('Telefone inválido! Use: (XX)XXXXX-XXXX');
        return false;
    }

    if(!regexEmail.test(pacienteData.email)){
        alert('Digite um Email válido!');
        return false;
    }

    return true; 
}

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

    if(validacao(pacienteData)){
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

}

function addPaciente(pacienteData){
    return fetch("https://clinica-medica-8pva.onrender.com/pacientes", {
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

