import './NavBar.css';
import add from 'assets/icons/add.svg';
import logo from 'assets/melhores capas.png';
import edit from 'assets/icons/edit.svg';
import trash from 'assets/icons/trash.svg';
import { ActionMode } from '../constants/index';

function NavBar({ createCapa, updateCapa, deleteCapa, mode }) {
  return (
    <div className="Home__header Header">
      <div className="row">
        <div className="button_ad">
          <button
            type="button"
            className="Opcoes__capa Capa"
             onClick={() => createCapa()}
          >
            <div className="add">
              <img
                src={add}
                width="40px"
                background-color = "none"
                className="Atualizar__icone"
                alt="Adicionar Capa"
              />
              {/* <span className="Logo__titulo"> Adicione uma capa </span> */}
            </div>
          </button>
        </div>

        <div className="button_edit">
          <button
            type="button"
            className={`update-capa
          ${mode === ActionMode.ATUALIZAR && 'capa-ativo'}`}
            onClick={() => updateCapa()}
          >
            <img src={edit} className="Atualizar__icone" alt="Atualizar capa" />
          </button>
        </div>

        <div className="button_delete">
          <button
            type="button"
            className={`delete-capa
          ${mode === ActionMode.DELETAR && 'Capa--deletar'}`}
            onClick={() => deleteCapa()}
          >
            <img
              src={trash}
              className="Atualizar__icone"
              alt="Deletar Capa"
            />
          </button>
        </div>
      </div>

      <div className="Header__logo Logo">
        <img src={logo} alt="Logo Melhores Capas " className="Logo__icone" />
      </div>

      <div></div>
    </div>
  );
}

export default NavBar;
