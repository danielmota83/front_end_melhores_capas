import { Api } from 'helpers/Api';

const parseResponse = (response) => response.json();

const transformCapa = (capa) => {
  
  return {
    ...capa,
   id: capa._id,
   artista: capa.artista,
   album: capa.album,
   ano: capa.ano,
   fotoUrl: capa.fotoUrl,
   descricao: capa.descricao
     };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((capas) => capas.map(transformCapa));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformCapa);

 export const CapaService = {
  getLista: () =>
    fetch(Api.CapaLista(), { method: 'GET' }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.capaById(id), { method: 'GET' }).then(parseTransformItem),
  create: (capa) =>
    fetch(Api.createCapa(), {
      method: 'POST',
      body: JSON.stringify(capa),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(parseTransformItem),
    updtateById: (id, capa) =>
    fetch(Api.updateCapaById(id), {
      method: "PUT",
      body: JSON.stringify(capa),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),
  deleteById:(id) =>
    fetch(Api.deleteCapaById(id), { method: 'DELETE' }).then(parseResponse),
};


