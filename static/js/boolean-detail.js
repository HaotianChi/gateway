/**
 * BooleanDetail
 *
 * A generic boolean property detail.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const Utils = require('./utils');

class BooleanDetail {
  constructor(thing, name, label) {
    this.thing = thing;
    this.name = name;
    this.label = label || name;
    this.id = `boolean-${Utils.escapeHtmlForIdClass(this.name)}`;
  }

  /**
   * Attach to the view.
   */
  attach() {
    this.input = this.thing.element.querySelector(`#${this.id}`);
    const setChecked = Utils.debounce(500, this.set.bind(this));
    this.input.addEventListener('change', setChecked);
  }

  /**
   * Build the detail view.
   */
  view() {
    const checked = this.thing.properties[this.name];

    return `
      <webthing-boolean-property data-name="${Utils.escapeHtml(this.label)}"
        ${checked ? 'checked' : ''} id="${this.id}">
      </webthing-boolean-property>`;
  }

  /**
   * Update the detail view with the new property value.
   */
  update() {
    if (!this.input || this.thing.properties[this.name] == this.input.checked) {
      return;
    }

    this.input.checked = this.thing.properties[this.name];
  }

  set() {
    this.thing.setProperty(this.name, this.input.checked);
  }
}

module.exports = BooleanDetail;
