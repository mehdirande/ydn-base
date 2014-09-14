// Copyright 2014 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview CSS base light weight popup menu.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.ui.FlyoutMenu');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.style');



/**
 * Popup menu
 * @param {ydn.ui.FlyoutMenu.Option=} opt_option
 * @param {Array.<?ydn.ui.FlyoutMenu.ItemOption>=} opt_menu_items
 * @constructor
 * @struct
 */
ydn.ui.FlyoutMenu = function(opt_option, opt_menu_items) {
  /**
   * @type {Element}
   * @private
   */
  this.el_ = null;
  /**
   * @type {ydn.ui.FlyoutMenu.Option}
   * @private
   */
  this.option_ = opt_option || /** @type {ydn.ui.FlyoutMenu.Option} */ ({});
  /**
   * @type {Array.<?ydn.ui.FlyoutMenu.ItemOption>}
   * @private
   */
  this.items_option_ = ydn.object.clone(opt_menu_items || []);
};


/**
 * @const
 * @type {string}
 */
ydn.ui.FlyoutMenu.CSS_CLASS = 'more-menu';


/**
 * @const
 * @type {string}
 */
ydn.ui.FlyoutMenu.CSS_CLASS_MENU = 'flyout-menu';


/**
 * @param {Element} el
 */
ydn.ui.FlyoutMenu.prototype.render = function(el) {
  goog.asserts.assert(!this.el_, 'Already rendered.');
  this.el_ = document.createElement('div');
  this.el_.className = ydn.ui.FlyoutMenu.CSS_CLASS;
  var icon_name = this.option_.className || 'more-vert';
  var svg = ydn.crm.ui.createSvgIcon(icon_name);
  var button = document.createElement('div');
  button.className = 'svg-button';
  button.appendChild(svg);
  var menu = ydn.ui.FlyoutMenu.renderMenu(this.items_option_);
  menu.classList.add(ydn.ui.FlyoutMenu.CSS_CLASS_MENU);
  this.el_.appendChild(button);
  this.el_.appendChild(menu);
  el.appendChild(this.el_);
};


/**
 * Handle click event to root menu.
 * @param {goog.events.BrowserEvent|Event} e
 * @return {?string} if menu item is click, it will be return item name.
 */
ydn.ui.FlyoutMenu.handleClick = function(e) {
  var item = goog.dom.getAncestorByClass(/** @type {Node} */ (e.target),
      'goog-menuitem');
  if (item) {
    e.preventDefault();
    e.stopPropagation();
    var name = item.getAttribute('name');
    var is_disable = item.classList.contains('goog-menuitem-disabled');
    var el = goog.dom.getAncestorByClass(item, ydn.ui.FlyoutMenu.CSS_CLASS_MENU);
    goog.style.setElementShown(el, false);
    setTimeout(function() {
      // menu show/hide status is determine by hover state
      goog.style.setElementShown(el, true);
    }, 1000);
    return is_disable ? null : name;
  }
  return null;
};


/**
 * Handle click event to root menu.
 * @param {goog.events.BrowserEvent} e
 * @return {?string} if menu item is click, it will be return item name.
 */
ydn.ui.FlyoutMenu.prototype.handleClick = function(e) {
  return ydn.ui.FlyoutMenu.handleClick(e);
};


/**
 * Set menu items.
 * @param {Array.<?ydn.ui.FlyoutMenu.ItemOption>} item
 */
ydn.ui.FlyoutMenu.prototype.setItems = function(item) {
  this.items_option_ = ydn.object.clone(item);
  if (this.el_) {
    var menu = this.el_.querySelector('.' + ydn.ui.FlyoutMenu.CSS_CLASS_MENU);
    this.el_.removeChild(menu);
    menu = ydn.ui.FlyoutMenu.renderMenu(this.items_option_);
    menu.classList.add(ydn.ui.FlyoutMenu.CSS_CLASS_MENU);
    this.el_.appendChild(menu);
  }
};


/**
 * @return {Element}
 */
ydn.ui.FlyoutMenu.prototype.getElement = function() {
  return this.el_;
};


/**
 * @typedef {{
 *   className: (string|undefined),
 *   title: (string|undefined)
 * }}
 * className: css class name. 'more-vert', 'more-horiz' or 'menu'
 * title: div title for the menu item.
 */
ydn.ui.FlyoutMenu.Option;


/**
 * @typedef {{
 *   label: string,
 *   name: (string),
 *   value: *,
 *   type: (string|undefined),
 *   disabled: (boolean|undefined),
 *   children: (Array.<ydn.ui.FlyoutMenu.ItemOption>|undefined)
 * }}
 * label: menu text.
 * name: commend in dispatching event.
 * type: SugarCrm.ModuleField#type for input type, default to type='text', for
 * 'bool', it becomes type='checkbox'
 * When type is 'bool', value can be 'true' or 'false'.
 */
