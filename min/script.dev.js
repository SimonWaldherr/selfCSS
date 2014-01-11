/*jslint browser: true, indent: 2 */
/*global $id, window, wpt_change_selected, wpt_device_specific, wpt_fullscreen, wpt_init, wpt_init_fd_slider, wpt_init_select, wpt_setButton, wpt_set_device_type, wpt_save_items_height, wpt_collapse_all, wpt_fold_toggle, wpt_keyset, wpt_keyrelease, insert_sm, loadCSSexample, ptr_init, fdSlider, prettyPrint */



function $id(id) {
  "use strict";
  return document.getElementById(id);
}

var wpt_device_type = false,
  wpt_shift_key_status = false,
  initialized = false,
  cssobjects = {},
  wpt_menu_items_height = [],
  ischanging = 1,
  css;

function wpt_init() {
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
}

function wpt_set_device_type() {
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
}

function wpt_fullscreen() {
  "use strict";
  var element = document.body;
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function wpt_keyset(evt) {
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
}

function wpt_keyrelease(evt) {
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
}

function wpt_dialog(id) {
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
}

function wpt_fold_in(e) {
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
}

function wpt_fold_out(e) {
  "use strict";
  if (!wpt_shift_key_status) {
    wpt_collapse_all();
  }
  e.className += ' active';
  e.style.height = wpt_menu_items_height[e.firstChild.id] + 'px';
  if (e.firstChild.nextSibling.nextSibling.className === 'wpt_contents') {
    e.firstChild.nextSibling.nextSibling.style.display = 'block';
  }
}

function wpt_fold_toggle() {
  "use strict";
  var prev_className = this.parentNode.className;
  if (prev_className !== undefined) {
    if (prev_className.search("active") !== -1) {
      wpt_fold_in(this.parentNode);
    } else {
      wpt_fold_out(this.parentNode);
    }
  }
}

function wpt_collapse_all() {
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
}

function wpt_expand_all() {
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
}

function wpt_expand_enabled() {
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
}

function wpt_save_items_height() {
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
}

function wpt_init_fd_slider() {
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
}

function wpt_init_select() {
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
}

function wpt_device_specific() {
  "use strict";
  if (wpt_device_type === 'desktop') {
    $id('special_style').innerHTML = '.fd-slider-handle:before,.fd-slider-handle:after{content:"";opacity:0;-webkit-transition-property:all;-moz-transition-property:all;-ms-transition-property:all;-o-transition-property:all;transition-property:all;-webkit-transition-duration:0.3s;-moz-transition-duration:0.3s;-ms-transition-duration:0.3s;-o-transition-duration:0.3s;transition-duration:0.3s;-webkit-transition-delay:0.2s;-moz-transition-delay:0.2s;-ms-transition-delay:0.2s;-o-transition-delay:0.2s;transition-delay:0.2s;}.fd-slider-handle::before{display:block;position:absolute;top:-30px;left:-15px;margin:0px;margin-top:8px;width:50px;padding:1px;height:14px;line-height:12px;font-size:10px;text-shadow:0 1px 0 black;color:white;background:#222;z-index:1;content:attr(aria-valuetext);-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 0 4px #AAA;-moz-box-shadow:0 0 4px #aaa;box-shadow:0 0 4px #AAA;}.fd-slider-handle:after{outline:none;content:"";display:block;position:absolute;top:-14px;left:50%;margin:0 0 0 -5px;background:#222;z-index:2;width:10px;height:10px;overflow:hidden;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);-webkit-box-shadow:0 0 4px #aaa;-moz-box-shadow:0 0 4px #aaa;box-shadow:0 0 4px #aaa;clip:rect(4px,14px,14px,4px);}.fd-slider-focused .fd-slider-handle:before,.fd-slider-hover .fd-slider-handle:before,.fd-slider-active .fd-slider-handle:before{top:-25px;opacity:1;}.fd-slider-focused .fd-slider-handle:after,.fd-slider-hover .fd-slider-handle:after,.fd-slider-active .fd-slider-handle:after{top:-9px;opacity:1;}.oldie .fd-slider-handle:before,.oldie .fd-slider-handle:after{display:none;}';
  }
}

function wpt_change_vars() {
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
}

function getColor(red_id, green_id, blue_id) {
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
}

function buildMailtoURL(css) {
  "use strict";
  var encoded = encodeURI(css).replace(/%5B/g, '[').replace(/%5D/g, ']');
  return 'mailto:?body=' + encoded;
}

function generate_css() {
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
}

function wpt_change_selected() {
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
}

function wpt_setButton(id, value) {
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
}

function wpt_slider_changed(value, menu) {
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
}

function CSStextarea() {
  "use strict";
  $id('editable_style').innerHTML = $id('CSStextarea').value;
  $id('CSSbox').innerHTML = css;
  $id('sendCSSviaMail').innerHTML = '<a href="' + buildMailtoURL(css) + '">send CSS via Mail</a>';
  prettyPrint();
}

function loadExample(demo) {
  "use strict";
  $id('HTMLedit').value = $id('demo_' + demo).innerHTML;
  $id('editorView').innerHTML = $id('demo_' + demo).innerHTML;
}

function loadCSSexample(demo) {
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
    $id('fsepia').value = 100;
    fdSlider.updateSlider($id('fsepia').id);
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
}

function editor_show(mode) {
  "use strict";
  $id('editorCSS').style.display = 'none';
  $id('editorHTML').style.display = 'none';
  $id('editorView').style.display = 'none';
  $id('editor' + mode).style.display = 'block';
}

function editCSS(mode) {
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
}

/*!
 * Add to Homescreen v2.0.11 ~ Copyright (c) 2013 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var addToHome = (function (w) {
	var nav = w.navigator,
		isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
		isIPad,
		isRetina,
		isSafari,
		isStandalone,
		OSVersion,
		startX = 0,
		startY = 0,
		lastVisit = 0,
		isExpired,
		isSessionActive,
		isReturningVisitor,
		balloon,
		overrideChecks,

		positionInterval,
		closeTimeout,

		options = {
			autostart: true,			// Automatically open the balloon
			returningVisitor: false,	// Show the balloon to returning visitors only (setting this to true is highly recommended)
			animationIn: 'drop',		// drop || bubble || fade
			animationOut: 'fade',		// drop || bubble || fade
			startDelay: 2000,			// 2 seconds from page load before the balloon appears
			lifespan: 15000,			// 15 seconds before it is automatically destroyed
			bottomOffset: 14,			// Distance of the balloon from bottom
			expire: 0,					// Minutes to wait before showing the popup again (0 = always displayed)
			message: '',				// Customize your message or force a language ('' = automatic)
			touchIcon: false,			// Display the touch icon
			arrow: true,				// Display the balloon arrow
			hookOnLoad: true,			// Should we hook to onload event? (really advanced usage)
			closeButton: true,			// Let the user close the balloon
			iterations: 100				// Internal/debug use
		},

		intl = {
			ar:    '<span dir="rtl">قم بتثبيت هذا التطبيق على <span dir="ltr">%device:</span>انقر<span dir="ltr">%icon</span> ،<strong>ثم اضفه الى الشاشة الرئيسية.</strong></span>',
			ca_es: 'Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d\'inici</strong>.',
			cs_cz: 'Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.',
			da_dk: 'Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
			de_de: 'Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.',
			el_gr: 'Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.',
			en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
			es_es: 'Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.',
			fi_fi: 'Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.',
			fr_fr: 'Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l\'écran d\'accueil</strong>.',
			he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
			hr_hr: 'Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.',
			hu_hu: 'Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.',
			it_it: 'Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.',
			ja_jp: 'このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。',
			ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
			nb_no: 'Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>',
			nl_nl: 'Installeer deze webapp op uw %device: tik %icon en dan <strong>Voeg toe aan beginscherm</strong>.',
			pl_pl: 'Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.',
			pt_br: 'Instale este aplicativo em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.',
			pt_pt: 'Para instalar esta aplicação no seu %device, prima o %icon e depois em <strong>Adicionar ao ecrã principal</strong>.',
			ru_ru: 'Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.',
			sv_se: 'Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
			th_th: 'ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>',
			tr_tr: 'Bu uygulamayı %device\'a eklemek için %icon simgesine sonrasında <strong>Ana Ekrana Ekle</strong> düğmesine basın.',
			uk_ua: 'Встановіть цей веб сайт на Ваш %device: натисніть %icon, а потім <strong>На початковий екран</strong>.',
			zh_cn: '您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。',
			zh_tw: '您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。'
		};

	function init () {
		// Preliminary check, all further checks are performed on iDevices only
		if ( !isIDevice ) return;

		var now = Date.now(),
			i;

		// Merge local with global options
		if ( w.addToHomeConfig ) {
			for ( i in w.addToHomeConfig ) {
				options[i] = w.addToHomeConfig[i];
			}
		}
		if ( !options.autostart ) options.hookOnLoad = false;

		isIPad = (/ipad/gi).test(nav.platform);
		isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
		isSafari = (/Safari/i).test(nav.appVersion) && !(/CriOS/i).test(nav.appVersion);
		isStandalone = nav.standalone;
		OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
		OSVersion = OSVersion && OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;

		lastVisit = +w.localStorage.getItem('addToHome');

		isSessionActive = w.sessionStorage.getItem('addToHomeSession');
		isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28*24*60*60*1000 > now : true;

		if ( !lastVisit ) lastVisit = now;

		// If it is expired we need to reissue a new balloon
		isExpired = isReturningVisitor && lastVisit <= now;

		if ( options.hookOnLoad ) w.addEventListener('load', loaded, false);
		else if ( !options.hookOnLoad && options.autostart ) loaded();
	}

	function loaded () {
		w.removeEventListener('load', loaded, false);

		if ( !isReturningVisitor ) w.localStorage.setItem('addToHome', Date.now());
		else if ( options.expire && isExpired ) w.localStorage.setItem('addToHome', Date.now() + options.expire * 60000);

		if ( !overrideChecks && ( !isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor ) ) return;

		var touchIcon = '',
			platform = nav.platform.split(' ')[0],
			language = nav.language.replace('-', '_');

		balloon = document.createElement('div');
		balloon.id = 'addToHomeScreen';
		balloon.style.cssText += 'left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:' + (OSVersion < 5 ? 'absolute' : 'fixed');

		// Localize message
		if ( options.message in intl ) {		// You may force a language despite the user's locale
			language = options.message;
			options.message = '';
		}
		if ( options.message === '' ) {			// We look for a suitable language (defaulted to en_us)
			options.message = language in intl ? intl[language] : intl['en_us'];
		}

		if ( options.touchIcon ) {
			touchIcon = isRetina ?
				document.querySelector('head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon]') :
				document.querySelector('head link[rel^=apple-touch-icon][sizes="57x57"],head link[rel^=apple-touch-icon]');

			if ( touchIcon ) {
				touchIcon = '<span style="background-image:url(' + touchIcon.href + ')" class="addToHomeTouchIcon"></span>';
			}
		}

		balloon.className = (OSVersion >=7 ? 'addToHomeIOS7 ' : '') + (isIPad ? 'addToHomeIpad' : 'addToHomeIphone') + (touchIcon ? ' addToHomeWide' : '');
		balloon.innerHTML = touchIcon +
			options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') +
			(options.arrow ? '<span class="addToHomeArrow"' + (OSVersion >= 7 && isIPad && touchIcon ? ' style="margin-left:-32px"' : '') + '></span>' : '') +
			(options.closeButton ? '<span class="addToHomeClose">\u00D7</span>' : '');

		document.body.appendChild(balloon);

		// Add the close action
		if ( options.closeButton ) balloon.addEventListener('click', clicked, false);

		if ( !isIPad && OSVersion >= 6 ) window.addEventListener('orientationchange', orientationCheck, false);

		setTimeout(show, options.startDelay);
	}

	function show () {
		var duration,
			iPadXShift = 208;

		// Set the initial position
		if ( isIPad ) {
			if ( OSVersion < 5 ) {
				startY = w.scrollY;
				startX = w.scrollX;
			} else if ( OSVersion < 6 ) {
				iPadXShift = 160;
			} else if ( OSVersion >= 7 ) {
				iPadXShift = 143;
			}

			balloon.style.top = startY + options.bottomOffset + 'px';
			balloon.style.left = Math.max(startX + iPadXShift - Math.round(balloon.offsetWidth / 2), 9) + 'px';

			switch ( options.animationIn ) {
				case 'drop':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.opacity = '0';
					balloon.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		} else {
			startY = w.innerHeight + w.scrollY;

			if ( OSVersion < 5 ) {
				startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
				balloon.style.left = startX + 'px';
				balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + 'px';
			} else {
				balloon.style.left = '50%';
				balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 && OSVersion < 7 ? 40 : 0 ) + 'px';
				balloon.style.bottom = options.bottomOffset + 'px';
			}

			switch (options.animationIn) {
				case 'drop':
					duration = '1s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + (balloon.offsetHeight + options.bottomOffset + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		}

		balloon.offsetHeight;	// repaint trick
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.opacity = '1';
		balloon.style.webkitTransform = 'translate3d(0,0,0)';
		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);

		closeTimeout = setTimeout(close, options.lifespan);
	}

	function manualShow (override) {
		if ( !isIDevice || balloon ) return;

		overrideChecks = override;
		loaded();
	}

	function close () {
		clearInterval( positionInterval );
		clearTimeout( closeTimeout );
		closeTimeout = null;

		// check if the popup is displayed and prevent errors
		if ( !balloon ) return;

		var posY = 0,
			posX = 0,
			opacity = '1',
			duration = '0';

		if ( options.closeButton ) balloon.removeEventListener('click', clicked, false);
		if ( !isIPad && OSVersion >= 6 ) window.removeEventListener('orientationchange', orientationCheck, false);

		if ( OSVersion < 5 ) {
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth)/2) - startX;
		}

		balloon.style.webkitTransitionProperty = '-webkit-transform,opacity';

		switch ( options.animationOut ) {
			case 'drop':
				if ( isIPad ) {
					duration = '0.4s';
					opacity = '0';
					posY += 50;
				} else {
					duration = '0.6s';
					posY += balloon.offsetHeight + options.bottomOffset + 50;
				}
				break;
			case 'bubble':
				if ( isIPad ) {
					duration = '0.8s';
					posY -= balloon.offsetHeight + options.bottomOffset + 50;
				} else {
					duration = '0.4s';
					opacity = '0';
					posY -= 50;
				}
				break;
			default:
				duration = '0.8s';
				opacity = '0';
		}

		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);
		balloon.style.opacity = opacity;
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}


	function clicked () {
		w.sessionStorage.setItem('addToHomeSession', '1');
		isSessionActive = true;
		close();
	}

	function transitionEnd () {
		balloon.removeEventListener('webkitTransitionEnd', transitionEnd, false);

		balloon.style.webkitTransitionProperty = '-webkit-transform';
		balloon.style.webkitTransitionDuration = '0.2s';

		// We reached the end!
		if ( !closeTimeout ) {
			balloon.parentNode.removeChild(balloon);
			balloon = null;
			return;
		}

		// On iOS 4 we start checking the element position
		if ( OSVersion < 5 && closeTimeout ) positionInterval = setInterval(setPosition, options.iterations);
	}

	function setPosition () {
		var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;

		// Screen didn't move
		if ( posY == matrix.m42 && posX == matrix.m41 ) return;

		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}

	// Clear local and session storages (this is useful primarily in development)
	function reset () {
		w.localStorage.removeItem('addToHome');
		w.sessionStorage.removeItem('addToHomeSession');
	}

	function orientationCheck () {
		balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 && OSVersion < 7 ? 40 : 0 ) + 'px';
	}

	// Bootstrap!
	init();

	return {
		show: manualShow,
		close: close,
		reset: reset
	};
})(window);


/*! Unobtrusive Slider Control / HTML5 Input Range polyfill - MIT/GPL2 @freqdec */
/*jshint sub:true, evil:true, boss:true */

var fdSlider = (function () {
  var sliders = {},
    uniqueid = 0,
    mouseWheelEnabled = true,
    fullARIA = true,
    describedBy = "fd-slider-describedby",
    varSetRules = {
      onfocus: true,
      onvalue: true
    },
    noRangeBar = false,
    html5Animation = "jump",
    isOpera = Object.prototype.toString.call(window.opera) === "[object Opera]",
    fpRegExp = /^([\-]{0,1}[0-9]+(\.[0-9]+){0,1})$/,
    stepRegExp = /^([0-9]+(\.[0-9]+){0,1})$/;
  var parseJSON = function (str) {
    if (typeof str !== "string" || str === "") {
      return {};
    }
    try {
      // Does a JSON (native or not) Object exist
      if (typeof JSON === "object" && typeof (JSON.parse) === "function") {
        return JSON.parse(str);
        // Genious code taken from: http://kentbrewster.com/badges/
      } else if (/mousewheelenabled|fullaria|describedby|norangebar|html5animation|varsetrules/.test(str.toLowerCase())) {
        var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
          'Array,String,Math,RegExp,Image,ActiveXObject;',
          'return (', str.replace(/<\!--.+-->/gim, '').replace(/\bfunction\b/g, 'function-'), ');'
        ].join(''));
        return f();
      }
    } catch (e) {}
    return {
      "err": "Could not parse the JSON object"
    };
  };
  var affectJSON = function (json) {
    if (typeof json !== "object") {
      return;
    }
    for (var key in json) {
      value = json[key];
      switch (key.toLowerCase()) {
      case "mousewheelenabled":
        mouseWheelEnabled = !! value;
        break;
      case "fullaria":
        fullARIA = !! value;
        break;
      case "describedby":
        describedBy = String(value);
        break;
      case "norangebar":
        noRangeBar = !! value;
        break;
      case "html5animation":
        html5Animation = String(value).search(/^(jump|tween|timed)$/i) != -1 ? String(value).toLowerCase() : "jump";
        break;
      case "varsetrules":
        if ("onfocus" in value) {
          varSetRules.onfocus = !! value.onfocus;
        }
        if ("onvalue" in value) {
          varSetRules.onvalue = !! value.onvalue;
        }
        break;
      }
    }
  };
  // Classic event functions
  var addEvent = function (obj, type, fn) {
    if (obj.attachEvent) {
      obj.attachEvent("on" + type, fn);
    } else {
      obj.addEventListener(type, fn, true);
    }
  };
  var removeEvent = function (obj, type, fn) {
    try {
      if (obj.detachEvent) {
        obj.detachEvent("on" + type, fn);
      } else {
        obj.removeEventListener(type, fn, true);
      }
    } catch (err) {}
  };
  var stopEvent = function (e) {
    e = e || window.event;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    /*@cc_on@*/
    /*@if(@_win32)
                e.cancelBubble = true;
                e.returnValue = false;
                /*@end@*/
    return false;
  };
  var preventDefault = function (e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
      return;
    }
    e.returnValue = false;
  };
  // Add/Remove classname utility functions
  var addClass = function (e, c) {
    if (new RegExp("(^|\\s)" + c + "(\\s|$)").test(e.className)) {
      return;
    }
    e.className += (e.className ? " " : "") + c;
  };
  var removeClass = function (e, c) {
    e.className = !c ? "" : e.className.replace(new RegExp("(^|\\s)" + c + "(\\s|$)"), " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };
  // Returns an Object of key value pairs indicating which sliders have values
  // that have been "set" by the user. Normally used within form validation code
  var getValueSet = function () {
    var obj = {};
    for (var id in sliders) {
      obj[id] = sliders[id].getValueSet();
    }
    return obj;
  };
  // Sets the valueSet variable for a specific slider
  var setValueSet = function (sliderId, tf) {
    sliders[sliderId].setValueSet( !! tf);
  };
  // Does the slider exist in memory
  var sliderExists = function (slider) {
    return !!(slider in sliders && sliders.hasOwnProperty(slider));
  };
  // Javascript instantiation of a slider (input type="text|range" or select list)
  var createSlider = function (options) {
    if (!options || !options.inp || !options.inp.tagName || options.inp.tagName.search(/^input|select/i) == -1) {
      return false;
    }
    options.html5Shim = false;
    if (options.inp.tagName.toLowerCase() == "select") {
      if (options.inp.options.length < 2) {
        return false;
      }
      options.min = 0;
      options.max = options.inp.options.length - 1;
      options.step = 1;
      options.precision = 0;
      options.scale = false;
      options.forceValue = true;
    } else {
      if (String(options.inp.type).search(/^(text|range)$/i) == -1) {
        return false;
      }
      options.min = options.min && String(options.min).search(fpRegExp) != -1 ? +options.min : 0;
      options.max = options.max && String(options.max).search(fpRegExp) != -1 ? +options.max : 100;
      options.step = options.step && String(options.step).search(stepRegExp) != -1 ? options.step : 1;
      options.precision = options.precision && String(options.precision).search(/^[0-9]+$/) != -1 ? options.precision : (String(options.step).search(/\.([0-9]+)$/) != -1 ? String(options.step).match(/\.([0-9]+)$/)[1].length : 0);
      options.scale = options.scale || false;
      options.forceValue = ("forceValue" in options) ? !! options.forceValue : false;
      options.userSnap = ("userSnap" in options) ? !! options.userSnap : false;
    }
    options.ariaFormat = ("ariaFormat" in options) && typeof options.ariaFormat == "function" ? options.ariaFormat : false;
    options.maxStep = options.maxStep && String(options.maxStep).search(stepRegExp) != -1 ? +options.maxStep : +options.step * 2;
    options.classNames = options.classNames || "";
    options.callbacks = options.callbacks || false;
    destroySingleSlider(options.inp.id);
    sliders[options.inp.id] = new fdRange(options);
    return true;
  };
  var getAttribute = function (elem, att) {
    return elem.getAttribute(att) || "";
  };
  // HTML5 input type="range" shim - called onload or onDomReady
  var init = function () {
    var inputs = document.getElementsByTagName("input"),
      options;
    for (var i = 0, inp; inp = inputs[i]; i++) {
      if (inp.tagName.toLowerCase() == "input" &&
        inp.type.toLowerCase() == "text" &&
        (getAttribute(inp, "min") && getAttribute(inp, "min").search(fpRegExp) != -1 ||
          getAttribute(inp, "max") && getAttribute(inp, "max").search(fpRegExp) != -1 ||
          getAttribute(inp, "step") && getAttribute(inp, "step").search(/^(any|([0-9]+(\.[0-9]+){0,1}))$/i) != -1
        )) {
        // Skip elements that have already been created are are resident in the DOM
        if (inp.id && document.getElementById("fd-slider-" + inp.id)) {
          continue;
          // Destroy elements that have already been created but not resident in the DOM
        } else if (inp.id && !document.getElementById("fd-slider-" + inp.id)) {
          destroySingleSlider(inp.id);
        }
        // Create an id for the form element if necessary
        if (!inp.id) {
          inp.id = "fd-slider-form-elem-" + uniqueid++;
        }
        // Basic option Object
        options = {
          inp: inp,
          callbacks: [],
          animation: html5Animation,
          vertical: getAttribute(inp, "data-fd-slider-vertical") ? true : (inp.offsetHeight > inp.offsetWidth),
          classNames: getAttribute(inp, "data-fd-slider-vertical"),
          html5Shim: true
        };
        if (options.vertical && !getAttribute(inp, "data-fd-slider-vertical")) {
          options.inpHeight = inp.offsetHeight;
        }
        options.min = getAttribute(inp, "min") || 0;
        options.max = getAttribute(inp, "max") || 100;
        options.step = getAttribute(inp, "step").search(/^any$/i) != -1 ? options.max - options.min : getAttribute(inp, "step").search(stepRegExp) != -1 ? inp.getAttribute("step") : 1;
        options.precision = String(options.step).search(/\.([0-9]+)$/) != -1 ? String(options.step).match(/\.([0-9]+)$/)[1].length : 0;
        options.maxStep = options.step * 2;
        destroySingleSlider(options.inp.id);
        sliders[options.inp.id] = new fdRange(options);
      }
    }
    return true;
  };
  var destroySingleSlider = function (id) {
    if (id in sliders && sliders.hasOwnProperty(id)) {
      sliders[id].destroy();
      delete sliders[id];
      return true;
    }
    return false;
  };
  var destroyAllsliders = function (e) {
    for (var slider in sliders) {
      if (sliders.hasOwnProperty(slider)) {
        sliders[slider].destroy();
      }
    }
    sliders = [];
  };
  var unload = function (e) {
    destroyAllsliders();
    sliders = null;
  };
  var resize = function (e) {
    for (var slider in sliders) {
      if (sliders.hasOwnProperty(slider)) {
        sliders[slider].onResize();
      }
    }
  };
  var onDomReady = function () {
    removeOnLoadEvent();
    init();
  };
  var removeOnLoadEvent = function () {
    removeEvent(window, "load", init);
  };

  function fdRange(options) {
    var inp = options.inp,
      disabled = false,
      tagName = inp.tagName.toLowerCase(),
      min = +options.min,
      max = +options.max,
      rMin = +options.min,
      rMax = +options.max,
      range = Math.abs(max - min),
      step = tagName == "select" ? 1 : +options.step,
      maxStep = options.maxStep ? +options.maxStep : step * 2,
      precision = options.precision || 0,
      steps = Math.ceil(range / step),
      scale = options.scale || false,
      hideInput = !! options.hideInput,
      animation = options.animation || "",
      vertical = !! options.vertical,
      callbacks = options.callbacks || {},
      classNames = options.classNames || "",
      html5Shim = !! options.html5Shim,
      defaultVal = max < min ? min : min + ((max - min) / 2),
      resetDef = tagName == "select" ? inp.selectedIndex : inp.defaultValue || defaultVal,
      forceValue = html5Shim || !! options.forceValue,
      inpHeight = html5Shim && vertical && ("inpHeight" in options) ? options.inpHeight : false,
      ariaFormat = !html5Shim && options.ariaFormat ? options.ariaFormat : false,
      userSnap = !html5Shim && !(tagName == "select") && ("userSnap" in options) ? !! options.userSnap : false,
      userInput = false,
      timer = null,
      kbEnabled = true,
      initialVal = tagName == "select" ? inp.selectedIndex : inp.value,
      sliderH = 0,
      sliderW = 0,
      tweenX = 0,
      tweenB = 0,
      tweenC = 0,
      tweenD = 0,
      frame = 0,
      x = 0,
      y = 0,
      rMaxPx = 0,
      rMinPx = 0,
      handlePos = 0,
      destPos = 0,
      mousePos = 0,
      stepPx = 0,
      userSet = false,
      touchEvents = false,
      outerWrapper,
      innerWrapper,
      ieBlur,
      handle,
      rangeBar,
      bar;
    // For the reset event to work we have to set a defaultValue
    if (tagName == "input" && forceValue && !inp.defaultValue) {
      inp.defaultValue = getWorkingValueFromInput();
    }
    // Make sure we have a negative step if the max < min
    if (max < min) {
      step = -Math.abs(step);
      maxStep = -Math.abs(maxStep);
    }
    // Add the 100% scale mark if needs be. This is hacky.
    if (scale) {
      scale[100] = max;
    }
    // Set the "userSet" variable programmatically for this slider

    function valueSet(tf) {
      tf = !! tf;
      if (tf != userSet) {
        userSet = tf;
        valueToPixels(getWorkingValueFromInput());
      }
    }

    function disableSlider(noCallback) {
      if (disabled && !noCallback) {
        return;
      }
      try {
        setTabIndex(handle, -1);
        removeEvent(handle, "focus", onFocus);
        removeEvent(handle, "blur", onBlur);
        if (!isOpera) {
          removeEvent(handle, "keydown", onKeyDown);
          removeEvent(handle, "keypress", onKeyPress);
        } else {
          removeEvent(handle, "keypress", onKeyDown);
        }
        removeEvent(outerWrapper, "mouseover", onMouseOver);
        removeEvent(outerWrapper, "mouseout", onMouseOut);
        removeEvent(outerWrapper, "mousedown", onMouseDown);
        removeEvent(outerWrapper, "touchstart", onMouseDown);
        if (mouseWheelEnabled) {
          if (window.addEventListener && !window.devicePixelRatio) window.removeEventListener('DOMMouseScroll', trackMouseWheel, false);
          else {
            removeEvent(document, "mousewheel", trackMouseWheel);
            removeEvent(window, "mousewheel", trackMouseWheel);
          }
        }
      } catch (err) {}
      removeClass(innerWrapper, "fd-slider-focused");
      removeClass(innerWrapper, "fd-slider-active");
      addClass(innerWrapper, "fd-slider-disabled");
      outerWrapper.setAttribute("aria-disabled", true);
      inp.disabled = disabled = true;
      clearTimeout(timer);
      if (!noCallback) {
        callback("disable");
      }
    }

    function enableSlider(noCallback) {
      if (!disabled && !noCallback) {
        return;
      }
      setTabIndex(handle, 0);
      addEvent(handle, "focus", onFocus);
      addEvent(handle, "blur", onBlur);
      if (!isOpera) {
        addEvent(handle, "keydown", onKeyDown);
        addEvent(handle, "keypress", onKeyPress);
      } else {
        addEvent(handle, "keypress", onKeyDown);
      }
      addEvent(outerWrapper, "touchstart", onMouseDown);
      addEvent(outerWrapper, "mousedown", onMouseDown);
      addEvent(outerWrapper, "mouseover", onMouseOver);
      addEvent(outerWrapper, "mouseout", onMouseOut);
      removeClass(innerWrapper, "fd-slider-disabled");
      outerWrapper.setAttribute("aria-disabled", false);
      inp.disabled = disabled = touchEvents = false;
      if (!noCallback) {
        callback("enable");
      }
    }
    // Destroys a slider

    function destroySlider() {
      // Clear any timeouts
      clearTimeout(timer);
      // Remove pointers to DOM nodes
      ieBlur = bar = handle = outerWrapper = innerWrapper = timer = null;
      // Call the "destroy" callback
      callback("destroy");
      // Delete the callback functions
      callbacks = null;
    }
    // Calculates the pixel increment etc

    function redraw() {
      locate();
      // Internet Explorer requires the try catch as hidden
      // elements throw errors
      try {
        var sW = outerWrapper.offsetWidth,
          sH = outerWrapper.offsetHeight,
          hW = handle.offsetWidth,
          hH = handle.offsetHeight,
          bH = bar.offsetHeight,
          bW = bar.offsetWidth,
          mPx = vertical ? sH - hH : sW - hW;
        stepPx = mPx / steps;
        rMinPx = Math.max(scale ? percentToPixels(valueToPercent(rMin)) : Math.abs((rMin - min) / step) * stepPx, 0);
        rMaxPx = Math.min(scale ? percentToPixels(valueToPercent(rMax)) : Math.abs((rMax - min) / step) * stepPx, Math.floor(vertical ? sH - hH : sW - hW));
        sliderW = sW;
        sliderH = sH;
        // Use the input value
        valueToPixels(forceValue ? getWorkingValueFromInput() : (tagName == "select" ? inp.selectedIndex : parseFloat(inp.value)), false);
      } catch (err) {}
      callback("redraw");
    }
    // Calls a callback function

    function callback(type) {
      if (!html5Shim) {
        if (callbacks.hasOwnProperty(type)) {
          var cbObj = {
            "userSet": userSet,
            "disabled": disabled,
            "elem": inp,
            "value": tagName == "select" ? inp.options[inp.selectedIndex].value : inp.value
          };
          // Call all functions in sequence
          for (var i = 0, func; func = callbacks[type][i]; i++) {
            func.call(inp, cbObj);
          }
        }
      } else if (type.match(/^(blur|focus|change)$/i)) {
        var e;
        if (typeof (document.createEventObject) != 'undefined') {
          try {
            e = document.createEventObject();
            inp.fireEvent('on' + type.toLowerCase(), e);
          } catch (err) {}
        } else if (typeof (document.createEvent) != 'undefined') {
          e = document.createEvent('HTMLEvents');
          e.initEvent(type, true, true);
          inp.dispatchEvent(e);
        }
      }
    }
    // FOCUS & BLUR events

    function onFocus(e) {
      addClass(innerWrapper, 'fd-slider-focused');
      // Is the value said to have been set by the user onfocus
      if (varSetRules.onfocus) {
        userSet = true;
        valueToPixels(getWorkingValueFromInput());
      }
      // If mousewheel events required then add them
      if (mouseWheelEnabled) {
        addEvent(window, 'DOMMouseScroll', trackMouseWheel);
        addEvent(document, 'mousewheel', trackMouseWheel);
        if (!isOpera) {
          addEvent(window, 'mousewheel', trackMouseWheel);
        }
      }
      callback("focus");
      return true;
    }

    function onBlur(e) {
      removeClass(innerWrapper, 'fd-slider-focused');
      // Remove mousewheel events if necessary
      if (mouseWheelEnabled) {
        removeEvent(document, 'mousewheel', trackMouseWheel);
        removeEvent(window, 'DOMMouseScroll', trackMouseWheel);
        if (!isOpera) {
          removeEvent(window, 'mousewheel', trackMouseWheel);
        }
      }
      kbEnabled = true;
      callback("blur");
    }
    // MOUSEWHEEL events

    function trackMouseWheel(e) {
      if (!kbEnabled) {
        return;
      }
      e = e || window.event;
      var delta = 0,
        value;
      if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
        // Older versions of Opera require a small hack to inverse the delta
        if (isOpera && window.opera.version() < 9.2) {
          delta = -delta;
        }
      } else if (e.detail) {
        delta = -e.detail / 3;
      }
      if (vertical) {
        delta = -delta;
      }
      if (delta) {
        value = getWorkingValueFromInput();
        value += (delta < 0) ? -step : step;
        userSet = true;
        valueToPixels(getValidValue(value));
      }
      preventDefault(e);
    }
    // KEYBOARD events

    function onKeyPress(e) {
      e = e || window.event;
      // Let all non-hijacked keyboard events pass
      if ((e.keyCode >= 33 && e.keyCode <= 40) || !kbEnabled || e.keyCode == 45 || e.keyCode == 46) {
        return stopEvent(e);
      }
      return true;
    }

    function onKeyDown(e) {
      if (!kbEnabled) {
        return true;
      }
      e = e || window.event;
      var kc = e.keyCode !== null ? e.keyCode : e.charCode,
        value;
      if (kc < 33 || (kc > 40 && (kc != 45 && kc != 46))) {
        return true;
      }
      value = getWorkingValueFromInput();
      if (kc == 37 || kc == 40 || kc == 46 || kc == 34) {
        // left, down, ins, page down
        value -= (e.ctrlKey || kc == 34 ? +maxStep : +step);
      } else if (kc == 39 || kc == 38 || kc == 45 || kc == 33) {
        // right, up, del, page up
        value += (e.ctrlKey || kc == 33 ? +maxStep : +step);
      } else if (kc == 35) {
        // max
        value = rMax;
      } else if (kc == 36) {
        // min
        value = rMin;
      }
      userSet = true;
      valueToPixels(getValidValue(value));
      callback("update");
      // Opera doesn't let us cancel key events so the up/down arrows and home/end buttons will scroll the screen - which sucks
      preventDefault(e);
    }
    // MOUSE & TOUCH events
    // Mouseover the slider

    function onMouseOver(e) {
      addClass(innerWrapper, 'fd-slider-hover');
    }
    // Mouseout of the slider

    function onMouseOut(e) {
      // Should really check we are not still in the slider
      removeClass(innerWrapper, 'fd-slider-hover');
    }
    // Mousedown on the slider

    function onMouseDown(e) {
      e = e || window.event;
      // Stop page scrolling
      preventDefault(e);
      // Grab the event target
      var targ;
      if (e.target) {
        targ = e.target;
      } else if (e.srcElement) {
        targ = e.srcElement;
      }
      if (targ && targ.nodeType == 3) {
        targ = targ.parentNode;
      }
      // Are we using touchEvents
      if (e.touches) {
        // Skip gestures
        if (e.targetTouches && e.targetTouches.length != 1) {
          return false;
        }
        e = e.touches[0];
        touchEvents = true;
      }
      // Stop any animation timers
      clearTimeout(timer);
      timer = null;
      // Not keyboard enabled
      kbEnabled = false;
      // User has set a value
      userSet = true;
      // Handle mousedown - initiate drag
      if (targ.className.search("fd-slider-handle") != -1) {
        mousePos = vertical ? e.clientY : e.clientX;
        handlePos = parseInt(vertical ? handle.offsetTop : handle.offsetLeft) || 0;
        // Set a value on first click even if no movement
        trackMouse(e);
        if (!touchEvents) {
          addEvent(document, 'mousemove', trackMouse);
          addEvent(document, 'mouseup', stopDrag);
        } else {
          addEvent(document, 'touchmove', trackMouse);
          addEvent(document, 'touchend', stopDrag);
          // Remove mouseEvents to stop them firing after the touch event
          removeEvent(outerWrapper, "mousedown", onMouseDown);
        }
        addClass(innerWrapper, 'fd-slider-active');
        addClass(document.body, "fd-slider-drag-" + (vertical ? "vertical" : "horizontal"));
        callback("dragstart");
        // Wrapper mousedown - initiate animation to click point
      } else {
        locate();
        var posx = 0;
        if (e.pageX || e.pageY) {
          posx = vertical ? e.pageY : e.pageX;
        } else if (e.clientX || e.clientY) {
          posx = vertical ? e.clientY + document.body.scrollTop + document.documentElement.scrollTop : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        }
        posx -= vertical ? y + Math.round(handle.offsetHeight / 2) : x + Math.round(handle.offsetWidth / 2);
        posx = snapToPxValue(posx);
        // Tween animation to click point
        if (animation == "tween") {
          addClass(innerWrapper, 'fd-slider-active');
          tweenTo(posx);
          // Progressive increment to click point
        } else if (animation == "timed") {
          addClass(innerWrapper, 'fd-slider-active');
          addEvent(document, touchEvents ? 'touchend' : 'mouseup', onDocMouseUp);
          destPos = posx;
          onTimer();
          // Immediate jump to click point
        } else {
          pixelsToValue(posx);
          //addEvent(document, touchEvents ? 'touchend' : 'mouseup', onMouseUp);
        }
      }
      return false;
    }
    // Progressive increment to click point - clear the animation timer and remove the mouseup/touchend event

    function onDocMouseUp(e) {
      e = e || window.event;
      preventDefault(e);
      removeEvent(document, touchEvents ? 'touchend' : 'mouseup', onDocMouseUp);
      removeClass(innerWrapper, "fd-slider-active");
      clearTimeout(timer);
      timer = null;
      kbEnabled = true;
      return false;
    }
    // Mouseup or touchend event on the document to stop drag

    function stopDrag(e) {
      e = e || window.event;
      preventDefault(e);
      if (touchEvents) {
        removeEvent(document, 'touchmove', trackMouse);
        removeEvent(document, 'touchend', stopDrag);
      } else {
        removeEvent(document, 'mousemove', trackMouse);
        removeEvent(document, 'mouseup', stopDrag);
      }
      kbEnabled = true;
      removeClass(document.body, "fd-slider-drag-" + (vertical ? "vertical" : "horizontal"));
      removeClass(innerWrapper, "fd-slider-active");
      callback("dragend");
      return false;
    }
    // Mousemove or touchmove event on the drag handle

    function trackMouse(e) {
      e = e || window.event;
      preventDefault(e);
      if (e.touches) {
        // Skip gestures
        if (e.targetTouches && e.targetTouches.length != 1) {
          return false;
        }
        e = e.touches[0];
      }
      pixelsToValue(snapToPxValue(handlePos + (vertical ? e.clientY - mousePos : e.clientX - mousePos)));
      return false;
    }
    // Increments the slider by "inc" steps

    function increment(inc) {
      var value = getWorkingValueFromInput();
      userSet = true;
      value += inc * step;
      valueToPixels(getValidValue(value));
    }
    // Attempts to locate the on-screen position of the slider

    function locate() {
      var curleft = 0,
        curtop = 0,
        obj = outerWrapper;
      // Try catch for IE's benefit
      try {
        while (obj.offsetParent) {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
          obj = obj.offsetParent;
        }
      } catch (err) {}
      x = curleft;
      y = curtop;
    }
    // Used during the progressive animation to click point

    function onTimer() {
      var xtmp = parseInt(vertical ? handle.offsetTop : handle.offsetLeft, 10);
      xtmp = Math.round((destPos < xtmp) ? Math.max(destPos, Math.floor(xtmp - stepPx)) : Math.min(destPos, Math.ceil(xtmp + stepPx)));
      pixelsToValue(snapToPxValue(xtmp));
      if (xtmp != destPos) {
        timer = setTimeout(onTimer, steps > 20 ? 50 : 100);
      } else {
        kbEnabled = true;
        removeClass(innerWrapper, "fd-slider-active");
        callback("finalise");
      }
    }
    var tween = function () {
      frame++;
      var c = tweenC,
        d = 20,
        t = frame,
        b = tweenB,
        x = Math.ceil((t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b);
      pixelsToValue(t == d ? tweenX : x);
      if (t != d) {
        // Call the "move" callback on each animation increment
        callback("move");
        timer = setTimeout(tween, 20);
      } else {
        clearTimeout(timer);
        timer = null;
        kbEnabled = true;
        removeClass(innerWrapper, "fd-slider-focused");
        removeClass(innerWrapper, "fd-slider-active");
        // Call the "finalise" callback whenever the animation is complete
        callback("finalise");
      }
    };

    function tweenTo(tx) {
      kbEnabled = false;
      tweenX = parseInt(tx, 10);
      tweenB = parseInt(vertical ? handle.offsetTop : handle.offsetLeft, 10);
      tweenC = tweenX - tweenB;
      tweenD = 20;
      frame = 0;
      if (!timer) {
        timer = setTimeout(tween, 20);
      }
    }
    // Returns a value within the range & sets the userSet var
    // i.e. has the user entered a valid value

    function checkValue(value) {
      if (isNaN(value) || value === "" || typeof value == "undefined") {
        userSet = false;
        return defaultVal;
      } else if (value < Math.min(rMin, rMax)) {
        userSet = false;
        return Math.min(rMin, rMax);
      } else if (value > Math.max(rMin, rMax)) {
        userSet = false;
        return Math.max(rMin, rMax);
      }
      userSet = true;
      return value;
    }
    // Returns a value within a range - uses the form element value as base

    function getWorkingValueFromInput() {
      return getValidValue(tagName == "input" ? parseFloat(inp.value) : inp.selectedIndex);
    }
    // Returns a value within the range

    function getValidValue(value) {
      return (isNaN(value) || value === "" || typeof value == "undefined") ? defaultVal : Math.min(Math.max(value, Math.min(rMin, rMax)), Math.max(rMin, rMax));
    }
    // Calculates value according to pixel position of slider handle

    function pixelsToValue(px) {
      var val = getValidValue(scale ? percentToValue(pixelsToPercent(px)) : vertical ? max - (Math.round(px / stepPx) * step) : min + (Math.round(px / stepPx) * step));
      handle.style[vertical ? "top" : "left"] = (px || 0) + "px";
      redrawRange();
      setInputValue((tagName == "select" || step == 1) ? Math.round(val) : val);
    }
    // Calculates pixel position according to form element value

    function valueToPixels(val, updateInputValue) {
      var clearVal = false,
        value;
      // Allow empty values for non-polyfill sliders
      if ((typeof val === "undefined" || isNaN(val) || val === "") && tagName == "input" && !forceValue) {
        value = defaultVal;
        clearVal = true;
        userSet = false;
      } else {
        value = checkValue(val);
      }
      handle.style[vertical ? "top" : "left"] = (scale ? percentToPixels(valueToPercent(value)) : vertical ? Math.round(((max - value) / step) * stepPx) : Math.round(((value - min) / step) * stepPx)) + "px";
      redrawRange();
      if (typeof updateInputValue !== false) {
        setInputValue(clearVal ? "" : value);
      }
    }
    // Rounds a pixel value to the nearest "snap" point on the slider scale

    function snapToPxValue(px) {
      if (scale) {
        return Math.max(Math.min(rMaxPx, px), rMinPx);
      } else {
        var rem = px % stepPx;
        if (rem && rem >= (stepPx / 2)) {
          px += (stepPx - rem);
        } else {
          px -= rem;
        }
        if (px < Math.min(Math.abs(rMinPx), Math.abs(rMaxPx))) {
          px = Math.min(Math.abs(rMinPx), Math.abs(rMaxPx));
        } else if (px > Math.max(Math.abs(rMinPx), Math.abs(rMaxPx))) {
          px = Math.max(Math.abs(rMinPx), Math.abs(rMaxPx));
        }
        return Math.min(Math.max(px, 0), rMaxPx);
      }
    }
    // Calculates a value according to percentage of distance handle has travelled

    function percentToValue(pct) {
      var st = 0,
        fr = min,
        value;
      for (var s in scale) {
        if (!scale.hasOwnProperty(s)) {
          continue;
        }
        if (pct >= st && pct <= +s) {
          value = fr + ((pct - st) * (+scale[s] - fr)) / (+s - st);
        }
        st = +s;
        fr = +scale[s];
      }
      return value;
    }
    // Calculates the percentage handle position according to form element value

    function valueToPercent(value) {
      var st = 0,
        fr = min,
        pct = 0;
      for (var s in scale) {
        if (!scale.hasOwnProperty(s)) {
          continue;
        }
        if (value >= fr && value <= +scale[s]) {
          pct = st + (value - fr) * (+s - st) / (+scale[s] - fr);
        }
        st = +s;
        fr = +scale[s];
      }
      return pct;
    }

    function percentToPixels(percent) {
      return ((outerWrapper[vertical ? "offsetHeight" : "offsetWidth"] - handle[vertical ? "offsetHeight" : "offsetWidth"]) / 100) * percent;
    }

    function pixelsToPercent(pixels) {
      return pixels / ((outerWrapper[vertical ? "offsetHeight" : "offsetWidth"] - outerWrapper[handle ? "offsetHeight" : "offsetWidth"]) / 100);
    }
    // Sets the form element with a valid value

    function setInputValue(val) {
      // The update callback doesn't mean the input value has changed
      callback("update");
      wpt_slider_changed(val, innerWrapper);
      // If the user has not set this value or has entered an incorrect value then set a class
      // to enable styling of the slider
      if (!userSet) {
        addClass(innerWrapper, "fd-slider-no-value");
      } else {
        removeClass(innerWrapper, "fd-slider-no-value");
      }
      if (tagName == "select") {
        try {
          val = parseInt(val, 10);
          if (inp.selectedIndex === val) {
            updateAriaValues();
            return;
          }
          inp.options[val].selected = true;
        } catch (err) {}
      } else {
        if (val !== "" && !userInput) {
          val = (min + (Math.round((val - min) / step) * step)).toFixed(precision);
        }
        if (inp.value === val) {
          updateAriaValues();
          return;
        }
        inp.value = val;
      }
      updateAriaValues();
      callback("change");
    }

    function checkInputValue(value) {
      return !(isNaN(value) || value === "" || value < Math.min(rMin, rMax) || value > Math.max(rMin, rMax));
    }

    function setSliderRange(newMin, newMax) {
      if (rMin > rMax) {
        newMin = Math.min(min, Math.max(newMin, newMax));
        newMax = Math.max(max, Math.min(newMin, newMax));
        rMin = Math.max(newMin, newMax);
        rMax = Math.min(newMin, newMax);
      } else {
        newMin = Math.max(min, Math.min(newMin, newMax));
        newMax = Math.min(max, Math.max(newMin, newMax));
        rMin = Math.min(newMin, newMax);
        rMax = Math.max(newMin, newMax);
      }
      if (defaultVal < Math.min(rMin, rMax)) {
        defaultVal = Math.min(rMin, rMax);
      } else if (defaultVal > Math.max(rMin, rMax)) {
        defaultVal = Math.max(rMin, rMax);
      }
      handle.setAttribute("aria-valuemin", rMin);
      handle.setAttribute("aria-valuemax", rMax);
      checkValue(tagName == "input" ? parseFloat(inp.value) : inp.selectedIndex);
      redraw();
    }

    function redrawRange() {
      if (noRangeBar) {
        return;
      }
      if (vertical) {
        rangeBar.style["height"] = Math.max(1, (bar.offsetHeight - handle.offsetTop)) + "px";
      } else {
        rangeBar.style["width"] = Math.max(1, handle.offsetLeft) + "px";
      }
    }

    function findLabel() {
      var label = false,
        labelList = document.getElementsByTagName('label');
      // loop through label array attempting to match each 'for' attribute to the id of the current element
      for (var i = 0, lbl; lbl = labelList[i]; i++) {
        // Internet Explorer requires the htmlFor test
        if ((lbl['htmlFor'] && lbl['htmlFor'] == inp.id) || (lbl.getAttribute('for') == inp.id)) {
          label = lbl;
          break;
        }
      }
      if (label && !label.id) {
        label.id = inp.id + "_label";
      }
      return label;
    }

    function updateAriaValues() {
      var val = tagName == "select" ? inp.options[inp.selectedIndex].value : inp.value,
        valTxt = ariaFormat ? ariaFormat(val) : tagName == "select" ? (inp.options[inp.selectedIndex].text ? inp.options[inp.selectedIndex].text : val) : val;
      handle.setAttribute("aria-valuenow", val);
      handle.setAttribute("aria-valuetext", valTxt);
    }

    function onInputChange(e) {
      userSet = true;
      userInput = userSnap;
      valueToPixels(tagName == "input" ? parseFloat(inp.value) : inp.selectedIndex);
      updateAriaValues();
      userInput = false;
    }

    function onReset(e) {
      if (tagName == "input") {
        inp.value = inp.defaultValue;
      } else {
        inp.selectedIndex = resetDef;
      }
      checkValue(tagName == "select" ? inp.options[inp.selectedIndex].value : inp.value);
      redraw();
      updateAriaValues();
    }

    function valueSet(tf) {
      userSet = !! tf;
    }
    // Sets a tabindex attribute on an element, bends over for IE.

    function setTabIndex(e, i) {
      e.setAttribute(! /*@cc_on!@*/ false ? "tabIndex" : "tabindex", i);
      e.tabIndex = i;
    }
    (function () {
      if (html5Shim || hideInput) {
        addClass(inp, "fd-form-element-hidden");
      } else {
        addEvent(inp, 'change', onInputChange);
      }
      // Add stepUp & stepDown methods to input element if using the html5Shim
      if (html5Shim) {
        inp.stepUp = function (n) {
          increment(n || 1);
        };
        inp.stepDown = function (n) {
          increment(n || -1);
        };
      }
      outerWrapper = document.createElement('span');
      outerWrapper.className = "fd-slider" + (vertical ? "-vertical " : " ") + classNames;
      outerWrapper.id = "fd-slider-" + inp.id;
      if (vertical && inpHeight) {
        outerWrapper.style.height = inpHeight + "px";
      }
      innerWrapper = document.createElement('span');
      innerWrapper.className = "fd-slider-wrapper" + (!html5Shim ? " fd-slider-no-value" : "");
      ieBlur = document.createElement('span');
      ieBlur.className = "fd-slider-inner";
      bar = document.createElement('span');
      bar.className = "fd-slider-bar";
      if (fullARIA) {
        handle = document.createElement('span');
      } else {
        handle = document.createElement('a');
        handle.setAttribute("href", "#");
        addEvent(handle, "click", stopEvent);
      }
      setTabIndex(handle, 0);
      handle.className = "fd-slider-handle";
      handle.appendChild(document.createTextNode(String.fromCharCode(160)));
      innerWrapper.appendChild(ieBlur);
      if (!noRangeBar) {
        rangeBar = document.createElement('span');
        rangeBar.className = "fd-slider-range";
        innerWrapper.appendChild(rangeBar);
      }
      innerWrapper.appendChild(bar);
      innerWrapper.appendChild(handle);
      outerWrapper.appendChild(innerWrapper);
      inp.parentNode.insertBefore(outerWrapper, inp);
      if (isOpera || /*@cc_on!@*/ !true) {
        handle.unselectable = "on";
        bar.unselectable = "on";
        ieBlur.unselectable = "on";
        outerWrapper.unselectable = "on";
        innerWrapper.unselectable = "on";
        if (!noRangeBar) {
          rangeBar.unselectable = "on";
        }
      }
      // Add ARIA accessibility info programmatically
      outerWrapper.setAttribute("role", "application");
      handle.setAttribute("role", "slider");
      handle.setAttribute("aria-valuemin", tagName == "select" ? inp.options[0].value : min);
      handle.setAttribute("aria-valuemax", tagName == "select" ? inp.options[inp.options.length - 1].value : max);
      var lbl = findLabel();
      if (lbl) {
        handle.setAttribute("aria-labelledby", lbl.id);
        handle.id = "fd-slider-handle-" + inp.id;
        /*@cc_on*/
        /*@if(@_win32)
                                lbl.setAttribute("htmlFor", handle.id);
                                @else @*/
        lbl.setAttribute("for", handle.id);
        /*@end@*/
      }
      // Are there page instructions
      if (document.getElementById(describedBy)) {
        handle.setAttribute("aria-describedby", describedBy);
      }
      // Is the form element initially disabled
      if (inp.getAttribute("disabled") == true) {
        disableSlider(true);
      } else {
        enableSlider(true);
      }
      // Does an initial form element value mean the user has set a valid value?
      // Also called onload in case browsers have automatically set the input value
      if (varSetRules.onvalue) {
        userSet = true;
        checkValue(tagName == "input" ? parseFloat(inp.value) : inp.selectedIndex);
      }
      // Catch form reset events
      if (inp.form) {
        addEvent(inp.form, "reset", onReset);
      }
      updateAriaValues();
      callback("create");
      redraw();
    })();
    return {
      onResize: function (e) {
        if (outerWrapper.offsetHeight != sliderH || outerWrapper.offsetWidth != sliderW) {
          redraw();
        }
      },
      destroy: function () {
        destroySlider();
      },
      reset: function () {
        valueToPixels(tagName == "input" ? parseFloat(inp.value) : inp.selectedIndex);
      },
      stepUp: function (n) {
        increment(Math.abs(n) || 1);
      },
      stepDown: function (n) {
        increment(-Math.abs(n) || -1);
      },
      increment: function (n) {
        increment(n);
      },
      disable: function () {
        disableSlider();
      },
      enable: function () {
        enableSlider();
      },
      setRange: function (mi, mx) {
        setSliderRange(mi, mx);
      },
      getValueSet: function () {
        return !!userSet;
      },
      setValueSet: function (tf) {
        valueSet(tf);
      },
      checkValue: function () {
        if (varSetRules.onvalue) {
          userSet = true;
          checkValue(tagName == "input" ? parseFloat(inp.value) : inp.selectedIndex);
        }
        updateAriaValues();
        redraw();
      }
    };
  }
  /*addEvent(window, "load",   init);
        addEvent(window, "load",   function() { setTimeout(function() { var slider; for(slider in sliders) { sliders[slider].checkValue(); } }, 0); });
        addEvent(window, "resize", resize);
        addEvent(window, "unload", unload);*/
  // Have we been passed JSON within the including script tag
  (function () {
    var scriptFiles = document.getElementsByTagName('script'),
      scriptInner = String(scriptFiles[scriptFiles.length - 1].innerHTML).replace(/[\n\r\s\t]+/g, " ").replace(/^\s+/, "").replace(/\s+$/, ""),
      json = parseJSON(scriptInner);
    if (typeof json === "object" && !("err" in json)) {
      affectJSON(json);
    }
  })();
  // Add oldie class if needed for IE < 9
  /*@cc_on*/
  /*@if (@_jscript_version < 9)
        addClass(document.documentElement, "oldie");
        @end@*/
  return {
    rescanDocument: init,
    createSlider: function (opts) {
      return createSlider(opts);
    },
    onDomReady: function () {
      onDomReady();
    },
    destroyAll: function () {
      destroyAllsliders();
    },
    destroySlider: function (id) {
      return destroySingleSlider(id);
    },
    redrawAll: function () {
      resize();
    },
    addEvent: addEvent,
    removeEvent: removeEvent,
    stopEvent: stopEvent,
    increment: function (id, numSteps) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].increment(numSteps);
    },
    stepUp: function (id, n) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].stepUp(Math.abs(n) || 1);
    },
    stepDown: function (id, n) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].stepDown(-Math.abs(n) || -1);
    },
    setRange: function (id, newMin, newMax) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].setRange(newMin, newMax);
    },
    updateSlider: function (id) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].onResize();
      sliders[id].reset();
    },
    disable: function (id) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].disable();
    },
    enable: function (id) {
      if (!sliderExists(id)) {
        return false;
      }
      sliders[id].enable();
    },
    getValueSet: function () {
      return getValueSet();
    },
    setValueSet: function (a, tf) {
      if (!sliderExists(id)) {
        return false;
      }
      setValueSet(a, tf);
    },
    setGlobalVariables: function (json) {
      affectJSON(json);
    },
    removeOnload: function () {
      removeOnLoadEvent();
    }
  };
})();


