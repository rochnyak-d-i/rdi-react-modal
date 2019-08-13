import React, {Fragment, Component} from 'react';

const hidden = {
  width: '1px',
  height: '0px',
  padding: 0,
  overflow: 'hidden',
  position: 'fixed',
  top: '1px',
  left: '1px',
};

const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable], iframe, object, embed, keygen, audio, video, summary';

class FocusTrap extends Component {
  constructor(props) {
    super(props);

    this.firstElementRef = React.createRef();
    this.lastElementRef = React.createRef();

    this.onFocusFirst = this.onFocusFirst.bind(this);
    this.onFocusLast = this.onFocusLast.bind(this);
  }

  findFocusable(node, dir) {
    const sibling = (dir === 'next') ?
      node.nextElementSibling :
      node.previousElementSibling;

    const element = sibling.querySelector(selector) ||
      this.findPrevFocusable(sibling, dir);

    return element;
  }

  onFocusFirst() {
    if (!this.$__cachedLastElement) {
      this.$__cachedLastElement = this.findFocusable(
        this.lastElementRef.current, 'prev');
    }

    if (this.lastElementRef.current !== this.$__cachedLastElement) {
      this.$__cachedLastElement.focus();
    }
  }

  onFocusLast() {
    if (!this.$__cachedFirstElement) {
      this.$__cachedFirstElement = this.findFocusable(
        this.firstElementRef.current, 'next');
    }

    if (this.firstElementRef.current !== this.$__cachedFirstElement) {
      this.$__cachedFirstElement.focus();
    }
  }

  render() {
    return (
      <Fragment>
        <div onFocus={this.onFocusFirst}
          ref={this.firstElementRef}
          tabIndex="0"
          style={hidden}
        ></div>

        {this.props.children}

        <div onFocus={this.onFocusLast}
          ref={this.lastElementRef}
          tabIndex="0"
          style={hidden}
        ></div>
      </Fragment>
    );
  }
}

export default FocusTrap;
