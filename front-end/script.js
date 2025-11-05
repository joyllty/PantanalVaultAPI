//fetchs

const listaAlbuns = document.getElementById('albuns-lista');
const container = document.getElementById('albuns-container');
const apiURL = 'http://localhost:5287/albuns';



// GET
const getAlbuns = async () => {
    if (!container) return;  

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

        albuns.forEach((album) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // p poder clicar
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
        // só exibe se estivermos no index
        if (container) container.innerText = `${error.message}`;
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

        if (response.status === 404) {
            throw new Error("Álbum não encontrado!");
        }

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

// get do album solo
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

// cata o parametro
function getParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// forms p add album
function configurarFormularioNovoAlbum() {
    const form = document.getElementById('formNovoAlbum');
    const msg = document.getElementById('mensagem');

    if (!form) return; // so faz na pag certa

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
            
            window.location.assign("index.html");
            
        } else {
            msg.textContent = "Erro ao criar o álbum.";
            msg.style.color = "#c62828";
        }
    });
}

// config editar album
function configurarPaginaEditar() {
    const btnBuscar = document.getElementById('btnBuscar');
    const formEditar = document.getElementById('formEditar');
    const msgBusca = document.getElementById('statusBusca');
    const msgEditar = document.getElementById('mensagemEditar');

    if (!btnBuscar) return;

    btnBuscar.addEventListener('click', async () => {
        const id = document.getElementById('idBusca').value.trim();
        if (!id) {
            msgBusca.textContent = 'Informe um ID!';
            msgBusca.style.color = 'red';
            return;
        }

        msgBusca.textContent = "Buscando...";
        msgBusca.style.color = "#254935";
        
        try {
            const album = await getAlbumById(id);
            
            if (album) {
                document.getElementById('nome').value = album.nome || "";
                document.getElementById('artistas').value = album.artistas || "";
                document.getElementById('generos').value = album.generos || "";
                document.getElementById('colaboradores').value = album.colaboradores || "";
                document.getElementById('dataLancamento').value = album.dataLancamento ? album.dataLancamento.substring(0,10) : "";
                document.getElementById('numeroFaixas').value = album.numeroFaixas || "";
                document.getElementById('duracao').value = album.duracao || "";
                document.getElementById('gravadora').value = album.gravadora || "";
                document.getElementById('formato').value = album.formato || "";

                formEditar.style.display = "block";
                msgBusca.textContent = "Preencha os campos a alterar!";
                msgBusca.style.color = "#254935";

            } else {
                throw new Error("Álbum não encontrado");
            }

        } catch (err) {
            msgBusca.textContent = err.message;
            msgBusca.style.color = "red";
            
        }
    });

    // --- corrigido aqui ---
    document.getElementById('btnSalvar').addEventListener('click', async (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();

        const id = document.getElementById('idBusca').value.trim();
        if (!id) return;

        const dados = {
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

        const todosPreenchidos = Object.values(dados).every(v => v !== "" && v !== 0);

        let resultado;
        
        if (todosPreenchidos) {
            resultado = await putAlbum(id, dados);
        } else {
            const alteracoes = {};
            for (const key in dados) {
                if (dados[key] !== "" && dados[key] !== 0) alteracoes[key] = dados[key];
            }
            
            resultado = await patchAlbum(id, alteracoes);
        }

        if (resultado) {
            msgEditar.textContent = "Álbum atualizado com sucesso! Redirecionando...";
            msgEditar.style.color = "#254935";

            window.location.assign("index.html");

        } else {
            msgEditar.textContent = "Erro ao atualizar o álbum.";
            msgEditar.style.color = "red";
        }
    });
}

// único listener necessário
document.addEventListener('DOMContentLoaded', function() {
    configurarFormularioNovoAlbum();
    configurarPaginaEditar();
});
