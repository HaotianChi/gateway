/**
 * BinarySensorCapability
 *
 * A bubble showing a binary sensor icon.
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
      display: block;
      contain: content;
      text-align: center;
      color: white;
      font-size: 1.6rem;
    }

    .webthing-binary-sensor-capability-icon {
      width: 12.8rem;
      height: 12.8rem;
      border-radius: 6.4rem;
      background-size: 12.8rem;
      background-repeat: no-repeat;
      transform: translate(0);
      background-color: #5d9bc7;
      background-image: url('/optimized-images/binary-sensor.png');
    }

    .webthing-binary-sensor-capability-icon.on {
      background-image: url('/optimized-images/binary-sensor-on.png');
    }

    .webthing-binary-sensor-capability-icon.off {
      background-image: url('/optimized-images/binary-sensor-off.png');
    }
  </style>
  <div id="icon" class="webthing-binary-sensor-capability-icon"></div>
`;

class BinarySensorCapability extends BaseComponent {
  constructor() {
    super(template);

    this._icon = this.shadowRoot.querySelector('#icon');
  }

  connectedCallback() {
    this.on = typeof this.dataset.on !== 'undefined' ? this.dataset.on : false;
  }

  get on() {
    return this._icon.classList.contains('on');
  }

  set on(value) {
    if (value === true) {
      this._icon.classList.remove('off');
      this._icon.classList.add('on');
    } else if (value === false) {
      this._icon.classList.remove('on');
      this._icon.classList.add('off');
    } else {
      this._icon.classList.remove('on');
      this._icon.classList.remove('off');
    }
  }
}

window.customElements.define('webthing-binary-sensor-capability',
                             BinarySensorCapability);
module.exports = BinarySensorCapability;
