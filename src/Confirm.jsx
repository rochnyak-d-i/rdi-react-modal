import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export class Confirm extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,

    disabled: PropTypes.bool,
    label: PropTypes.string,
    btnAcceptLabel: PropTypes.string,
    btnCancelLabel: PropTypes.string
  }

  static defaultProps = {
    label: 'Вы уверены?',
    btnAcceptLabel: 'Да',
    btnCancelLabel: 'Нет'
  }

  render() {
    const {
      onAccept, onCancel, disabled,
      btnAcceptLabel, btnCancelLabel,
      ...forwardProps
    } = this.props;

    return (
      <Modal {...forwardProps} onClose={onCancel}>
        <div className="rdi-modal__buttons">
          <button
            disabled={disabled}
            className="rdi-modal__button rdi-modal__button_main"
            onClick={onAccept}
          >{btnAcceptLabel}</button>

          <button
            disabled={disabled}
            className="rdi-modal__button rdi-modal__button_error"
            onClick={onCancel}
          >{btnCancelLabel}</button>
        </div>
      </Modal>
    );
  }
}
