/*jslint browser: true, indent: 2 */
/*global $id:true, window, wpt_change_selected, wpt_device_specific, wpt_fullscreen:true, wpt_init:true, wpt_init_fd_slider, wpt_init_select, wpt_setButton:true, wpt_set_device_type, wpt_save_items_height, wpt_collapse_all, wpt_fold_toggle, wpt_keyset, wpt_keyrelease, insert_sm, loadCSSexample, ptr_init, fdSlider, prettyPrint */

var wpt_device_type = false,
  wpt_shift_key_status = false,
  initialized = false,
  cssobjects = {},
  wpt_menu_items_height = [],
  ischanging = 1,
  css,
  $id,
  wpt_init,
  wpt_set_device_type,
  wpt_fullscreen,
  wpt_keyset,
  wpt_keyrelease,
  wpt_dialog,
  wpt_fold_in,
  wpt_fold_out,
  wpt_fold_toggle,
  wpt_collapse_all,
  wpt_expand_all,
  wpt_expand_enabled,
  wpt_save_items_height,
  wpt_init_fd_slider,
  wpt_init_select,
  wpt_device_specific,
  wpt_change_vars,
  getColor,
  buildMailtoURL,
  generate_css,
  wpt_change_selected,
  wpt_setButton,
  wpt_slider_changed,
  CSStextarea,
  loadExample,
  loadCSSexample,
  editor_show,
  editCSS;

$id = function (id) {
  "use strict";
  return document.getElementById(id);
};

wpt_init = function () {
  "use strict";
  var menu_title,
    i = 0,
    menu_titles = document.getElementsByClassName('wpt_contents');
  wpt_init_fd_slider();
  $id('loadingstat').innerHTML += '.';
  wpt_init_select();
  $id('loadingstat').innerHTML += '.';
  wpt_save_items_height();
  $id('loadingstat').innerHTML += '.';
  wpt_set_device_type();
  $id('loadingstat').innerHTML += '.';
  window.setTimeout(wpt_collapse_all, 150);
  wpt_device_specific();
  for (i = 0; i < menu_titles.length; i += 1) {
    menu_title = menu_titles[i].previousSibling;
    if (menu_title !== undefined) {
      menu_title.previousSibling.addEventListener("click", wpt_fold_toggle, false);
    }
  }
  document.body.addEventListener("keydown", wpt_keyset, false);
  document.body.addEventListener("keyup", wpt_keyrelease, false);
  window.setTimeout(insert_sm, 225);
  loadCSSexample('text');
  ptr_init();
  initialized = true;
};

wpt_set_device_type = function () {
  "use strict";
  if ($id('toolbar').offsetHeight === 44) {
    wpt_device_type = 'desktop';
    $id('devicetype').innerHTML = 'desktop version';
  } else if ($id('toolbar').offsetHeight === 53) {
    wpt_device_type = 'ipad';
    $id('devicetype').innerHTML = 'iPad version';
  } else {
    wpt_device_type = false;
  }
};

wpt_fullscreen = function () {
  "use strict";
  var element = document.body;
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
};

wpt_keyset = function (evt) {
  "use strict";
  if (evt.keyCode === 16) {
    if (wpt_shift_key_status === 0) {
      wpt_shift_key_status = 1;
      evt.stopPropagation();
    } else {
      wpt_shift_key_status = 0;
      evt.stopPropagation();
    }
  }
};

wpt_keyrelease = function (evt) {
  "use strict";
  if (evt.keyCode === 16) {
    if (wpt_shift_key_status === 0) {
      wpt_shift_key_status = 1;
      evt.stopPropagation();
    } else {
      wpt_shift_key_status = 0;
      evt.stopPropagation();
    }
  }
};

wpt_dialog = function (id) {
  "use strict";
  if (id !== undefined) {
    $id('dialog').innerHTML = $id(id).innerHTML;
    $id('dialog').style.top = '200px';
    $id('dialog').style.display = 'block';
    $id('dimmer').style.zIndex = '3';
    $id('dimmer').style.opacity = '1.0';
  } else {
    $id('dialog').style.top = '-700px';
    $id('dimmer').style.zIndex = '-1';
    $id('dimmer').style.opacity = '0.0';
  }
};

wpt_fold_in = function (e) {
  "use strict";
  e.className = 'item';
  if (wpt_device_type === 'ipad') {
    e.style.height = '35px';
  } else {
    e.style.height = '25px';
  }
  if (e.firstChild.nextSibling.nextSibling.className === 'wpt_contents') {
    e.firstChild.nextSibling.nextSibling.style.display = 'none';
  }
};

wpt_fold_out = function (e) {
  "use strict";
  if (!wpt_shift_key_status) {
    wpt_collapse_all();
  }
  e.className += ' active';
  e.style.height = wpt_menu_items_height[e.firstChild.id] + 'px';
  if (e.firstChild.nextSibling.nextSibling.className === 'wpt_contents') {
    e.firstChild.nextSibling.nextSibling.style.display = 'block';
  }
};

wpt_fold_toggle = function () {
  "use strict";
  var prev_className = this.parentNode.className;
  if (prev_className !== undefined) {
    if (prev_className.search("active") !== -1) {
      wpt_fold_in(this.parentNode);
    } else {
      wpt_fold_out(this.parentNode);
    }
  }
};

wpt_collapse_all = function () {
  "use strict";
  var menu_items = document.getElementsByClassName('wpt_contents'),
    i,
    menu_item;
  for (i = 0; i < menu_items.length; i += 1) {
    menu_item = menu_items[i];
    if (menu_item.className !== undefined) {
      wpt_fold_in(menu_item.parentNode);
      menu_item.style.display = 'none';
    }
  }
  if ($id('loadingstat')) {
    $id('loadingstat').innerHTML += '.';
  }
  window.setTimeout(wpt_dialog, 225);
};

wpt_expand_all = function () {
  "use strict";
  var pre_shift_key_status = wpt_shift_key_status,
    i,
    menu_items = document.getElementsByClassName('wpt_contents'),
    menu_item;
  for (i = 0; i < menu_items.length; i += 1) {
    menu_item = menu_items[i];
    if (menu_item.className !== undefined) {
      wpt_shift_key_status = true;
      wpt_fold_out(menu_item.parentNode);
    }
  }
  wpt_shift_key_status = pre_shift_key_status;
};

wpt_expand_enabled = function () {
  "use strict";
  wpt_collapse_all();
  var pre_shift_key_status = wpt_shift_key_status,
    i,
    menu_items = document.getElementsByClassName('wpt_contents'),
    menu_item;
  wpt_shift_key_status = true;
  for (i = 0; i < menu_items.length; i += 1) {
    menu_item = menu_items[i];
    if (menu_item.className !== undefined) {
      if (menu_item.childNodes[1].value === 'on') {
        wpt_fold_out(menu_item.parentNode);
      }
    }
  }
  wpt_shift_key_status = pre_shift_key_status;
};

