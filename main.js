import fetch from 'node-fetch'; // Importa a biblioteca node-fetch para fazer requisições HTTP

const ids = [/* sua lista deIDs */]; // Coloque aqui sua lista de IDs que você quer atualizar
const apiUrl = "https://marketingsolucoes.bitrix24.com.br/rest/35002/{CODIGO_BITRIX}"; // URL da API do Bitrix
const batchSize = 200; // Define o tamanho do lote, ou seja, quantas requisições serão feitas de uma vez
const delayBetweenBatches = 15000; // Atraso em milissegundos entre cada lote de requisições

// Função para criar um atraso
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function updateDeals() {
    for (let i = 0; i < ids.length; i += batchSize) { // Loop pelos IDs em incrementos do tamanho do lote
        const batchIds = ids.slice(i, i + batchSize); 
        for (const id of batchIds) { 
            const body = {
                ID: id, // O ID do negócio que será atualizado
                Fields: {
                    UF_CRM_/*campo que você precisa*/: "seu_valor" // O campo que você quer atualizar; substitua "seu_valor" pelo valor desejado
                }
            };

            try {
                // Faz a requisição à API usando o fetch, você precisa baixar 
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(body) 
                });

                const data = await response.json();
                if (!response.ok) { 
                    throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
                }

                console.log(`Deal ID ${id} updated successfully`, data); 
            } catch (error) {
                console.error(`Error updating deal ID ${id}:`, error); 
            }
        }

        
        await delay(delayBetweenBatches);
    }
}

updateDeals(); // Chama a função para iniciar o processo