ydn.ui.FlyoutMenu.ItemOption;


/**
 * @param {Array.<?ydn.ui.FlyoutMenu.ItemOption>} items_option
 * @return {Element}
 */
ydn.ui.FlyoutMenu.renderMenu = function(items_option) {
  // console.log(options);
  var dom = goog.dom.getDomHelper();
  var items = [];
  for (var i = 0; i < items_option.length; i++) {
    var opt = items_option[i];
    if (!opt) {
      // render as menu separator
      var rep = dom.createDom('div', {
        'class': 'goog-menuseparator',
        'role': 'separator'
      });
      items.push(rep);
      continue;
    }
    var menu_content = [dom.createDom('div', {
      'class': 'goog-menuitem-content'
    }, opt.label)];
    if (opt.type == 'bool') {
      var chk = dom.createDom('div', {
        'class': 'goog-menuitem-checkbox',
        'role': 'menuitem'
      });
      menu_content.unshift(chk);
    }
    if (opt.children) {
      var svg_arrow = ydn.crm.ui.createSvgIcon('arrow-drop-right');
      svg_arrow.classList.add('left-arrow');
      menu_content.unshift(svg_arrow);
    }
    var menuitem = dom.createDom('div', {
      'class': 'goog-menuitem',
      'role': opt.type == 'bool' ? 'goog-menuitem-checkbox' : 'menuitem'
    }, menu_content);
    menuitem.setAttribute('name', opt.name);
    if (opt.value) {
      menuitem.classList.add('goog-option-selected');
    }
    if (opt.children) {
      var sub_menu = ydn.ui.FlyoutMenu.renderMenu(opt.children);
      menuitem.appendChild(sub_menu);
    }
    if (opt.disabled) {
      menuitem.classList.add('goog-menuitem-disabled');
    }
    items.push(menuitem);
  }

  var menu = dom.createDom('div', {
    'class': 'goog-menu goog-menu-vertical',
    'role': 'menu'
  },
  items);
  return menu;
};


/**
 * @param {Element} el
 * @param {Array.<?ydn.ui.FlyoutMenu.ItemOption>} items_option
 * @param {ydn.ui.FlyoutMenu.Option=} opt_option
 */
ydn.ui.FlyoutMenu.decoratePopupMenu = function(el, items_option, opt_option) {
  // console.log(options);
  var icon_name = 'more-vert';
  var button = document.createElement('span');
  button.className = 'flyout-button';
  var svg = ydn.crm.ui.createSvgIcon('more-vert');
  var menu = ydn.ui.FlyoutMenu.renderMenu(items_option);
  menu.classList.add('flyout-menu');
  button.appendChild(svg);
  button.appendChild(menu);
  el.appendChild(button);
};


/**
 * Decorate as enable or disable to a given named menu item.
 * @param {Element} menu goog-menu element
 * @param {string} name menu item name.
 * @param {boolean} val true to enable, false to disable.
 */
ydn.ui.FlyoutMenu.setEnableMenuItem = function(menu, name, val) {
  var el = menu.querySelector('div.goog-menuitem[name="' + name + '"]');
  if (!el) {
    return;
  }
  if (val) {
    el.classList.remove('goog-menuitem-disabled');
  } else {
    el.classList.add('goog-menuitem-disabled');
  }
};


/**
 * Set menu label.
 * @param {Element} menu goog-menu element
 * @param {string} name menu item name.
 * @param {string} val true to enable, false to disable.
 */
ydn.ui.FlyoutMenu.setMenuItemLabel = function(menu, name, val) {
  var el = menu.querySelector('div.goog-menuitem[name="' + name + '"]');
  if (!el) {
    return;
  }
  var content = el.querySelector('.goog-menuitem-content');
  content.textContent = val;
};


/**
 * Decorate as enable or disable to a given named menu item.
 * @param {string} name menu item name.
 * @param {boolean} val true to enable, false to disable.
 */
ydn.ui.FlyoutMenu.prototype.setEnableMenuItem = function(name, val) {
  var el = this.getElement();
  ydn.ui.FlyoutMenu.setEnableMenuItem(el, name, val);
};


/**
 * Set menu label.
 * @param {string} name menu item name.
 * @param {string} val true to enable, false to disable.
 */
ydn.ui.FlyoutMenu.prototype.setMenuItemLabel = function(name, val) {
  var el = this.getElement();
  ydn.ui.FlyoutMenu.setMenuItemLabel(el, name, val);
};