wpt_save_items_height = function () {
  "use strict";
  var menu_items = document.getElementsByClassName('wpt_contents'),
    menu_item,
    i,
    prev_item;
  for (i = 0; i < menu_items.length; i += 1) {
    menu_item = menu_items[i];
    if (menu_item.previousSibling !== undefined) {
      if (menu_item.previousSibling.previousSibling !== undefined) {
        prev_item = menu_item.previousSibling.previousSibling;
        if (wpt_device_type === 'desktop') {
          wpt_menu_items_height[prev_item.id] = menu_item.offsetHeight + 45;
        } else {
          wpt_menu_items_height[prev_item.id] = menu_item.offsetHeight + 55;
        }
      }
    }
  }
};

wpt_init_fd_slider = function () {
  "use strict";
  var animation,
    maxvalue,
    minvalue,
    mstep,
    i = 0,
    fd_slider = [],
    fd_sliders = document.getElementsByClassName('fd_slider');
  if ($id('dialog').offsetTop === 200) {
    animation = 'jump';
  } else {
    animation = 'tween';
  }
  for (i = 0; i < fd_sliders.length; i += 1) {
    mstep = 1;
    fd_slider = fd_sliders[i];
    maxvalue = fd_slider.max || '100';
    minvalue = fd_slider.min || '0';
    if ((maxvalue - minvalue < 11) && (fd_slider.step === undefined)) {
      mstep = 0.1;
    } else if ((maxvalue - minvalue > 10) && (fd_slider.step === undefined)) {
      mstep = 1;
    } else {
      mstep = fd_slider.step;
    }
    if (fd_slider !== undefined) {
      fdSlider.createSlider({
        inp: fd_slider,
        step: mstep,
        maxStep: 1,
        min: minvalue,
        max: maxvalue,
        animation: animation,
        forceValue: true
      });
    }
  }
};

wpt_init_select = function () {
  "use strict";
  var inputbox,
    selected,
    select_eles,
    select_element,
    x,
    y,
    select_boxes = document.getElementsByClassName('segmented');
  for (x = 0; x < select_boxes.length; x += 1) {
    selected = '';
    select_eles = select_boxes[x].childNodes;
    for (y = 0; y < select_eles.length; y += 1) {
      select_element = select_eles[y];
      if (select_element.className !== undefined) {
        if (select_element.className.indexOf(' selected') !== -1) {
          selected = select_element.className.replace("segment", "").replace("selected", "").replace("full", "").replace("percent", "%").trim();
        }
        select_element.addEventListener("click", wpt_change_selected, false);
      }
    }
    if ((select_boxes[x].id !== '') && (select_boxes[x].parentNode !== undefined)) {
      inputbox = document.createElement("input");
      inputbox.type = 'text';
      inputbox.name = select_boxes[x].id;
      inputbox.value = selected;
      inputbox.id = 'wpt_s' + select_boxes[x].id;
      inputbox.className = 'select_textfield';
      select_boxes[x].parentNode.insertBefore(inputbox, select_boxes[x]);
    }
  }
};

wpt_device_specific = function () {
  "use strict";
  if (wpt_device_type === 'desktop') {
    $id('special_style').innerHTML = '.fd-slider-handle:before,.fd-slider-handle:after{content:"";opacity:0;-webkit-transition-property:all;-moz-transition-property:all;-ms-transition-property:all;-o-transition-property:all;transition-property:all;-webkit-transition-duration:0.3s;-moz-transition-duration:0.3s;-ms-transition-duration:0.3s;-o-transition-duration:0.3s;transition-duration:0.3s;-webkit-transition-delay:0.2s;-moz-transition-delay:0.2s;-ms-transition-delay:0.2s;-o-transition-delay:0.2s;transition-delay:0.2s;}.fd-slider-handle::before{display:block;position:absolute;top:-30px;left:-15px;margin:0px;margin-top:8px;width:50px;padding:1px;height:14px;line-height:12px;font-size:10px;text-shadow:0 1px 0 black;color:white;background:#222;z-index:1;content:attr(aria-valuetext);-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 0 4px #AAA;-moz-box-shadow:0 0 4px #aaa;box-shadow:0 0 4px #AAA;}.fd-slider-handle:after{outline:none;content:"";display:block;position:absolute;top:-14px;left:50%;margin:0 0 0 -5px;background:#222;z-index:2;width:10px;height:10px;overflow:hidden;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);-webkit-box-shadow:0 0 4px #aaa;-moz-box-shadow:0 0 4px #aaa;box-shadow:0 0 4px #aaa;clip:rect(4px,14px,14px,4px);}.fd-slider-focused .fd-slider-handle:before,.fd-slider-hover .fd-slider-handle:before,.fd-slider-active .fd-slider-handle:before{top:-25px;opacity:1;}.fd-slider-focused .fd-slider-handle:after,.fd-slider-hover .fd-slider-handle:after,.fd-slider-active .fd-slider-handle:after{top:-9px;opacity:1;}.oldie .fd-slider-handle:before,.oldie .fd-slider-handle:after{display:none;}';
  }
};

wpt_change_vars = function () {
  "use strict";
  cssobjects.position = {};
  cssobjects.position.onoff = $id('wpt_sposonoff').value;
  cssobjects.position.pos = $id('wpt_spostype1').value;
  cssobjects.position.type = $id('wpt_spostype2').value;
  cssobjects.position.top = $id('postop').value;
  cssobjects.position.left = $id('posleft').value;
  cssobjects.position.right = $id('posright').value;
  cssobjects.position.bottom = $id('posbottom').value;
  cssobjects.size = {};
  cssobjects.size.onoff = $id('wpt_ssizeonoff').value;
  cssobjects.size.type = $id('wpt_ssizetype').value;
  cssobjects.size.height = $id('height').value;
  cssobjects.size.width = $id('width').value;
  cssobjects.padding = {};
  cssobjects.padding.onoff = $id('wpt_spadonoff').value;
  cssobjects.padding.common = $id('wpt_spaddd').value;
  cssobjects.padding.top = $id('padtop').value;
  cssobjects.padding.left = $id('padleft').value;
  cssobjects.padding.right = $id('padright').value;
  cssobjects.padding.bottom = $id('padbottom').value;
  cssobjects.margin = {};
  cssobjects.margin.onoff = $id('wpt_smargonoff').value;
  cssobjects.margin.common = $id('wpt_smargd').value;
  cssobjects.margin.top = $id('martop').value;
  cssobjects.margin.left = $id('marleft').value;
  cssobjects.margin.right = $id('marright').value;
  cssobjects.margin.bottom = $id('marbottom').value;
  cssobjects.display = {};
  cssobjects.display.onoff = $id('wpt_sdisponoff').value;
  cssobjects.display.type = $id('wpt_sdisplayt').value;
  cssobjects.background = {};
  cssobjects.background.onoff = $id('wpt_sbgonoff').value;
  cssobjects.background.alpha = $id('bgalpha').value;
  cssobjects.background.red = $id('bgred').value;
  cssobjects.background.green = $id('bggreen').value;
  cssobjects.background.blue = $id('bgblue').value;
  cssobjects.background.common = $id('wpt_sbgd').value;
  cssobjects.background.img = $id('wpt_sbackgroundimg').value;
};

