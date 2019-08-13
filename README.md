# rdi-react-modal

## Installation
```bash
npm i rdi-react-modal
```

## Usage

```jsx
import { Modal, Confirm, Prompt } from 'rdi-react-modal';
import 'rdi-react-modal/assets/style.css';

const [showedModal, toggleModal] = useState(true);

{showedModal &&
  <Modal onClose={() => toggleModal(false)}>
    <div>Some content</div>
  </Modal>
}

{showedModal &&
  <Modal
    label="Hello"
    describe="World"
    onClose={() => toggleModal(false)}
  />
}

{showedModal &&
    <Confirm
      onCancel={() => toggleModal(false)}
      onAccept={() => {}}
    />
}

{showedModal &&
  <Prompt
    onCancel={() => toggleModal(false)}
    onAccept={value => {}}
  />
}
```

## Props

### Modal

```js
propTypes = {
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
```


### Prompt

```js
propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,

  defaultValue: PropTypes.string,
  btnAcceptLabel: PropTypes.string,
  btnCancelLabel: PropTypes.string
} // assign Modal propTypes

```

### Confirm
```js
propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,

  disabled: PropTypes.bool,
  label: PropTypes.string,
  btnAcceptLabel: PropTypes.string,
  btnCancelLabel: PropTypes.string
} // assign Modal propTypes

```

## Development

```bash
npm i && npm run build
```
