import React from 'react';
import { FcCheckmark } from 'react-icons/fc'

const Modal = ({ handleClose, show, current, clicked }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  let featuresList = [...current.features]
  clicked.features.forEach(feature =>{
    if (featuresList.filter(ft => { if (ft.feature === feature.feature && ft.value === feature.value) return feature}).length === 0) {
      featuresList.push(feature)
    }
  });

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="modal-main">
        <div className="modalTable">
          <div className="tableHead"><h2>COMPARING</h2></div>
          <table>
            <tbody className="modalTBody">
              <tr className ="modalRow">
                <td className="modalData"><h3>{current.name}</h3></td>
                <td className="modalData"></td>
                <td className="modalData"><h3>{clicked.name}</h3></td>
              </tr>
              {featuresList.map(feature => {
                return <tr>
                        <td className="modalData">
                          {current.features.filter(ft => ft.feature === feature.feature && ft.value === feature.value).length ? <FcCheckmark fontSize="16px"/>: null}
                        </td>
                        <td className="modalData">
                          {feature.value ? <div>{feature.feature}: {feature.value}</div> : <div>{feature.feature}</div>}
                        </td>
                        <td className="modalData">
                          {clicked.features.filter(ft => ft.feature === feature.feature && ft.value === feature.value).length ? <FcCheckmark fontSize="16px"/>: null}
                        </td>
                      </tr>
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Modal;