var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
(function () {
  function L(a) {
    function m(a) {
      var f = a.charCodeAt(0);
      if (f !== 92) return f;
      var b = a.charAt(1);
      return (f = r[b]) ? f : "0" <= b && b <= "7" ? parseInt(a.substring(1), 8) : b === "u" || b === "x" ? parseInt(a.substring(2), 16) : a.charCodeAt(1)
    }

    function e(a) {
      if (a < 32) return (a < 16 ? "\\x0" : "\\x") + a.toString(16);
      a = String.fromCharCode(a);
      if (a === "\\" || a === "-" || a === "[" || a === "]") a = "\\" + a;
      return a
    }

    function h(a) {
      for (var f = a.substring(1, a.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), a = [], b = [], o = f[0] === "^", c = o ? 1 : 0, i = f.length; c < i; ++c) {
        var j = f[c];
        if (/\\[bdsw]/i.test(j)) a.push(j);
        else {
          var j = m(j),
            d;
          c + 2 < i && "-" === f[c + 1] ? (d = m(f[c + 2]), c += 2) : d = j;
          b.push([j, d]);
          d < 65 || j > 122 || (d < 65 || j > 90 || b.push([Math.max(65, j) | 32, Math.min(d, 90) | 32]), d < 97 || j > 122 || b.push([Math.max(97, j) & -33, Math.min(d, 122) & -33]))
        }
      }
      b.sort(function (a, f) {
        return a[0] - f[0] || f[1] - a[1]
      });
      f = [];
      j = [NaN, NaN];
      for (c = 0; c < b.length; ++c) i = b[c], i[0] <= j[1] + 1 ? j[1] = Math.max(j[1], i[1]) : f.push(j = i);
      b = ["["];
      o && b.push("^");
      b.push.apply(b, a);
      for (c = 0; c <
        f.length; ++c) i = f[c], b.push(e(i[0])), i[1] > i[0] && (i[1] + 1 > i[0] && b.push("-"), b.push(e(i[1])));
      b.push("]");
      return b.join("")
    }

    function y(a) {
      for (var f = a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), b = f.length, d = [], c = 0, i = 0; c < b; ++c) {
        var j = f[c];
        j === "(" ? ++i : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (d[j] = -1)
      }
      for (c = 1; c < d.length; ++c) - 1 === d[c] && (d[c] = ++t);
      for (i = c = 0; c < b; ++c) j = f[c], j === "(" ? (++i, d[i] === void 0 && (f[c] = "(?:")) : "\\" === j.charAt(0) &&
        (j = +j.substring(1)) && j <= i && (f[c] = "\\" + d[i]);
      for (i = c = 0; c < b; ++c) "^" === f[c] && "^" !== f[c + 1] && (f[c] = "");
      if (a.ignoreCase && s)
        for (c = 0; c < b; ++c) j = f[c], a = j.charAt(0), j.length >= 2 && a === "[" ? f[c] = h(j) : a !== "\\" && (f[c] = j.replace(/[A-Za-z]/g, function (a) {
          a = a.charCodeAt(0);
          return "[" + String.fromCharCode(a & -33, a | 32) + "]"
        }));
      return f.join("")
    }
    for (var t = 0, s = !1, l = !1, p = 0, d = a.length; p < d; ++p) {
      var g = a[p];
      if (g.ignoreCase) l = !0;
      else if (/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
        s = !0;
        l = !1;
        break
      }
    }
    for (var r = {
      b: 8,
      t: 9,
      n: 10,
      v: 11,
      f: 12,
      r: 13
    }, n = [], p = 0, d = a.length; p < d; ++p) {
      g = a[p];
      if (g.global || g.multiline) throw Error("" + g);
      n.push("(?:" + y(g) + ")")
    }
    return RegExp(n.join("|"), l ? "gi" : "g")
  }

  function M(a) {
    function m(a) {
      switch (a.nodeType) {
      case 1:
        if (e.test(a.className)) break;
        for (var g = a.firstChild; g; g = g.nextSibling) m(g);
        g = a.nodeName;
        if ("BR" === g || "LI" === g) h[s] = "\n", t[s << 1] = y++, t[s++ << 1 | 1] = a;
        break;
      case 3:
      case 4:
        g = a.nodeValue, g.length && (g = p ? g.replace(/\r\n?/g, "\n") : g.replace(/[\t\n\r ]+/g, " "), h[s] = g, t[s << 1] = y, y += g.length,
          t[s++ << 1 | 1] = a)
      }
    }
    var e = /(?:^|\s)nocode(?:\s|$)/,
      h = [],
      y = 0,
      t = [],
      s = 0,
      l;
    a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && (l = document.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
    var p = l && "pre" === l.substring(0, 3);
    m(a);
    return {
      a: h.join("").replace(/\n$/, ""),
      c: t
    }
  }

  function B(a, m, e, h) {
    m && (a = {
      a: m,
      d: a
    }, e(a), h.push.apply(h, a.e))
  }

  function x(a, m) {
    function e(a) {
      for (var l = a.d, p = [l, "pln"], d = 0, g = a.a.match(y) || [], r = {}, n = 0, z = g.length; n < z; ++n) {
        var f = g[n],
          b = r[f],
          o = void 0,
          c;
        if (typeof b ===
          "string") c = !1;
        else {
          var i = h[f.charAt(0)];
          if (i) o = f.match(i[1]), b = i[0];
          else {
            for (c = 0; c < t; ++c)
              if (i = m[c], o = f.match(i[1])) {
                b = i[0];
                break
              }
            o || (b = "pln")
          } if ((c = b.length >= 5 && "lang-" === b.substring(0, 5)) && !(o && typeof o[1] === "string")) c = !1, b = "src";
          c || (r[f] = b)
        }
        i = d;
        d += f.length;
        if (c) {
          c = o[1];
          var j = f.indexOf(c),
            k = j + c.length;
          o[2] && (k = f.length - o[2].length, j = k - c.length);
          b = b.substring(5);
          B(l + i, f.substring(0, j), e, p);
          B(l + i + j, c, C(b, c), p);
          B(l + i + k, f.substring(k), e, p)
        } else p.push(l + i, b)
      }
      a.e = p
    }
    var h = {}, y;
    (function () {
      for (var e = a.concat(m),
          l = [], p = {}, d = 0, g = e.length; d < g; ++d) {
        var r = e[d],
          n = r[3];
        if (n)
          for (var k = n.length; --k >= 0;) h[n.charAt(k)] = r;
        r = r[1];
        n = "" + r;
        p.hasOwnProperty(n) || (l.push(r), p[n] = q)
      }
      l.push(/[\S\s]/);
      y = L(l)
    })();
    var t = m.length;
    return e
  }

  function u(a) {
    var m = [],
      e = [];
    a.tripleQuotedStrings ? m.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : a.multiLineStrings ? m.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
      q, "'\"`"
    ]) : m.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
    a.verbatimStrings && e.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
    var h = a.hashComments;
    h && (a.cStyleComments ? (h > 1 ? m.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : m.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), e.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : m.push(["com", /^#[^\n\r]*/,
      q, "#"
    ]));
    a.cStyleComments && (e.push(["com", /^\/\/[^\n\r]*/, q]), e.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
    a.regexLiterals && e.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);
    (h = a.types) && e.push(["typ", h]);
    a = ("" + a.keywords).replace(/^ | $/g,
      "");
    a.length && e.push(["kwd", RegExp("^(?:" + a.replace(/[\s,]+/g, "|") + ")\\b"), q]);
    m.push(["pln", /^\s+/, q, " \r\n\t\xa0"]);
    e.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]);
    return x(m, e)
  }

  function D(a, m) {
    function e(a) {
      switch (a.nodeType) {
      case 1:
        if (k.test(a.className)) break;
        if ("BR" === a.nodeName) h(a),
        a.parentNode && a.parentNode.removeChild(a);
        else
          for (a = a.firstChild; a; a = a.nextSibling) e(a);
        break;
      case 3:
      case 4:
        if (p) {
          var b = a.nodeValue,
            d = b.match(t);
          if (d) {
            var c = b.substring(0, d.index);
            a.nodeValue = c;
            (b = b.substring(d.index + d[0].length)) && a.parentNode.insertBefore(s.createTextNode(b), a.nextSibling);
            h(a);
            c || a.parentNode.removeChild(a)
          }
        }
      }
    }

    function h(a) {
      function b(a, d) {
        var e = d ? a.cloneNode(!1) : a,
          f = a.parentNode;
        if (f) {
          var f = b(f, 1),
            g = a.nextSibling;
          f.appendChild(e);
          for (var h = g; h; h = g) g = h.nextSibling, f.appendChild(h)
        }
        return e
      }
      for (; !a.nextSibling;)
        if (a = a.parentNode, !a) return;
      for (var a = b(a.nextSibling, 0), e;
        (e = a.parentNode) && e.nodeType === 1;) a = e;
      d.push(a)
    }
    var k = /(?:^|\s)nocode(?:\s|$)/,
      t = /\r\n?|\n/,
      s = a.ownerDocument,
      l;
    a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && (l = s.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
    var p = l && "pre" === l.substring(0, 3);
    for (l = s.createElement("LI"); a.firstChild;) l.appendChild(a.firstChild);
    for (var d = [l], g = 0; g < d.length; ++g) e(d[g]);
    m === (m | 0) && d[0].setAttribute("value",
      m);
    var r = s.createElement("OL");
    r.className = "linenums";
    for (var n = Math.max(0, m - 1 | 0) || 0, g = 0, z = d.length; g < z; ++g) l = d[g], l.className = "L" + (g + n) % 10, l.firstChild || l.appendChild(s.createTextNode("\xa0")), r.appendChild(l);
    a.appendChild(r)
  }

  function k(a, m) {
    for (var e = m.length; --e >= 0;) {
      var h = m[e];
      A.hasOwnProperty(h) ? window.console && console.warn("cannot override language handler %s", h) : A[h] = a
    }
  }

  function C(a, m) {
    if (!a || !A.hasOwnProperty(a)) a = /^\s*</.test(m) ? "default-markup" : "default-code";
    return A[a]
  }

  function E(a) {
    var m =
      a.g;
    try {
      var e = M(a.h),
        h = e.a;
      a.a = h;
      a.c = e.c;
      a.d = 0;
      C(m, h)(a);
      var k = /\bMSIE\b/.test(navigator.userAgent),
        m = /\n/g,
        t = a.a,
        s = t.length,
        e = 0,
        l = a.c,
        p = l.length,
        h = 0,
        d = a.e,
        g = d.length,
        a = 0;
      d[g] = s;
      var r, n;
      for (n = r = 0; n < g;) d[n] !== d[n + 2] ? (d[r++] = d[n++], d[r++] = d[n++]) : n += 2;
      g = r;
      for (n = r = 0; n < g;) {
        for (var z = d[n], f = d[n + 1], b = n + 2; b + 2 <= g && d[b + 1] === f;) b += 2;
        d[r++] = z;
        d[r++] = f;
        n = b
      }
      for (d.length = r; h < p;) {
        var o = l[h + 2] || s,
          c = d[a + 2] || s,
          b = Math.min(o, c),
          i = l[h + 1],
          j;
        if (i.nodeType !== 1 && (j = t.substring(e, b))) {
          k && (j = j.replace(m, "\r"));
          i.nodeValue =
            j;
          var u = i.ownerDocument,
            v = u.createElement("SPAN");
          v.className = d[a + 1];
          var x = i.parentNode;
          x.replaceChild(v, i);
          v.appendChild(i);
          e < o && (l[h + 1] = i = u.createTextNode(t.substring(b, o)), x.insertBefore(i, v.nextSibling))
        }
        e = b;
        e >= o && (h += 2);
        e >= c && (a += 2)
      }
    } catch (w) {
      "console" in window && console.log(w && w.stack ? w.stack : w)
    }
  }
  var v = ["break,continue,do,else,for,if,return,while"],
    w = [
      [v, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
      "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
    ],
    F = [w, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
    G = [w, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
    H = [G, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],
    w = [w, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
    I = [v, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
    J = [v, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
    v = [v, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
    K = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,
    N = /\S/,
    O = u({
      keywords: [F, H, w, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" +
        I, J, v
      ],
      hashComments: !0,
      cStyleComments: !0,
      multiLineStrings: !0,
      regexLiterals: !0
    }),
    A = {};
  k(O, ["default-code"]);
  k(x([], [
    ["pln", /^[^<?]+/],
    ["dec", /^<!\w[^>]*(?:>|$)/],
    ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
    ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
    ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
    ["pun", /^(?:<[%?]|[%?]>)/],
    ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
    ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
    ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
    ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
  ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
  k(x([
    ["pln", /^\s+/, q, " \t\r\n"],
    ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
  ], [
    ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
    ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
    ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
    ["pun", /^[/<->]+/],
    ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
    ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
    ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
    ["lang-css", /^style\s*=\s*"([^"]+)"/i],
    ["lang-css", /^style\s*=\s*'([^']+)'/i],
    ["lang-css",
      /^style\s*=\s*([^\s"'>]+)/i
    ]
  ]), ["in.tag"]);
  k(x([], [
    ["atv", /^[\S\s]+/]
  ]), ["uq.val"]);
  k(u({
    keywords: F,
    hashComments: !0,
    cStyleComments: !0,
    types: K
  }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
  k(u({
    keywords: "null,true,false"
  }), ["json"]);
  k(u({
    keywords: H,
    hashComments: !0,
    cStyleComments: !0,
    verbatimStrings: !0,
    types: K
  }), ["cs"]);
  k(u({
    keywords: G,
    cStyleComments: !0
  }), ["java"]);
  k(u({
    keywords: v,
    hashComments: !0,
    multiLineStrings: !0
  }), ["bsh", "csh", "sh"]);
  k(u({
    keywords: I,
    hashComments: !0,
    multiLineStrings: !0,
    tripleQuotedStrings: !0
  }), ["cv", "py"]);
  k(u({
    keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
    hashComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  }), ["perl", "pl", "pm"]);
  k(u({
    keywords: J,
    hashComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  }), ["rb"]);
  k(u({
    keywords: w,
    cStyleComments: !0,
    regexLiterals: !0
  }), ["js"]);
  k(u({
    keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
    hashComments: 3,
    cStyleComments: !0,
    multilineStrings: !0,
    tripleQuotedStrings: !0,
    regexLiterals: !0
  }), ["coffee"]);
  k(x([], [
    ["str", /^[\S\s]+/]
  ]), ["regex"]);
  window.prettyPrintOne = function (a, m, e) {
    var h = document.createElement("PRE");
    h.innerHTML = a;
    e && D(h, e);
    E({
      g: m,
      i: e,
      h: h
    });
    return h.innerHTML
  };
  window.prettyPrint = function (a) {
    function m() {
      for (var e = window.PR_SHOULD_USE_CONTINUATION ? l.now() + 250 : Infinity; p < h.length && l.now() < e; p++) {
        var n = h[p],
          k = n.className;
        if (k.indexOf("prettyprint") >= 0) {
          var k = k.match(g),
            f, b;
          if (b = !k) {
            b = n;
            for (var o = void 0, c = b.firstChild; c; c = c.nextSibling) var i = c.nodeType,
            o = i === 1 ? o ? b : c : i === 3 ? N.test(c.nodeValue) ? b : o : o;
            b = (f = o === b ? void 0 : o) && "CODE" === f.tagName
          }
          b && (k = f.className.match(g));
          k && (k = k[1]);
          b = !1;
          for (o = n.parentNode; o; o = o.parentNode)
            if ((o.tagName === "pre" || o.tagName === "code" || o.tagName === "xmp") && o.className && o.className.indexOf("prettyprint") >= 0) {
              b = !0;
              break
            }
          b || ((b = (b = n.className.match(/\blinenums\b(?::(\d+))?/)) ? b[1] && b[1].length ? +b[1] : !0 : !1) && D(n, b), d = {
            g: k,
            h: n,
            i: b
          }, E(d))
        }
      }
      p < h.length ? setTimeout(m,
        250) : a && a()
    }
    for (var e = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], h = [], k = 0; k < e.length; ++k)
      for (var t = 0, s = e[k].length; t < s; ++t) h.push(e[k][t]);
    var e = q,
      l = Date;
    l.now || (l = {
      now: function () {
        return +new Date
      }
    });
    var p = 0,
      d, g = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    m()
  };
  window.PR = {
    createSimpleLexer: x,
    registerLangHandler: k,
    sourceDecorator: u,
    PR_ATTRIB_NAME: "atn",
    PR_ATTRIB_VALUE: "atv",
    PR_COMMENT: "com",
    PR_DECLARATION: "dec",
    PR_KEYWORD: "kwd",
    PR_LITERAL: "lit",
    PR_NOCODE: "nocode",
    PR_PLAIN: "pln",
    PR_PUNCTUATION: "pun",
    PR_SOURCE: "src",
    PR_STRING: "str",
    PR_TAG: "tag",
    PR_TYPE: "typ"
  }
})();


/* * * * * * * * *
 * PullToRefresh *
 * Version 0.1.0 *
 * License:  MIT *
 * SimonWaldherr *
 * * * * * * * * */

/*jslint browser: true, indent: 2 */
/*global ActiveXObject */

var ptr = [],
  ptr_settings = {mlang : 'en', mode : 'mail'},
  ptr_messages = {
    en : {pulltorefresh : 'Pull to refresh', 'loading' : 'Loading ...'},
    de : {pulltorefresh : 'ziehen zum aktualisieren', 'loading' : 'laden ...'}
  };

var ptr_init = function (language) {
  "use strict";
  var i = 0;
  if (language !== undefined) {
    ptr_settings.mlang = language;
  }
  ptr.scrollable_parent = false;
  ptr.scrollables = document.getElementsByClassName('ptr_scrollable');
  if ((window.hasOwnProperty('ontouchstart')) || (window.navigator.msPointerEnabled)) {
    document.getElementsByTagName('body')[0].className += ' touch';
  } else {
    document.getElementsByTagName('body')[0].className += ' notouch';
  }

  for (i = 0; i < ptr.scrollables.length; i += 1) {
    if (ptr.scrollables[i].hasAttribute('data-url') !== false) {
      ptr.box = document.createElement('div');
      ptr.container = document.createElement('div');
      ptr.image = document.createElement('div');
      ptr.text = document.createElement('div');

      ptr.box.appendChild(ptr.container);
      ptr.container.appendChild(ptr.image);
      ptr.container.appendChild(ptr.text);
      ptr.text.innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh;

      ptr.box.className = 'ptr_box';
      ptr.box.style.right = '99%';
      ptr.container.className = 'ptr_container';
      ptr.image.className = 'ptr_image';
      ptr.text.className = 'ptr_text';

      ptr.scrollables[i].firstElementChild.insertBefore(ptr.box, ptr.scrollables[i].firstElementChild.firstChild);
    }
  }

  document.addEventListener('touchstart', function (e) {
    var parent = e.target,
      i = 0;

    if (parent.className === undefined) {
      return false;
    }

    for (i = 0; i < 10; i += 1) {
      if (parent.className !== undefined) {

        if (parent.className.match('ptr_scrollable')) {

          ptr.scrollable_parent = i;
          i = 10;

          if (parent.hasAttribute('data-url') !== false) {
            if (parent.getElementsByClassName('ptr_box')[0] === undefined) {
              ptr.box = document.createElement('div');
              ptr.container = document.createElement('div');
              ptr.image = document.createElement('div');
              ptr.text = document.createElement('div');

              ptr.box.appendChild(ptr.container);
              ptr.container.appendChild(ptr.image);
              ptr.container.appendChild(ptr.text);
              ptr.text.innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh;

              ptr.box.className = 'ptr_box';
              ptr.box.style.right = '99%';
              ptr.container.className = 'ptr_container';
              ptr.image.className = 'ptr_image';
              ptr.text.className = 'ptr_text';

              parent.firstElementChild.insertBefore(ptr.box, parent.firstElementChild.firstChild);
            } else {
              parent.getElementsByClassName('ptr_box')[0].style.opacity = 1.0;
              if (parent.getElementsByClassName('ptr_text')[0].innerHTML !== ptr_messages[ptr_settings.mlang].loading) {
                parent.getElementsByClassName('ptr_text')[0].innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh;
              }
            }
          } else if (parent.getElementsByClassName('ptr_box')[0] !== undefined) {
            parent.removeChild(parent.getElementsByClassName('ptr_box')[0]);
          }

          if (parent.scrollTop === 0) {
            parent.scrollTop = 1;
            parent.getElementsByClassName('ptr_wrap')[0].style.top = '1px';
          } else if ((parent.scrollTop + parent.offsetHeight) === parent.scrollHeight) {
            parent.scrollTop = parent.scrollTop - 1;
          }
        }
      }

      if ((parent.parentNode.tagName === undefined)) {
        i = 10;
        return false;
      }
      if ((parent.parentNode.tagName === 'BODY') || (parent.parentNode.tagName === 'HTML')) {
        i = 10;
        return false;
      }

      parent = parent.parentNode;
    }
  });

  document.addEventListener('touchmove', function (e) {
    var parent = e.target,
      scroll = false,
      rotate = 90,
      i = 0,
      top,
      time,
      insert,
      inserted,
      ajax,
      ajaxTimeout,
      requrl;

    if (ptr.scrollable_parent === false) {
      e.preventDefault();
      return false;
    }

    for (i = 0; i < ptr.scrollable_parent; i += 1) {
      parent = parent.parentNode;
    }

    if ((ptr.scrollable_parent !== false) && (parent.hasAttribute('data-url') !== false)) {
      scroll = true;
      ptr.element = parent;
      ptr.wrapelement = ptr.element.getElementsByClassName('ptr_wrap')[0];
      top = ptr.element.scrollTop;
      ptr.box = ptr.element.getElementsByClassName('ptr_box')[0];
      if ((ptr.wrapelement.className.indexOf(' active') === -1) && (!ptr.wrapelement.getElementsByClassName('ptr_image')[0].className.match('ptr_loading')) && (ptr.element.scrollTop < 1)) {
        if (ptr.element.scrollTop < -25) {
          rotate = (top < -40) ? -90 : 130 + parseInt(top * 12 + 270, 10);
        }

        if (ptr.element.scrollTop < 0) {
          ptr.box.style.right = '0px';
          ptr.wrapelement.getElementsByClassName('ptr_image')[0].style['-webkit-transform'] = 'scale(1) rotate(' + rotate + 'deg)';
        }

        if (ptr.element.scrollTop < -51) {
          if (ptr.wrapelement.className.indexOf(' ptr_active') === -1) {
            ptr.box.style.right = '0px';
            ptr.wrapelement.className += ' ptr_active';
            ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = ptr_messages[ptr_settings.mlang].loading;
            ptr.wrapelement.getElementsByClassName('ptr_image')[0].className += ' ptr_loading';

            if (parent.getAttribute('data-url') === 'reload') {
              window.location.reload(true);
              return false;
            }

            ptr.element = parent;
            ptr.wrapelement = ptr.element.getElementsByClassName('ptr_wrap')[0];
            ptr.eleId = parent.id;
            time = new Date();

            ajax = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : (XMLHttpRequest && new XMLHttpRequest()) || null;
            ajaxTimeout = window.setTimeout(function () {
              ajax.abort();
              ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = '';
              ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
              ptr.wrapelement.style.top = '0px';
              ptr.box = document.getElementById(ptr.eleId).getElementsByClassName('ptr_box')[0];
              ptr.box.getElementsByClassName('ptr_image')[0].className = ptr.box.getElementsByClassName('ptr_image')[0].className.replace(' ptr_loading', '');
            }, 6000);
            ajax.onreadystatechange = function () {

              if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                  clearTimeout(ajaxTimeout);
                  if (ajax.status !== 200) {
                    ptr.wrapelement.style.top = '0px';
                    ptr.box.getElementsByClassName('ptr_image')[0].className = ptr.getElementsByClassName('ptr_image')[0].className.replace(' loading', '');
                    ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
                  } else {
                    ptr.box = document.getElementById(ptr.eleId).getElementsByClassName('ptr_box')[0];
                    insert = document.createElement('div');
                    insert.innerHTML = ajax.responseText;
                    insert.className = 'ptr_inserted';

                    ptr.wrapelement.insertBefore(insert, ptr.box.nextSibling);
                    ptr.wrapelement.style.top = '0px';
                    ptr.box.getElementsByClassName('ptr_image')[0].className = ptr.box.getElementsByClassName('ptr_image')[0].className.replace(' ptr_loading', '');
                    ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
                    inserted = document.getElementsByClassName('ptr_inserted')[0];
                    ptr.element.scrollTop = inserted.clientHeight - 51;
                    ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = '';
                    ptr.box.style.right = '99%';

                    ptr.wrapelement.getElementsByClassName('ptr_image')[0].className = ptr.wrapelement.getElementsByClassName('ptr_image')[0].className.replace(' ptr_loading', '');

                    ptr.scrollable_parent = false;
                  }
                }
              }
            };
            requrl = parent.getAttribute('data-url') + '?rt=' + time.getTime();
            ajax.open("POST", requrl, true);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax.send();
          }
        } else if (ptr.element.scrollTop !== 0) {
          if (ptr.wrapelement.className.indexOf(' active') !== -1) {
            ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
            ptr.wrapelement.getElementsByClassName('ptr_text')[0].innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh;
          }
        }
      }
    } else if ((ptr.scrollable_parent !== false)) {
      scroll = true;
    }

    if (scroll === false) {
      e.preventDefault();
    }
  });

  document.addEventListener('touchend', function (e) {
    var parent = e.target,
      i = 0;

    for (i = 0; i < ptr.scrollable_parent; i += 1) {
      parent = parent.parentNode;
    }

    if ((parent.hasAttribute('data-url') !== false) && (ptr.scrollable_parent !== false)) {
      if ((parent.hasAttribute('data-url') !== false)) {
        ptr.element = parent;
        ptr.wrapelement = ptr.element.getElementsByClassName('ptr_wrap')[0];
        ptr.eleId = parent.id;
        ptr.box = ptr.element.getElementsByClassName('ptr_box')[0];

        if (ptr.wrapelement.getElementsByClassName('ptr_image')[0].className.match('ptr_loading')) {
          ptr.wrapelement.className = ptr.wrapelement.className.replace(' ptr_active', '');
          ptr.wrapelement.style.top = '51px';
        } else {
          ptr.box.style.right = '99%';
        }
      }
    }

    ptr.scrollable_parent = false;
  });
};