getColor = function (red_id, green_id, blue_id) {
  "use strict";
  var colorred,
    colorgreen,
    colorblue;
  colorred = parseInt($id(red_id).value, 10);
  colorgreen = parseInt($id(green_id).value, 10);
  colorblue = parseInt($id(blue_id).value, 10);
  if (colorred > 255) {
    colorred = 255;
  }
  if (colorgreen > 255) {
    colorgreen = 255;
  }
  if (colorblue > 255) {
    colorblue = 255;
  }
  colorred = colorred.toString(16).toUpperCase();
  colorgreen = colorgreen.toString(16).toUpperCase();
  colorblue = colorblue.toString(16).toUpperCase();
  if (colorred.length === 1) {
    colorred = '0' + colorred;
  }
  if (colorgreen.length === 1) {
    colorgreen = '0' + colorgreen;
  }
  if (colorblue.length === 1) {
    colorblue = '0' + colorblue;
  }
  return '#' + colorred + colorgreen + colorblue;
};

buildMailtoURL = function (css) {
  "use strict";
  var encoded = encodeURI(css).replace(/%5B/g, '[').replace(/%5D/g, ']');
  return 'mailto:?body=' + encoded;
};

generate_css = function () {
  "use strict";
  var value1,
    value2,
    value3,
    value4,
    color,
    inset,
    css = '.selfCSS { \n';
  wpt_change_vars();
  //position
  if (cssobjects.position.onoff.indexOf('on') !== -1) {
    css += '  position: ' + cssobjects.position.pos + '; \n';
    css += '  top: ' + cssobjects.position.top + cssobjects.position.type + '; \n';
    css += '  left: ' + cssobjects.position.left + cssobjects.position.type + '; \n';
    css += '  right: ' + cssobjects.position.right + cssobjects.position.type + '; \n';
    css += '  bottom: ' + cssobjects.position.bottom + cssobjects.position.type + '; \n';
  }
  //size
  if (cssobjects.size.onoff.indexOf('on') !== -1) {
    if (cssobjects.size.height === '0') {
      css += '  height: auto; \n';
    } else {
      css += '  height: ' + cssobjects.size.height + cssobjects.size.type + '; \n';
    }
    if (cssobjects.size.width === '0') {
      css += '  width: auto; \n';
    } else {
      css += '  width: ' + cssobjects.size.width + cssobjects.size.type + '; \n';
    }
  }
  //padding
  if (cssobjects.padding.onoff.indexOf('on') !== -1) {
    if (cssobjects.padding.common === 'common') {
      css += '  padding: ' + cssobjects.padding.top + 'px; \n';
    } else {
      css += '  padding: ' + cssobjects.padding.top + 'px ' + cssobjects.padding.right + 'px ' + cssobjects.padding.bottom + 'px ' + cssobjects.padding.left + 'px; \n';
    }
  }
  //margin
  if (cssobjects.margin.onoff.indexOf('on') !== -1) {
    if (cssobjects.margin.top !== '-101') {
      value1 = cssobjects.margin.top + 'px ';
    } else {
      value1 = 'auto ';
    }
    if (cssobjects.margin.right !== '-101') {
      value2 = cssobjects.margin.right + 'px ';
    } else {
      value2 = 'auto ';
    }
    if (cssobjects.margin.bottom !== '-101') {
      value3 = cssobjects.margin.bottom + 'px ';
    } else {
      value3 = 'auto ';
    }
    if (cssobjects.margin.left !== '-101') {
      value4 = cssobjects.margin.left + 'px';
    } else {
      value4 = 'auto';
    }
    if (cssobjects.margin.common === 'common') {
      css += '  margin: ' + value1 + '; \n';
    } else {
      css += '  margin: ' + value1 + value2 + value3 + value4 + '; \n';
    }
  }
  //display
  if (cssobjects.display.onoff.indexOf('on') !== -1) {
    css += '  display: ' + cssobjects.display.type + '; \n';
  }
  //background
  //color
  if (cssobjects.background.onoff === 'on') {
    if (cssobjects.background.alpha !== '1') {
      css += '  background: rgba(' + cssobjects.background.red + ', ' + cssobjects.background.green + ', ' + cssobjects.background.blue + ', ' + cssobjects.background.alpha + '); \n';
    } else {
      if (cssobjects.background.common === 'common') {
        css += '  background: ' + getColor('bgred', 'bgred', 'bgred') + '; \n';
      } else {
        css += '  background: ' + getColor('bgred', 'bggreen', 'bgblue') + '; \n';
      }
    }
  }
  //image
  if (cssobjects.background.img !== 'none') {
    if (cssobjects.background.img === 'summer') {
      css += '  background-image: url(\'./summer.jpg\'); \n';
    }
    if (cssobjects.background.img === 'winter') {
      css += '  background-image: url(\'./winter.jpg\'); \n';
    }
    if (($id('bgtop').value !== '0') || ($id('bgleft').value !== '0')) {
      css += '  background-position: ' + $id('bgtop').value + $id('wpt_sbgptype').value + ' ' + $id('bgleft').value + $id('wpt_sbgptype').value + '; \n';
    }
    if (($id('bgw').value !== '0') || ($id('bgh').value !== '0')) {
      if ($id('bgw').value === '0') {
        value1 = 'auto';
      } else {
        value1 = $id('bgw').value + $id('wpt_sbgstype').value;
      }
      if ($id('bgh').value === '0') {
        value2 = 'auto';
      } else {
        value2 = $id('bgh').value + $id('wpt_sbgstype').value;
      }
      css += '  background-size: ' + value1 + ' ' + value2 + '; \n';
    }
  }
  //text
  //size
  if ($id('wpt_sfsizeonoff').value === 'on') {
    css += '  font-size: ' + $id('fsize').value + $id('wpt_sfontsizetype').value + '; \n';
  }
  //color
  if ($id('wpt_stconoff').value === 'on') {
    if ($id('wpt_stcd').value === 'common') {
      if ($id('tcalpha').value === '1') {
        css += '  color: ' + getColor('tcred', 'tcred', 'tcred') + '; \n';
      } else {
        css += '  color: rgba(' + $id('tcred').value + ', ' + $id('tcred').value + ', ' + $id('tcred').value + ', ' + $id('tcalpha').value + '); \n';
      }
    } else {
      if ($id('tcalpha').value === '1') {
        css += '  color: ' + getColor('tcred', 'tcgreen', 'tcblue') + '; \n';
      } else {
        css += '  color: rgba(' + $id('tcred').value + ', ' + $id('tcgreen').value + ', ' + $id('tcblue').value + ', ' + $id('tcalpha').value + '); \n';
      }
    }
  }
  //font
  if ($id('wpt_sfontonoff').value === 'on') {
    if ($id('wpt_sfont').value === 'Helvetica') {
      css += '  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; \n';
    } else if ($id('wpt_sfont').value === 'Lucida') {
      css += '  font-family: "Lucida Grande", "Lucida Sans Unicode", Geneva, sans-serif; \n';
    } else if ($id('wpt_sfont').value === 'Georgia') {
      css += '  font-family: Georgia, "Times New Roman", Times, serif; \n';
    } else if ($id('wpt_sfont').value === 'Menlo') {
      css += '  font-family: Menlo, Consolas, Monaco, "Lucida Console", monospace; \n';
    } else if ($id('wpt_sfont').value === 'Hoefler') {
      css += '  font-family: "Hoefler Text", Constantia, Palatino, Georgia, serif; \n';
    }
  }
  //border
  if ($id('wpt_sbtonoff').value === 'on') {
    if ($id('wpt_sbordert').value === 'common') {
      if ($id('bcalpha').value === '1') {
        css += '  border: ' + $id('bttop').value + 'px ' + getColor('bcred', 'bcgreen', 'bcblue') + ' ' + $id('wpt_sbtype').value + '; \n';
      } else {
        css += '  border: ' + $id('bttop').value + 'px rgba(' + $id('bcred').value + ', ' + $id('bcgreen').value + ', ' + $id('bcblue').value + ', ' + $id('bcalpha').value + ') ' + $id('wpt_sbtype').value + '; \n';
      }
    } else {
      css += '  border-top: ' + $id('bttop').value + 'px; \n';
      css += '  border-left: ' + $id('btleft').value + 'px; \n';
      css += '  border-right: ' + $id('btright').value + 'px; \n';
      css += '  border-bottom: ' + $id('btbottom').value + 'px; \n';
      if ($id('bcalpha').value === '1') {
        css += '  border-color: ' + getColor('bcred', 'bcgreen', 'bcblue') + '; \n';
      } else {
        css += '  border-color: rgba(' + $id('bcred').value + ', ' + $id('bcgreen').value + ', ' + $id('bcblue').value + ', ' + $id('bcalpha').value + '); \n';
      }
      css += '  border-style: ' + $id('wpt_sbtype').value + '; \n';
    }
  }
  if ($id('wpt_sbradonoff').value === 'on') {
    if ($id('wpt_sborderd').value === 'common') {
      css += '  border-radius: ' + $id('brtl').value + 'px; \n';
    } else {
      css += '  border-radius: ' + $id('brtl').value + 'px ' + $id('brtr').value + 'px ' + $id('brbr').value + 'px ' + $id('brbl').value + 'px; \n';
    }
  }
  //box-shadow
  if ($id('wpt_sbsonoff').value === 'on') {
    if ($id('wpt_sbscold').value === 'common') {
      if ($id('bsalpha').value === '1') {
        color = getColor('bsred', 'bsgreen', 'bsblue');
      } else {
        color = 'rgba(' + $id('bsred').value + ', ' + $id('bsred').value + ', ' + $id('bsred').value + ', ' + $id('bsalpha').value + ')';
      }
    } else {
      if ($id('bsalpha').value === '1') {
        color = getColor('bsred', 'bsgreen', 'bsblue');
      } else {
        color = 'rgba(' + $id('bsred').value + ', ' + $id('bsgreen').value + ', ' + $id('bsblue').value + ', ' + $id('bsalpha').value + ')';
      }
    }
    inset = '';
    if ($id('wpt_sbstype').value === 'inset') {
      inset = 'inset ';
    }
    css += '  box-shadow: ' + inset + $id('bsh').value + 'px ' + $id('bsv').value + 'px ' + $id('bsrad').value + 'px ' + $id('bssp').value + 'px ' + color + '; \n';
    css += '  -webkit-box-shadow: ' + inset + $id('bsh').value + 'px ' + $id('bsv').value + 'px ' + $id('bsrad').value + 'px ' + $id('bssp').value + 'px ' + color + '; \n';
  }
  //text-shadow
  if ($id('wpt_stsonoff').value === 'on') {
    if ($id('wpt_stscold').value === 'common') {
      if ($id('tsalpha').value === '1') {
        color = getColor('tsred', 'tsred', 'tsred');
      } else {
        color = 'rgba(' + $id('tsred').value + ', ' + $id('tsred').value + ', ' + $id('tsred').value + ', ' + $id('tsalpha').value + ')';
      }
    } else {
      if ($id('tsalpha').value === '1') {
        color = getColor('tsred', 'tsgreen', 'tsblue');
      } else {
        color = 'rgba(' + $id('tsred').value + ', ' + $id('tsgreen').value + ', ' + $id('tsblue').value + ', ' + $id('tsalpha').value + ')';
      }
    }
    css += '  text-shadow: ' + $id('tsh').value + 'px ' + $id('tsv').value + 'px ' + $id('tsrad').value + 'px ' + color + '; \n';
    css += '  filter: dropshadow(color=' + getColor('tsred', 'tsgreen', 'tsblue') + ', offx=' + $id('tsh').value + ', offy=' + $id('tsv').value + '); \n';
  }
  //Skew and Rotate
  if (($id('skewx').value !== '0') || ($id('skewy').value !== '0') || ($id('degrot').value !== '0')) {
    value1 = '';
    if ($id('skewx').value !== '0') {
      value1 += ' skewX(' + $id('skewx').value + 'deg)';
    }
    if ($id('skewy').value !== '0') {
      value1 += ' skewY(' + $id('skewy').value + 'deg)';
    }
    if ($id('degrot').value !== '0') {
      value1 += ' rotate(' + $id('degrot').value + 'deg)';
    }
    css += '  transform:' + value1 + '; \n';
    css += '  -webkit-transform:' + value1 + '; \n';
    css += '  -moz-transform:' + value1 + '; \n';
    css += '  -o-transform:' + value1 + '; \n';
  }
  //filter
  if ($id('wpt_sfilteronoff').value === 'on') {
    value1 = '';
    if ($id('fblur').value !== '0') {
      value1 += ' blur(' + $id('fblur').value + 'px)';
    }
    if ($id('fgray').value !== '0') {
      value1 += ' grayscale(' + $id('fgray').value + '%)';
    }
    if ($id('fsepia').value !== '0') {
      value1 += ' sepia(' + $id('fsepia').value + '%)';
    }
    if ($id('fbright').value !== '0') {
      value1 += ' brightness(' + $id('fbright').value + '%)';
    }
    if ($id('fcontr').value !== '100') {
      value1 += ' contrast(' + $id('fcontr').value + '%)';
    }
    if ($id('fhue').value !== '0') {
      value1 += ' hue-rotate(' + $id('fhue').value + 'deg)';
    }
    if ($id('fsat').value !== '100') {
      value1 += ' saturate(' + $id('fsat').value + '%)';
    }
    if (value1 !== '') {
      css += '  filter:' + value1 + '; \n';
      css += '  -webkit-filter:' + value1 + '; \n';
      css += '  -moz-filter:' + value1 + '; \n';
      css += '  -ms-filter:' + value1 + '; \n';
      css += '  -o-filter:' + value1 + '; \n';
    }
  }
  css += '}';
  css = css.replace(/(\s+);/, ";");
  $id('editable_style').innerHTML = css;
  $id('CSSbox').innerHTML = css;
  $id('CSStextarea').value = css;
  $id('sendCSSviaMail').innerHTML = '<a href="' + buildMailtoURL(css) + '">send CSS via Mail</a>';
  prettyPrint();
};

