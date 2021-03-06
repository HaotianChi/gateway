/**
 * BooleanProperty
 *
 * A bubble showing a checkbox.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

const BaseComponent = require('./base-component');

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      contain: content;
      text-align: center;
      color: white;
      font-size: 1.6rem;
    }

    .webthing-boolean-property-container {
      width: 10rem;
      height: 10rem;
      border-radius: 5rem;
      border: 2px solid white;
      background-color: #89b6d6;
      position: relative;
    }

    .webthing-boolean-property-contents {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .webthing-boolean-property-checkbox {
      display: none;
    }

    .webthing-boolean-property-checkbox + label {
      display: block;
      width: 3rem;
      height: 3rem;
      background: url("/optimized-images/checkbox-sprite.png") no-repeat 0 0;
      background-size: 3rem auto;
    }

    .webthing-boolean-property-checkbox:checked + label {
      background-position: 0 -3rem;
    }

    .webthing-boolean-property-checkbox:disabled + label {
      background-position: 0 -6rem;
    }

    .webthing-boolean-property-checkbox:checked:disabled + label {
      background-position: 0 -9rem;
    }

    .webthing-boolean-property-name {
      text-align: center;
      max-width: 10rem;
      overflow-wrap: break-word;
      background-color: #5d9bc7;
      display: inline-block;
    }
  </style>
  <div id="container" class="webthing-boolean-property-container">
    <div id="contents" class="webthing-boolean-property-contents">
      <form id="form" class="webthing-boolean-property-form">
        <input type="checkbox" id="checkbox"
          class="webthing-boolean-property-checkbox">
        <label id="label" for="checkbox"
          class="webthing-boolean-property-label">
        </label>
      </form>
    </div>
  </div>
  <div id="name" class="webthing-boolean-property-name"></div>
`;

class BooleanProperty extends BaseComponent {
  constructor() {
    super(template);

    this._input = this.shadowRoot.querySelector('#checkbox');
    this._name = this.shadowRoot.querySelector('#name');

    this._onClick = this.__onClick.bind(this);
    this._onKeyUp = this.__onKeyUp.bind(this);
  }

  connectedCallback() {
    this.name = this.dataset.name;

    this._upgradeProperty('checked');
    this._upgradeProperty('disabled');

    this._input.addEventListener('click', this._onClick);
    this._input.addEventListener('keyup', this._onKeyUp);
  }

  disconnectedCallback() {
    this._input.removeEventListener('click', this._onClick);
    this._input.removeEventListener('keyup', this._onKeyUp);
  }

  get checked() {
    return this._input.hasAttribute('checked');
  }

  set checked(value) {
    const isChecked = Boolean(value);
    if (isChecked) {
      this._input.setAttribute('checked', '');
    } else {
      this._input.removeAttribute('checked');
    }

    this._input.checked = isChecked;
  }

  get disabled() {
    return this._input.hasAttribute('disabled');
  }

  set disabled(value) {
    const isDisabled = Boolean(value);
    if (isDisabled) {
      this._input.setAttribute('disabled', '');
    } else {
      this._input.removeAttribute('disabled');
    }

    this._input.disabled = isDisabled;
  }

  get value() {
    return this.checked;
  }

  set value(value) {
    this.checked = value;
  }

  get name() {
    return this._name.innerText;
  }

  set name(value) {
    this._name.innerText = value;
  }

  __onKeyUp(e) {
    if (e.altKey) {
      return;
    }

    if (e.keyCode === 32) {
      e.preventDefault();
      this._toggleChecked();
    }
  }

  __onClick() {
    this._toggleChecked();
  }

  _toggleChecked() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
      },
      bubbles: true,
    }));
  }
}

window.customElements.define('webthing-boolean-property', BooleanProperty);
module.exports = BooleanProperty;
