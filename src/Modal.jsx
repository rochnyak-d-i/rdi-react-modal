import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FocusTrap from './FocusTrap';
import { IS_BROWSER } from './utils/isBrowser';

const ESC = 27;

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.closeButtonRef = React.createRef();

    this.root = document.createElement('div');

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  static propTypes = {
    onClose: PropTypes.func,
    onKeyDown: PropTypes.func,
    hidden: PropTypes.bool,
    transparent: PropTypes.bool,
    className: PropTypes.string,
    containerSelect: PropTypes.string,

    label: PropTypes.string,
    labelId: PropTypes.string,
    describe: PropTypes.string,
    describeId: PropTypes.string
  }

  static defaultProps = {
    hidden: false,
    containerSelect: 'body',
    describeId: 'modal-describe-id',
    labelId: 'modal-label-id'
  }

  componentDidMount() {
    document.body.appendChild(this.root);
    this.__$root = document.querySelector(this.props.containerSelect);
    this.__$root.classList.add('blurred');

    // Запоминаем фокус элемента, вызвавшего окно
    this.lastFocusableElement = document.activeElement;
    this.closeButtonRef.current.focus();
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
    this.__$root.classList.remove('blurred');

    // Если элемент открывающий страницы еще в DOM'е,
    //  то обратно передаем ему фокус
    if (document.body.contains(this.lastFocusableElement)) {
      this.lastFocusableElement.focus();
    }
  }

  onClose() {
    const onClose = this.props.onClose;

    onClose && onClose();
  }

  onKeyDown(event) {
    if (event.keyCode === ESC) {
      event.preventDefault();

      this.onClose();
    }

    this.props.onKeyDown && this.props.onKeyDown(event);
  }

  render() {
    const {
      className, transparent,
      hidden, children,
      label, labelId,
      describe, describeId
    } = this.props;
    const contentClassName = classNames(
      'rdi-modal__content', className, {
        'rdi-modal__content_colored': !transparent
      }
    );

    return ReactDOM.createPortal(
      <FocusTrap>
        <div className="rdi-modal"
          role="dialog"
          aria-modal="true"
          aria-hidden={hidden}
          hidden={hidden}
          tabIndex="-1"
          aria-labelledby={labelId}
          aria-describedby={describeId}
          onKeyDown={this.onKeyDown}
        >
          <div className="rdi-modal__backdrop" onClick={this.onClose} />

          <button className="rdi-modal__close"
            ref={this.closeButtonRef}
            aria-label="close"
            onClick={this.onClose}
          >☓</button>

          <div className={contentClassName}>
            {label &&
              <h2 className="rdi-modal__label" id={labelId}>{label}</h2>
            }

            {describe &&
              <p className="rdi-modal__describe" id={describeId}>
                {describe}
              </p>
            }

            {children}
          </div>
        </div>
      </FocusTrap>,
      this.root
    );
  }
}

export default IS_BROWSER ? Modal : () => null;
