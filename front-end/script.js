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

        // console.log(albuns);
        /*
        albuns.forEach((album) => {
            const newLi = document.createElement('li');
            newLi.innerText = `Nome: ${album.nome}`;
            listaAlbuns.appendChild(newLi);
        })
        */

        albuns.forEach((album, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

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
        // listaAlbuns.innerText = `${error.message}`;
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

    
