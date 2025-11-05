//fetchs

const listaAlbuns = document.getElementById('albuns-lista');
const container = document.getElementById('albuns-container');
const apiURL = 'http://localhost:5287/albuns';



// GET
const getAlbuns = async () => {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        if (!response.ok){
            throw new Error("Erro ao buscar os albuns!");
        }

        const albuns = await response.json();

        container.innerHTML = '';

        albuns.forEach((album, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Torna o card clicável
            card.onclick = () => {
                window.location.href = `albumsolo.html?id=${album.id}`;
            };

            const baseName = album.nome
                ? album.nome
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                : "sem-nome";

            const jpgPath = `./img/${baseName}.jpg`;

            const img = new Image();
            img.src = jpgPath;

            card.appendChild(img);

            const info = document.createElement("div");
            info.classList.add("card-info");
            info.innerHTML = `
                <h3>${album.nome}</h3>
                <p><strong>ID:</strong> ${album.id}</p>
                <p><strong>Artista:</strong> ${album.artistas || '---'}</p>
                <p><strong>Lançamento:</strong> ${album.dataLancamento || '---'}</p>
            `;
            card.appendChild(info);

            container.appendChild(card);
        });

    } catch (error) {
        container.innerText = `${error.message}`;
    }
};

getAlbuns();

// POST
const postAlbum = async (novoAlbum) => {
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAlbum)
        });
        
        if (!response.ok) {
            throw new Error("Erro ao criar álbum!");
        }

        const albumCriado = await response.json();
        console.log("Álbum criado: ", albumCriado);
        return albumCriado;

    } catch (error) {
        console.error(error);
        return null;
    }
};

// PUT
const putAlbum = async (id, albumAtualizado) => {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumAtualizado)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar o álbum!");
        }

        const resultado = await response.json();
        console.log("Álbum atualizado: ", resultado);
        return resultado;

    } catch (error) {
        console.error(error);
        return null;
    }
};

// PATCH
const patchAlbum = async (id, albumAlteracoes) => {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumAlteracoes)
        });
        
        if (response.status === 404) {
            throw new Error("Álbum não encontrado!");
        }

        if (!response.ok) {
            throw new Error("Erro ao atualizar o álbum!");
        }

        const resultado = await response.json();
        console.log("Álbum atualizado (PATCH): ", resultado);
        return resultado;

    } catch (error) {
        console.error(error);
        return null;
    }
};

// DELETE
const deleteAlbum = async (id) => {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 404) {
            throw new Error("Álbum não encontrado!");
        }

        if (!response.ok) {
            throw new Error("Erro ao excluir o álbum!");
        }

        // getAlbuns();
    } catch (error) {
        console.error(error);
    }
};

function tornarCardsClicaveis() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            // Encontra todos os elementos de texto do card
            const textElements = this.querySelectorAll('p');
            let albumId = null;
            
            // Procura pelo elemento que contém o ID
            textElements.forEach(element => {
                if (element.innerHTML.includes('ID:')) {
                    const match = element.innerHTML.match(/ID:\s*(\d+)/);
                    if (match) {
                        albumId = match[1];
                    }
                }
            });
            
            console.log('ID encontrado:', albumId);
            
            if (albumId) {
                window.location.href = `albumsolo.html?id=${albumId}`;
            } else {
                console.error('Não foi possível encontrar o ID do álbum');
            }
        });
    });
}
    
// GET por ID - para a página de detalhes
const getAlbumById = async (id) => {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar álbum!");
        }

        const album = await response.json();
        return album;

    } catch (error) {
        console.error(error);
        return null;
    }
};

// Função para obter parâmetro da URL (usada na página de detalhes)
function getParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Função para lidar com o formulário de novo álbum
function configurarFormularioNovoAlbum() {
    const form = document.getElementById('formNovoAlbum');
    const msg = document.getElementById('mensagem');

    if (!form) return; // Só executa se estiver na página correta

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const novoAlbum = {
            nome: document.getElementById('nome').value,
            artistas: document.getElementById('artistas').value,
            generos: document.getElementById('generos').value,
            colaboradores: document.getElementById('colaboradores').value,
            dataLancamento: document.getElementById('dataLancamento').value,
            numeroFaixas: Number(document.getElementById('numeroFaixas').value) || 0,
            duracao: document.getElementById('duracao').value,
            gravadora: document.getElementById('gravadora').value,
            formato: document.getElementById('formato').value
        };

        const albumCriado = await postAlbum(novoAlbum);
        if (albumCriado) {
            msg.textContent = "Álbum criado com sucesso!";
            msg.style.color = "#254935";
            form.reset();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } else {
            msg.textContent = "Erro ao criar o álbum.";
            msg.style.color = "#c62828";
        }
    });
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    configurarFormularioNovoAlbum();
});
