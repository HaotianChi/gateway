/**
 * SliderProperty
 *
 * A bubble showing a slider.
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

    .webthing-slider-property-container {
      width: 10rem;
      height: 10rem;
      border-radius: 5rem;
      border: 2px solid white;
      background-color: #89b6d6;
      position: relative;
    }

    .webthing-slider-property-contents {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .webthing-slider-property-form {
      width: 8rem;
      height: 8rem;
    }

    .webthing-slider-property-slider {
      width: 8rem;
      margin: 0;
      transform: rotate(-90deg) translate(-3rem, 0);
    }

    .webthing-slider-property-name {
      text-align: center;
      max-width: 10rem;
      overflow-wrap: break-word;
      background-color: #5d9bc7;
      display: inline-block;
    }
  </style>
  <div id="container" class="webthing-slider-property-container">
    <div id="contents" class="webthing-slider-property-contents">
      <form id="form" class="webthing-slider-property-form">
        <input type="range" id="slider" class="webthing-slider-property-slider">
      </form>
    </div>
  </div>
  <div id="name" class="webthing-slider-property-name"></div>
`;

class SliderProperty extends BaseComponent {
  constructor() {
    super(template);

    this._input = this.shadowRoot.querySelector('#slider');
    this._name = this.shadowRoot.querySelector('#name');

    this._onChange = this.__onChange.bind(this);
  }

  connectedCallback() {
    this.name = this.dataset.name;

    this._upgradeProperty('min');
    this._upgradeProperty('max');
    this._upgradeProperty('step');
    this._upgradeProperty('value');
    this._upgradeProperty('disabled');

    this._input.addEventListener('change', this._onChange);
  }

  disconnectedCallback() {
    this._input.removeEventListener('change', this._onChange);
  }

  get min() {
    return this._input.min;
  }

  set min(value) {
    this._input.min = value;
  }

  get max() {
    return this._input.max;
  }

  set max(value) {
    this._input.max = value;
  }

  get step() {
    return this._input.step;
  }

  set step(value) {
    this._input.step = value;
  }

  get value() {
    return this._input.value;
  }

  set value(value) {
    this._input.value = value;
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

  get name() {
    return this._name.innerText;
  }

  set name(value) {
    this._name.innerText = value;
  }

  __onChange(e) {
    e.preventDefault();
    this.value = e.target.value;

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this.value,
      },
      bubbles: true,
    }));
  }
}

window.customElements.define('webthing-slider-property', SliderProperty);
module.exports = SliderProperty;
