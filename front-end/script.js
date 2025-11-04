// fetchs
const apiURL = 'http://localhost:5287/albuns'

// GET
// const getAlbuns

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
            }
        });
        
        if (!response.ok){
            throw new Error("Erro ao atualizar o álbum!");
        }

        const resultado = await response.json();
        console.log("Álbum atualizado: ", resultado);

    } catch (error){
        console.error(error);
    }
};

// DELETE
const deleteAlbum = async (id) => {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 404){
            throw new Error("Álbum não encontrado!");
        } 

        if (!response.ok){
            throw new Error("Erro ao excluir o álbum!");
        }

        // getAlbuns();
    } catch (error){
        console.error(error);
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
