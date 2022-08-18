import "./CapaListaItem.css";
import { ActionMode } from 'components/constants/index';
import {verificaTipo} from "views/Home/Home"

function CapaListaItem({
  capa,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode
}) {
  // const removeButton = (canRender, index) =>
  //   Boolean(canRender) && (
  //     <button
  //       className="Acoes__remover"
  //       onClick={(e) => {
  //         e.stopPropagation();
  //         onRemove(index);
  //       }}
  //     >
  //       remover
  //     </button>
  //   );

  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="capaListaItem__badge"> {quantidadeSelecionada} </span>
    );
    const badgeAction = (canRender) => {
      if (canRender) return (<span className={`CapaListaItem__tag ${mode === ActionMode.DELETAR && 'CapaListaItem__tag--deletar'}`}> { mode } </span>);
    }

  return (
    <div className= {`CapaListaItem 
    ${mode !== ActionMode.NORMAL && 'CapaListaItem--disable'}
    ${mode === ActionMode.DELETAR && 'CapaListaItem--deletar'}
  `}
        onClick={() => clickItem(capa.id)}>
      {badgeCounter(quantidadeSelecionada, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
            
      <div className="capaLista__container">
        <div className="CapaListaItem__artista"> {capa.artista} </div>
        <div className="CapaListaItem__ano"> {capa.album} - {capa.ano} </div>
        <div className="CapaListaItem__descricao"> {capa.descricao}<br></br> </div>
        {/* <div className="CapaListaItem__acoes Acoes">
          <button
            className={`Acoes__adicionar ${ !quantidadeSelecionada && "Acoes__adicionar--preencher" }`}
            onClick={(e) => { e.stopPropagation(); onAdd(index); }} >
            adicionar
          </button>
          {removeButton(quantidadeSelecionada, index)}
        </div> */}

<br></br>
      {verificaTipo(capa.tipo)}
      <br></br>
      
      <img
        className="CapaListaItem__fotoUrl"
        src={capa.fotoUrl}
        alt={`capa de ${capa.album}`}
      />
      </div>
    </div>
  );
}

export default CapaListaItem;
