const addMedicoForm = document.getElementById('form');


addMedicoForm.addEventListener('submit', submitMedico);

function validacao(medicoData){
    const regexCRM = /^CRM\/[A-Z]{2} \d{6}$/i;
    const regexTelefone = /^\(\d{2}\)\d{4,5}-\d{4}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexCRM.test(medicoData.crm)){
        alert('Formato de CRM inválido! Use: CRM/UF 123456');
        return false;
    }

    if(!regexTelefone.test(medicoData.telefones[0])){
        alert('Telefone inválido! Use: (XX)XXXXX-XXXX');
        return false;
    }

    if(!regexEmail.test(medicoData.email)){
        alert('Digite um Email válido!');
        return false;
    }

    return true; 
}

function submitMedico(event){
    event.preventDefault();

    const formData = new FormData(addMedicoForm);
    const medicoData = {
        nome: formData.get('name'),
        email: formData.get('email'),
        crm: formData.get('crm').trim().toUpperCase(),
        telefones: [
            formData.get('telefone')
        ]
    };

    if(validacao(medicoData)){
        addMedico(medicoData)
            .then(() => {
                alert('Médico cadastrado com sucesso!');
                addMedicoForm.reset();
            })
            .catch(error => {
                console.error('Detalhes do erro:', error);
                alert('Erro: ' + error.message);
            });
    }        
}

function addMedico(medicoData){
    return fetch("https://clinica-medica-8pva.onrender.com/medicos", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicoData),
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

