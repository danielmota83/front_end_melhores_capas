import React, { useState, useEffect, useCallback } from 'react';
import CapaListaItem from 'components/CapaListaItem/CapaListaItem';
import { CapaService } from 'services/CapaService';
import './CapaLista.css';
import CapaDetalhesModal from 'components/CapaDetalhesModal/CapaDetalhesModal';
import { ActionMode } from 'components/constants';
import { matchByText } from 'helpers/Utils.js';

function CapaLista({
  capaCriada,
  mode,
  deleteCapa,
  updateCapa,
  capaEditada,
  capaRemovida,
}) {
  const selecionadas = JSON.parse(localStorage.getItem('selecionadas')) ?? {};
  const [capas, setCapas] = useState([]);

  const [capasFiltradas, setCapasFiltradas] = useState([]);
  const [capaSelecionada, setCapaSelecionada] = useState({ selecionadas });

  const [capaModal, setCapaModal] = useState(false);

  const adicionarItem = (capaIndex) => {
    const capa = {
      [capaIndex]: Number(capaSelecionada[capaIndex] || 0) + 1,
    };
    setCapaSelecionada({ ...capaSelecionada, ...capa });
  };
  const filtroPorTitulo = ({ target }) => {
    const lista = [...capas].filter(({ titulo }) =>
      matchByText(titulo, target.value),
    );
    setCapasFiltradas(lista);
  };

 

  const removerItem = (capaIndex) => {
    const capa = {
      [capaIndex]: Number(capaSelecionada[capaIndex] || 0) - 1,
    };
    setCapaSelecionada({ ...capaSelecionada, ...capa });
  };

  const getCapaById = async (capaId) => {
    const response = await CapaService.getById(capaId);
    const mapper = {
      [ActionMode.NORMAL]: () => setCapaModal(response),
      [ActionMode.ATUALIZAR]: () => updateCapa(response),
      [ActionMode.DELETAR]: () => deleteCapa(response),
    };
    mapper[mode]();
  };

  const getLista = async () => {
    const response = await CapaService.getLista();
    setCapas(response);
  };

  useEffect(() => {
    getLista();
  }, [capaEditada, capaRemovida]);

  const adicionaCapaNaLista = useCallback(
    (capa) => {
      const lista = [...capas, capa];
      setCapas(lista);
    },
    [capas],
  );


  useEffect(() => {
    if (capaCriada && !capas.map(({ id }) => id).includes(capaCriada.id)) {
      adicionaCapaNaLista(capaCriada);
    }
    setCapasFiltradas(capas);
  }, [adicionaCapaNaLista, capaCriada, capas]);

  return (
    <div className="CapaLista-Wrapper">
      <input
        className="CapaLista-filtro"
        onChange={filtroPorTitulo}
        placeholder="Busque uma Capa pelo título"
      />

      <div className="CapaLista">
        {capasFiltradas.map((capa, index) => 
          <div className="capaListaItem">
            <CapaListaItem
              mode={mode}
              key={`CapaListaItem-${index}`}
              capa={capa}
              quantidadeSelecionada={capaSelecionada[index]}
              index={index}
              onAdd={(index) => adicionarItem(index)}
              onRemove={(index) => removerItem(index)}
              clickItem={(capaId) => getCapaById(capaId)}
            />
          </div>
        )}
        {capaModal && 
          <CapaDetalhesModal
            capa={capaModal}
            closeModal={() => setCapaModal(false)}
          />
        }
        ;
      </div>
    </div>
  );
}

export default CapaLista;