wpt_change_selected = function () {
  "use strict";
  var container = this.parentNode,
    selectables = container.childNodes,
    modevalue,
    nvalue,
    x;
  if (this.className.indexOf(' selected') !== -1) {
    return;
  }
  for (x = 0; x < selectables.length; x += 1) {
    if (selectables[x].className !== undefined) {
      selectables[x].className = selectables[x].className.replace(' selected', '');
    }
  }
  this.className += ' selected';
  if (container.id !== '') {
    nvalue = this.className.replace("segment", "", "gim").replace("selected", "", "gim").replace("full", "", "gim").replace("percent", "%", "gim").trim();
    $id('wpt_s' + container.id).value = nvalue;
  }
  if (this.className.indexOf('common') !== -1) {
    if (cssobjects.padding.common.indexOf('common') !== -1) {
      modevalue = cssobjects.padding.top;
      cssobjects.padding.left = modevalue;
      fdSlider.updateSlider($id('padleft').id);
      cssobjects.padding.right = modevalue;
      fdSlider.updateSlider($id('padright').id);
      cssobjects.padding.bottom = modevalue;
      fdSlider.updateSlider($id('padbottom').id);
    }
    if (cssobjects.margin.common.indexOf('common') !== -1) {
      modevalue = cssobjects.margin.top;
      cssobjects.margin.left = modevalue;
      fdSlider.updateSlider($id('marleft').id);
      cssobjects.margin.right = modevalue;
      fdSlider.updateSlider($id('marright').id);
      cssobjects.margin.bottom = modevalue;
      fdSlider.updateSlider($id('marbottom').id);
    }
    if (cssobjects.background.common.indexOf('common') !== -1) {
      modevalue = cssobjects.background.red;
      cssobjects.background.green = modevalue;
      fdSlider.updateSlider($id('bggreen').id);
      cssobjects.background.blue = modevalue;
      fdSlider.updateSlider($id('bgblue').id);
    }
    if ($id('wpt_stcd').value.indexOf('common') !== -1) {
      modevalue = $id('tcred').value;
      $id('tcgreen').value = modevalue;
      fdSlider.updateSlider($id('tcgreen').id);
      $id('tcblue').value = modevalue;
      fdSlider.updateSlider($id('tcblue').id);
    }
    if ($id('wpt_sbordert').value.indexOf('common') !== -1) {
      modevalue = $id('bttop').value;
      $id('btleft').value = modevalue;
      fdSlider.updateSlider($id('btleft').id);
      $id('btright').value = modevalue;
      fdSlider.updateSlider($id('btright').id);
      $id('btbottom').value = modevalue;
      fdSlider.updateSlider($id('btbottom').id);
    }
    if ($id('wpt_sbcd').value.indexOf('common') !== -1) {
      modevalue = $id('bcred').value;
      $id('bcgreen').value = modevalue;
      fdSlider.updateSlider($id('bcgreen').id);
      $id('bcblue').value = modevalue;
      fdSlider.updateSlider($id('bcblue').id);
    }
    if ($id('wpt_sborderd').value.indexOf('common') !== -1) {
      modevalue = $id('brtl').value;
      $id('brtr').value = modevalue;
      fdSlider.updateSlider($id('brtr').id);
      $id('brbr').value = modevalue;
      fdSlider.updateSlider($id('brbr').id);
      $id('brbl').value = modevalue;
      fdSlider.updateSlider($id('brbl').id);
    }
    if ($id('wpt_sbscold').value.indexOf('common') !== -1) {
      modevalue = $id('bsred').value;
      $id('bsgreen').value = modevalue;
      fdSlider.updateSlider($id('bsgreen').id);
      $id('bsblue').value = modevalue;
      fdSlider.updateSlider($id('bsblue').id);
    }
    if ($id('wpt_stscold').value.indexOf('common') !== -1) {
      modevalue = $id('tsred').value;
      $id('tsgreen').value = modevalue;
      fdSlider.updateSlider($id('tsgreen').id);
      $id('tsblue').value = modevalue;
      fdSlider.updateSlider($id('tsblue').id);
    }
  }
  if (this.onclick === null) {
    window.setTimeout(generate_css, 125);
  }
};

