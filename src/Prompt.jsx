import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export class Prompt extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.onAccept = this.onAccept.bind(this);
  }

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,

    defaultValue: PropTypes.string,
    btnAcceptLabel: PropTypes.string,
    btnCancelLabel: PropTypes.string
  }

  static defaultProps = {
    defaultValue: '#',
    btnAcceptLabel: 'Принять',
    btnCancelLabel: 'Отменить'
  }

  onAccept() {
    const onAccept = this.props.onAccept;
    const value = this.inputRef.current.value;

    onAccept(value);
  }

  render() {
    const {
      onAccept, onCancel,
      defaultValue, btnAcceptLabel, btnCancelLabel,
      ...forwardProps
    } = this.props;

    return (
      <Modal {...forwardProps} onClose={onCancel}>
        <input
          ref={this.inputRef}
          className="rdi-modal__input"
          defaultValue={defaultValue}
        />

        <div className="rdi-modal__buttons">
          <button
            className="rdi-modal__button rdi-modal__button_main"
            onClick={this.onAccept}
          >{btnAcceptLabel}</button>

          <button
            className="rdi-modal__button rdi-modal__button_error"
            onClick={onCancel}
          >{btnCancelLabel}</button>
        </div>
      </Modal>
    );
  }
}
