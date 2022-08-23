import './Home.css';
import CapaLista from 'components/CapaLista/CapaLista';
import NavBar from 'components/NavBar/NavBar';
import AdicionaCapaModal from 'components/AdicionaCapaModal/AdicionaCapaModal';
import { useState } from 'react';
import DeleteCapaModal from 'components/DeleteCapaModal/DeleteCapaModal';
import { ActionMode } from 'components/constants/index';

function Home() {
  const [canShowAdicionaCapaModal, setCanShowAdicionaCapaModal] =
    useState(false);

  const [capaParaAdicionar, setCapaParaAdicionar] = useState();
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);
  const [capaParaDeletar, setCapaParaDeletar] = useState();
  const [capaParaEditar, setCapaParaEditar] = useState();
  const [capaEditada, setCapaEditada] = useState();
  const [capaRemovida, setCapaRemovida] = useState();

  const handleDeleteCapa = (capaToDelete) => {
    setCapaParaDeletar(capaToDelete);
  };

  const handleUpdateCapa = (capaToUpdate) => {
    setCapaParaEditar(capaToUpdate);
    setCanShowAdicionaCapaModal(true);
  };

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaCapaModal(false);
    setCapaParaAdicionar();
    setCapaParaDeletar();
    setCapaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <NavBar
        mode={modoAtual}
        createCapa={() => setCanShowAdicionaCapaModal(true)}
        deleteCapa={() => handleActions(ActionMode.DELETAR)}
        updateCapa={() => handleActions(ActionMode.ATUALIZAR)}
      />

      <div className="Home__container">
        <CapaLista
          mode={modoAtual}
          capaCriada={capaParaAdicionar}
          capaRemovida={capaRemovida}
          deleteCapa={handleDeleteCapa}
          updateCapa={handleUpdateCapa}
          capaEditada={capaEditada}
        />
        {canShowAdicionaCapaModal && (
          <AdicionaCapaModal
            mode={modoAtual}
            capaToUpdate={capaParaEditar}
            closeModal={handleCloseModal}
            onCreateCapa={(capa) => setCapaParaAdicionar(capa)}
            onUpdateCapa={(capa) => setCapaEditada(capa)}
          />
        )}
        {capaParaDeletar && (
          <DeleteCapaModal
            capaParaDeletar={capaParaDeletar}
            closeModal={handleCloseModal}
            onDeleteCapa={(capa) => setCapaRemovida(capa)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
