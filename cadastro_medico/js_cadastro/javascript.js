const addMedicoForm = document.getElementById('form');


addMedicoForm.addEventListener('submit', submitMedico);


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

function addMedico(medicoData){
    return fetch("http://localhost:8080/medicos", {
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

