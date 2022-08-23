import './AdicionaCapaModal.css';
import { useState, useEffect } from 'react';
import Modal from 'components/Modal/Modal';
import { CapaService } from 'services/CapaService';
import { ActionMode } from '../constants/index';

function AdicionaCapaModal({
  closeModal,
  onCreateCapa,
  mode,
  capaToUpdate,
  onUpdateCapa,
}) {
  const form = {
    artista: capaToUpdate?.artista ?? '',
    album: capaToUpdate?.album ?? '',
    ano: capaToUpdate?.ano ?? '',
    fotoUrl: capaToUpdate?.fotoUrl ?? '',
    descricao: capaToUpdate?.descricao ?? '',
  };

  const [state, setState] = useState(form);
  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.descricao.length &&
        state.fotoUrl.length &&
        String(state.ano).length &&
        state.artista.length &&
        state.album.length,
    );

    setCanDisable(response);
  };

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const handleSend = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split('\\').pop();

    const { artista, album, ano, descricao, fotoUrl } = state;

    const capa = {
      ...(capaToUpdate && { _id: capaToUpdate?.id }),
      album,
      descricao,
      artista,
      ano,
      fotoUrl: `assets/images/${renomeiaCaminhoFoto(fotoUrl)}`,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => CapaService.create(capa),
      [ActionMode.ATUALIZAR]: () =>
        CapaService.updtateById(capaToUpdate?.id, capa),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreateCapa(response),
      [ActionMode.ATUALIZAR]: () => onUpdateCapa(response),
    };

    actionResponse[mode]();

    const reset = {
      ano: '',
      artista: '',
      album: '',
      descricao: '',
      fotoUrl: '',
    };

    setState(reset);

    closeModal();
  };
  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaCapaModal">
        <form autoComplete="off">
          <h2>
            {' '}
            {ActionMode.ATUALIZAR === mode
              ? 'Atualizar'
              : 'Adicionar à'} lista{' '}
          </h2>
          <div>
            <label className="AdicionaCapaModal__text" htmlFor="ano">
              {' '}
              ano:{' '}
            </label>
            <input
              id="ano"
              placeholder="1980"
              type="text"
              value={state.ano}
              required
              onChange={(e) => handleChange(e, 'ano')}
            />
          </div>
          <div>
            <label className="AdicionaCapaModal__text" htmlFor="album">
              {' '}
              Album:{' '}
            </label>
            <input
              id="Album"
              placeholder="Tropicália"
              type="text"
              value={state.album}
              required
              onChange={(e) => handleChange(e, 'album')}
            />
          </div>
          <div>
            <label className="AdicionaCapaModal__text" htmlFor="artista">
              {' '}
              artista:{' '}
            </label>
            <input
              id="artista"
              placeholder="Gilbertl Gil"
              type="text"
              value={state.artista}
              onChange={(e) => handleChange(e, 'artista')}
            />
          </div>
          <div>
            <label className="AdicionaCapaModal__text" htmlFor="descricao">
              {' '}
              Descricao:{' '}
            </label>
            <input
              id="descricao"
              placeholder="Fale sobre a capa"
              type="text"
              value={state.descricao}
              required
              onChange={(e) => handleChange(e, 'descricao')}
            />
          </div>
          <div>
            <label
              className="AdicionaCapaModal__text  AdicionaCapaModal__fotoUrl-label"
              htmlFor="fotoUrl"
            >
              {!state.fotoUrl.length ? 'Url da capa' : state.fotoUrl}
            </label>
            <input
              className=" AdicionaCapaModal__fotoUrl"
              id="fotoUrl"
              type="file"
              accept="url"
              value={state.fotoUrl}
              required
              onChange={(e) => handleChange(e, 'fotoUrl')}
            />
          </div>

          <button
            className="AdicionaCapaModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? 'Enviar' : 'Atualizar'}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaCapaModal;
