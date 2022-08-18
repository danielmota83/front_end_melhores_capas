import "./DeleteCapaModal.css"
import Modal from "components/Modal/Modal";
import { capaService } from "services/CapaService";

function DeleteCapaModal({
    closeModal,
    capaParaDeletar,
    onDeleteCapa,
  }) {
    const handleDelete = async (capa) => {
      await capaService.deleteById(capa.id);
      onDeleteCapa(capa);
      closeModal();
    };
  
    return (
      <Modal closeModal={closeModal}>
        <div className="DeletaCapaModal">
          <h2>Confirmação</h2>
          <p>
            Você realmente deseja remover <b>{capaParaDeletar.album}</b> da
            lista?
          </p>
  
          <img
            className="DeletaCapaModal__img"
            src={capaParaDeletar.fotoUrl}
            alt={capaParaDeletar.album}
          />
  
          <br />
  
          <div>
            <button
              onClick={() => handleDelete(capaParaDeletar)}
              className="DeletaCapaModal__confirmar"
            >
              {" "}
              Confirmar{" "}
            </button>
            <button onClick={closeModal} className="DeletaCapaModal__cancelar">
              {" "}
              Cancelar{" "}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
  
  export default DeleteCapaModal