wpt_setButton = function (id, value) {
  "use strict";
  var button, status, x;
  value = value.replace("segment", "", "gim").replace("selected", "", "gim").replace("full", "", "gim").replace("percent", "%", "gim").trim();
  button = $id(id);
  for (x = 0; x < button.childNodes.length; x += 1) {
    if (button.childNodes[x].className !== undefined) {
      if (button.childNodes[x].className.indexOf(value) !== -1) {
        status = 1;
        if (button.childNodes[x].className.indexOf(' selected') !== -1) {
          return 0;
        }
      }
    }
  }
  if (status === 1) {
    for (x = 0; x < button.childNodes.length; x += 1) {
      if (button.childNodes[x].className !== undefined) {
        button.childNodes[x].className = button.childNodes[x].className.replace(' selected', '');
        if (button.childNodes[x].className.indexOf(value) !== -1) {
          button.childNodes[x].className += ' selected';
        }
      }
    }
    $id('wpt_s' + id).value = value;
    return 1;
  }
  return -1;
};

wpt_slider_changed = function (value, menu) {
  "use strict";
  var modemenu = menu.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].id,
    modesubmenu = menu.parentNode.parentNode.parentNode.childNodes[1].innerHTML,
    modevalue = value;

  ischanging += 1;
  if ((initialized === true) && (ischanging < 3)) {
    if ((menu.parentNode.parentNode.parentNode.childNodes[0].innerHTML === 'Background:') || (menu.parentNode.parentNode.parentNode.childNodes[1].innerHTML === 'Background:')) {
      $id('box').style.background = getColor('bgslider', 'bgslider', 'bgslider');
      ischanging -= 1;
      return false;
    }
    switch (modemenu) {
    case "Main-Padding":
      if ($id('wpt_spaddd').value.indexOf('common') !== -1) {
        if (modevalue !== $id('padtop').value) {
          $id('padtop').value = modevalue;
          fdSlider.updateSlider($id('padtop').id);
        }
        if (modevalue !== $id('padleft').value) {
          $id('padleft').value = modevalue;
          fdSlider.updateSlider($id('padleft').id);
        }
        if (modevalue !== $id('padright').value) {
          $id('padright').value = modevalue;
          fdSlider.updateSlider($id('padright').id);
        }
        if (modevalue !== $id('padbottom').value) {
          $id('padbottom').value = modevalue;
          fdSlider.updateSlider($id('padbottom').id);
        }
      }
      break;
    case "Main-Margin":
      if ($id('wpt_smargd').value.indexOf('common') !== -1) {
        if (modevalue !== $id('martop').value) {
          $id('martop').value = modevalue;
          fdSlider.updateSlider($id('martop').id);
        }
        if (modevalue !== $id('marleft').value) {
          $id('marleft').value = modevalue;
          fdSlider.updateSlider($id('marleft').id);
        }
        if (modevalue !== $id('marright').value) {
          $id('marright').value = modevalue;
          fdSlider.updateSlider($id('marright').id);
        }
        if (modevalue !== $id('marbottom').value) {
          $id('marbottom').value = modevalue;
          fdSlider.updateSlider($id('marbottom').id);
        }
      }
      break;
    case "Background-Color":
      if (($id('wpt_sbgd').value.indexOf('common') !== -1) && (modesubmenu !== 'Opacity:')) {
        if (modevalue !== $id('bgred').value) {
          $id('bgred').value = modevalue;
          fdSlider.updateSlider($id('bgred').id);
        }
        if (modevalue !== $id('bggreen').value) {
          $id('bggreen').value = modevalue;
          fdSlider.updateSlider($id('bggreen').id);
        }
        if (modevalue !== $id('bgblue').value) {
          $id('bgblue').value = modevalue;
          fdSlider.updateSlider($id('bgblue').id);
        }
      }
      break;
    case "Text-Color":
      if (($id('wpt_stcd').value.indexOf('common') !== -1) && (modesubmenu !== 'Opacity:')) {
        if (modevalue !== $id('tcred').value) {
          $id('tcred').value = modevalue;
          fdSlider.updateSlider($id('tcred').id);
        }
        if (modevalue !== $id('tcgreen').value) {
          $id('tcgreen').value = modevalue;
          fdSlider.updateSlider($id('tcgreen').id);
        }
        if (modevalue !== $id('tcblue').value) {
          $id('tcblue').value = modevalue;
          fdSlider.updateSlider($id('tcblue').id);
        }
      }
      break;
    case "Border-Thickness":
      if ($id('wpt_sbordert').value.indexOf('common') !== -1) {
        if (modevalue !== $id('bttop').value) {
          $id('bttop').value = modevalue;
          fdSlider.updateSlider($id('bttop').id);
        }
        if (modevalue !== $id('btleft').value) {
          $id('btleft').value = modevalue;
          fdSlider.updateSlider($id('btleft').id);
        }
        if (modevalue !== $id('btright').value) {
          $id('btright').value = modevalue;
          fdSlider.updateSlider($id('btright').id);
        }
        if (modevalue !== $id('btbottom').value) {
          $id('btbottom').value = modevalue;
          fdSlider.updateSlider($id('btbottom').id);
        }
      }
      break;
    case "Border-Color":
      if ($id('wpt_sbcd').value.indexOf('common') !== -1) {
        if (modevalue !== $id('bcred').value) {
          $id('bcred').value = modevalue;
          fdSlider.updateSlider($id('bcred').id);
        }
        if (modevalue !== $id('bcgreen').value) {
          $id('bcgreen').value = modevalue;
          fdSlider.updateSlider($id('bcgreen').id);
        }
        if (modevalue !== $id('bcblue').value) {
          $id('bcblue').value = modevalue;
          fdSlider.updateSlider($id('bcblue').id);
        }
      }
      break;
    case "Border-Radius":
      if ($id('wpt_sborderd').value.indexOf('common') !== -1) {
        if (modevalue !== $id('brtl').value) {
          $id('brtl').value = modevalue;
          fdSlider.updateSlider($id('brtl').id);
        }
        if (modevalue !== $id('brtr').value) {
          $id('brtr').value = modevalue;
          fdSlider.updateSlider($id('brtr').id);
        }
        if (modevalue !== $id('brbr').value) {
          $id('brbr').value = modevalue;
          fdSlider.updateSlider($id('brbr').id);
        }
        if (modevalue !== $id('brbl').value) {
          $id('brbl').value = modevalue;
          fdSlider.updateSlider($id('brbl').id);
        }
      }
      break;
    case "BS-Color":
      if (($id('wpt_sbscold').value.indexOf('common') !== -1) && (modesubmenu !== 'Opacity:')) {
        if (modevalue !== $id('bsred').value) {
          $id('bsred').value = modevalue;
          fdSlider.updateSlider($id('bsred').id);
        }
        if (modevalue !== $id('bsgreen').value) {
          $id('bsgreen').value = modevalue;
          fdSlider.updateSlider($id('bsgreen').id);
        }
        if (modevalue !== $id('bsblue').value) {
          $id('bsblue').value = modevalue;
          fdSlider.updateSlider($id('bsblue').id);
        }
      }
      break;
    case "TS-Color":
      if (($id('wpt_stscold').value.indexOf('common') !== -1) && (modesubmenu !== 'Opacity:')) {
        if (modevalue !== $id('tsred').value) {
          $id('tsred').value = modevalue;
          fdSlider.updateSlider($id('tsred').id);
        }
        if (modevalue !== $id('tsgreen').value) {
          $id('tsgreen').value = modevalue;
          fdSlider.updateSlider($id('tsgreen').id);
        }
        if (modevalue !== $id('tsblue').value) {
          $id('tsblue').value = modevalue;
          fdSlider.updateSlider($id('tsblue').id);
        }
      }
      break;
    default:
      break;
    }
  }
  ischanging -= 1;
  window.setTimeout(generate_css, 125);
};

