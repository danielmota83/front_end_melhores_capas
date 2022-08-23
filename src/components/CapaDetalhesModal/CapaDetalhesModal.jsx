import './CapaDetalhesModal.css';
import Modal from 'components/Modal/Modal';

function CapaDetalhesModal({ capa, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="CapaDetalhesModal">
        <div>
          <div className="CapaDetalhesModal__album"> {capa.album} </div>
          <div className="CapaDetalhesModal__ano"> {capa.ano} </div>
          <img
            className="CapaDetalhesModal__foto"
            src={capa.fotoUrl}
            alt={`Imagem do ${capa.artista}`}
          />
          <div className="CapaDetalhesModal__descricao">
            {' '}
            <b>O que saber:</b> {capa.descricao}{' '}
          </div>

          <div className="CapaDetalhesModal__descricao">
            {' '}
            <b>Descrição:</b> {capa.descricao}{' '}
          </div>
        </div>
        <img
          className="CapaDetalhesModal__foto"
          src={capa.fotoUrl}
          alt={`Capa de ${capa.artista}`}
        />
      </div>
    </Modal>
  );
}

export default CapaDetalhesModal;