CSStextarea = function () {
  "use strict";
  $id('editable_style').innerHTML = $id('CSStextarea').value;
  $id('CSSbox').innerHTML = css;
  $id('sendCSSviaMail').innerHTML = '<a href="' + buildMailtoURL(css) + '">send CSS via Mail</a>';
  prettyPrint();
};

loadExample = function (demo) {
  "use strict";
  $id('HTMLedit').value = $id('demo_' + demo).innerHTML;
  $id('editorView').innerHTML = $id('demo_' + demo).innerHTML;
};

loadCSSexample = function (demo) {
  "use strict";
  if (demo === 'imgs') {
    wpt_expand_all();
    loadCSSexample('clear');
    wpt_setButton('backgroundimg', 'summer');
    wpt_setButton('sizeonoff', 'on');
    $id('width').value = 440;
    fdSlider.updateSlider('width');
    $id('height').value = 535;
    fdSlider.updateSlider('height');
    wpt_setButton('margonoff', 'on');
    $id('martop').value = 50;
    fdSlider.updateSlider($id('martop').id);
    $id('marleft').value = -101;
    fdSlider.updateSlider($id('marleft').id);
    $id('marright').value = -101;
    fdSlider.updateSlider($id('marright').id);
    wpt_setButton('bsonoff', 'on');
    wpt_setButton('bstype', 'inset');
    $id('bsred').value = 255;
    fdSlider.updateSlider($id('bsred').id);
    $id('bsgreen').value = 255;
    fdSlider.updateSlider($id('bsgreen').id);
    $id('bsblue').value = 255;
    fdSlider.updateSlider($id('bsblue').id);
    $id('bsalpha').value = 1;
    fdSlider.updateSlider($id('bsalpha').id);
    $id('bsrad').value = 25;
    fdSlider.updateSlider($id('bsrad').id);
    $id('bssp').value = 10;
    fdSlider.updateSlider($id('bssp').id);
    $id('degrot').value = 6;
    fdSlider.updateSlider($id('degrot').id);
    wpt_setButton('filteronoff', 'on');
    wpt_collapse_all();
  } else if (demo === 'imgw') {
    wpt_expand_all();
    loadCSSexample('clear');
    wpt_setButton('backgroundimg', 'winter');
    wpt_setButton('sizeonoff', 'on');
    $id('width').value = 440;
    fdSlider.updateSlider('width');
    $id('height').value = 535;
    fdSlider.updateSlider('height');
    wpt_setButton('margonoff', 'on');
    $id('martop').value = 50;
    fdSlider.updateSlider($id('martop').id);
    $id('marleft').value = -101;
    fdSlider.updateSlider($id('marleft').id);
    $id('marright').value = -101;
    fdSlider.updateSlider($id('marright').id);
    wpt_setButton('bsonoff', 'on');
    wpt_setButton('bstype', 'outside');
    $id('bsred').value = 255;
    fdSlider.updateSlider($id('bsred').id);
    $id('bsgreen').value = 255;
    fdSlider.updateSlider($id('bsgreen').id);
    $id('bsblue').value = 255;
    fdSlider.updateSlider($id('bsblue').id);
    $id('bsalpha').value = 1;
    fdSlider.updateSlider($id('bsalpha').id);
    $id('bsrad').value = 25;
    fdSlider.updateSlider($id('bsrad').id);
    $id('bssp').value = -6;
    fdSlider.updateSlider($id('bssp').id);
    $id('degrot').value = -8;
    fdSlider.updateSlider($id('degrot').id);
    wpt_setButton('filteronoff', 'on');
    $id('fsepia').value = 30;
    fdSlider.updateSlider($id('fsepia').id);
    $id('fbright').value = 100;
    fdSlider.updateSlider($id('fbright').id);
    $id('fsat').value = 60;
    fdSlider.updateSlider($id('fsat').id);
    wpt_collapse_all();
  } else if (demo === 'text') {
    wpt_expand_all();
    loadCSSexample('clear');
    loadExample('lorem');
    wpt_setButton('sizeonoff', 'on');
    $id('width').value = 440;
    fdSlider.updateSlider('width');
    $id('height').value = 0;
    fdSlider.updateSlider('height');
    wpt_setButton('padonoff', 'on');
    $id('padtop').value = 15;
    fdSlider.updateSlider($id('padtop').id);
    $id('padleft').value = 15;
    fdSlider.updateSlider($id('padleft').id);
    $id('padright').value = 15;
    fdSlider.updateSlider($id('padright').id);
    $id('padbottom').value = 15;
    fdSlider.updateSlider($id('padbottom').id);
    wpt_setButton('margonoff', 'on');
    $id('marleft').value = -101;
    fdSlider.updateSlider($id('marleft').id);
    $id('marright').value = -101;
    fdSlider.updateSlider($id('marright').id);
    wpt_setButton('disponoff', 'on');
    wpt_setButton('bgonoff', 'on');
    wpt_setButton('tconoff', 'on');
    wpt_collapse_all();
  } else if (demo === 'list') {
    wpt_expand_all();
    loadCSSexample('clear');
    loadExample('list');
    wpt_setButton('sizeonoff', 'on');
    $id('width').value = 440;
    fdSlider.updateSlider('width');
    $id('height').value = 0;
    fdSlider.updateSlider('height');
    wpt_setButton('padonoff', 'on');
    $id('padtop').value = 15;
    fdSlider.updateSlider($id('padtop').id);
    $id('padleft').value = 15;
    fdSlider.updateSlider($id('padleft').id);
    $id('padright').value = 15;
    fdSlider.updateSlider($id('padright').id);
    $id('padbottom').value = 15;
    fdSlider.updateSlider($id('padbottom').id);
    wpt_collapse_all();
  } else if (demo === 'clear') {
    loadExample('div');
    //Main
    //Position
    wpt_setButton('posonoff', 'off');
    wpt_setButton('postype1', 'relative');
    wpt_setButton('postype2', 'px');
    $id('postop').value = 0;
    fdSlider.updateSlider('postop');
    $id('posleft').value = 0;
    fdSlider.updateSlider('posleft');
    $id('posright').value = 0;
    fdSlider.updateSlider('posright');
    $id('posbottom').value = 0;
    fdSlider.updateSlider('posbottom');
    //Size
    wpt_setButton('sizeonoff', 'off');
    wpt_setButton('sizetype', 'px');
    $id('width').value = 0;
    fdSlider.updateSlider('width');
    $id('height').value = 0;
    fdSlider.updateSlider('height');
    //Padding
    wpt_setButton('padonoff', 'off');
    if (wpt_setButton('paddd', 'separate') === 1) {
      $id('paddd').parentNode.parentNode.style.height = (parseInt($id('paddd').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('paddd').parentNode.parentNode.firstChild.id] = parseInt($id('paddd').parentNode.parentNode.style.height, 10);
    }
    $id('padtop').value = 0;
    fdSlider.updateSlider($id('padtop').id);
    $id('padleft').value = 0;
    fdSlider.updateSlider($id('padleft').id);
    $id('padright').value = 0;
    fdSlider.updateSlider($id('padright').id);
    $id('padbottom').value = 0;
    fdSlider.updateSlider($id('padbottom').id);
    //Margin
    wpt_setButton('margonoff', 'off');
    if (wpt_setButton('margd', 'separate') === 1) {
      $id('margd').parentNode.parentNode.style.height = (parseInt($id('margd').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('margd').parentNode.parentNode.firstChild.id] = parseInt($id('margd').parentNode.parentNode.style.height, 10);
    }
    $id('martop').value = 0;
    fdSlider.updateSlider($id('martop').id);
    $id('marleft').value = 0;
    fdSlider.updateSlider($id('marleft').id);
    $id('marright').value = 0;
    fdSlider.updateSlider($id('marright').id);
    $id('marbottom').value = 0;
    fdSlider.updateSlider($id('marbottom').id);
    //Display
    wpt_setButton('disponoff', 'off');
    wpt_setButton('displayt', 'block');
    //Background
    //Color
    wpt_setButton('bgonoff', 'off');
    if (wpt_setButton('bgd', 'separate') === 1) {
      $id('bgd').parentNode.parentNode.style.height = (parseInt($id('bgd').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('bgd').parentNode.parentNode.firstChild.id] = parseInt($id('bgd').parentNode.parentNode.style.height, 10);
    }
    $id('bgred').value = 255;
    fdSlider.updateSlider($id('bgred').id);
    $id('bggreen').value = 255;
    fdSlider.updateSlider($id('bggreen').id);
    $id('bgblue').value = 255;
    fdSlider.updateSlider($id('bgblue').id);
    $id('bgalpha').value = 1;
    fdSlider.updateSlider($id('bgalpha').id);
    //Image
    wpt_setButton('backgroundimg', 'none');
    wpt_setButton('bgstype', 'px');
    $id('bgw').value = 0;
    fdSlider.updateSlider($id('bgw').id);
    $id('bgh').value = 0;
    fdSlider.updateSlider($id('bgh').id);
    //Position
    wpt_setButton('bgptype', 'px');
    $id('bgtop').value = 0;
    fdSlider.updateSlider($id('bgtop').id);
    $id('bgleft').value = 0;
    fdSlider.updateSlider($id('bgleft').id);
    //Text
    //Size
    wpt_setButton('fsizeonoff', 'off');
    wpt_setButton('fontsizetype', 'px');
    $id('fsize').value = 20;
    fdSlider.updateSlider($id('fsize').id);
    //Color
    wpt_setButton('tconoff', 'off');
    $id('tcred').value = 0;
    fdSlider.updateSlider($id('tcred').id);
    $id('tcgreen').value = 0;
    fdSlider.updateSlider($id('tcgreen').id);
    $id('tcblue').value = 0;
    fdSlider.updateSlider($id('tcblue').id);
    //Font
    wpt_setButton('fontonoff', 'off');
    wpt_setButton('font', 'Helvetica');
    //Thickness
    wpt_setButton('btonoff', 'off');
    if (wpt_setButton('bordert', 'separate') === 1) {
      $id('bordert').parentNode.parentNode.style.height = (parseInt($id('bordert').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('bordert').parentNode.parentNode.firstChild.id] = parseInt($id('bordert').parentNode.parentNode.style.height, 10);
    }
    $id('bttop').value = 1;
    fdSlider.updateSlider($id('bttop').id);
    $id('btleft').value = 1;
    fdSlider.updateSlider($id('btleft').id);
    $id('btright').value = 1;
    fdSlider.updateSlider($id('btright').id);
    $id('btbottom').value = 1;
    fdSlider.updateSlider($id('btbottom').id);
    //Color
    $id('bcred').value = 0;
    fdSlider.updateSlider($id('bcred').id);
    $id('bcgreen').value = 0;
    fdSlider.updateSlider($id('bcgreen').id);
    $id('bcblue').value = 0;
    fdSlider.updateSlider($id('bcblue').id);
    //Type
    wpt_setButton('btype', 'solid');
    //Radius
    wpt_setButton('bradonoff', 'off');
    if (wpt_setButton('borderd', 'separate') === 1) {
      $id('borderd').parentNode.parentNode.style.height = (parseInt($id('borderd').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('borderd').parentNode.parentNode.firstChild.id] = parseInt($id('borderd').parentNode.parentNode.style.height, 10);
    }
    $id('brtl').value = 0;
    fdSlider.updateSlider($id('brtl').id);
    $id('brtr').value = 0;
    fdSlider.updateSlider($id('brtr').id);
    $id('brbr').value = 0;
    fdSlider.updateSlider($id('brbr').id);
    $id('brbl').value = 0;
    fdSlider.updateSlider($id('brbl').id);
    //Box-Shadow
    //Position
    wpt_setButton('bsonoff', 'off');
    wpt_setButton('bstype', 'outside');
    $id('bsh').value = 0;
    fdSlider.updateSlider($id('bsh').id);
    $id('bsv').value = 0;
    fdSlider.updateSlider($id('bsv').id);
    //Color
    if (wpt_setButton('bscold', 'separate') === 1) {
      $id('bscold').parentNode.parentNode.style.height = (parseInt($id('bscold').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('bscold').parentNode.parentNode.firstChild.id] = parseInt($id('bscold').parentNode.parentNode.style.height, 10);
    }
    $id('bsred').value = 0;
    fdSlider.updateSlider($id('bsred').id);
    $id('bsgreen').value = 0;
    fdSlider.updateSlider($id('bsgreen').id);
    $id('bsblue').value = 0;
    fdSlider.updateSlider($id('bsblue').id);
    $id('bsalpha').value = 1;
    fdSlider.updateSlider($id('bsalpha').id);
    //Blur
    $id('bsrad').value = 0;
    fdSlider.updateSlider($id('bsrad').id);
    $id('bssp').value = 0;
    fdSlider.updateSlider($id('bssp').id);
    //Text-Shadow
    //Position
    wpt_setButton('tsonoff', 'off');
    $id('tsh').value = 0;
    fdSlider.updateSlider($id('tsh').id);
    $id('tsv').value = 0;
    fdSlider.updateSlider($id('tsv').id);
    //Color
    if (wpt_setButton('tscold', 'separate') === 1) {
      $id('tscold').parentNode.parentNode.style.height = (parseInt($id('tscold').parentNode.parentNode.style.height, 10) + 110) + 'px';
      wpt_menu_items_height[$id('tscold').parentNode.parentNode.firstChild.id] = parseInt($id('tscold').parentNode.parentNode.style.height, 10);
    }
    $id('tsred').value = 0;
    fdSlider.updateSlider($id('tsred').id);
    $id('tsgreen').value = 0;
    fdSlider.updateSlider($id('tsgreen').id);
    $id('tsblue').value = 0;
    fdSlider.updateSlider($id('tsblue').id);
    $id('tsalpha').value = 1;
    fdSlider.updateSlider($id('tsalpha').id);
    //Blur
    $id('tsrad').value = 0;
    fdSlider.updateSlider($id('tsrad').id);
    //Special
    //Skew
    $id('skewx').value = 0;
    fdSlider.updateSlider($id('skewx').id);
    $id('skewy').value = 0;
    fdSlider.updateSlider($id('skewy').id);
    //Rotate
    $id('degrot').value = 0;
    fdSlider.updateSlider($id('degrot').id);
    //Filter
    wpt_setButton('filteronoff', 'off');
    $id('fblur').value = 0;
    fdSlider.updateSlider($id('fblur').id);
    $id('fgray').value = 0;
    fdSlider.updateSlider($id('fgray').id);
    $id('fsepia').value = 0;
    fdSlider.updateSlider($id('fsepia').id);
    $id('fbright').value = 0;
    fdSlider.updateSlider($id('fbright').id);
    $id('fhue').value = 0;
    fdSlider.updateSlider($id('fhue').id);
    $id('fsat').value = 100;
    fdSlider.updateSlider($id('fsat').id);
    $id('fcontr').value = 100;
    fdSlider.updateSlider($id('fcontr').id);
  } else {
    wpt_expand_all();
    loadCSSexample('clear');
    wpt_collapse_all();
  }
  window.setTimeout(generate_css, 125);
};

editor_show = function (mode) {
  "use strict";
  $id('editorCSS').style.display = 'none';
  $id('editorHTML').style.display = 'none';
  $id('editorView').style.display = 'none';
  $id('editor' + mode).style.display = 'block';
};

editCSS = function (mode) {
  "use strict";
  if (mode === 'on') {
    $id('CSSbox').style.display = 'none';
    $id('editCSSbutton').style.display = 'none';
    $id('CSStextarea').style.display = 'block';
    $id('showCSSbutton').style.display = 'inline-block';
  } else {
    $id('CSSbox').style.display = 'block';
    $id('editCSSbutton').style.display = 'inline-block';
    $id('CSStextarea').style.display = 'none';
    $id('showCSSbutton').style.display = 'none';
  }
};
