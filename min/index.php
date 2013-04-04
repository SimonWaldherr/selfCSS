<!DOCTYPE html> <html manifest="cache.manifest"> <head> <title>selfCSS - WYSIWYG CSS Editor</title> <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/> <meta name="viewport" content="width=device-width, initial-scale = 0.9, user-scalable = no"> <meta name="apple-mobile-web-app-capable" content="yes" /> <meta name="apple-mobile-web-app-status-bar-style" content="black" /> <link href="https://plus.google.com/112354811285966128277?rel=author" rel="author" type="text/plain"/> <meta name="description" content="selfCSS is a WYSIWYG CSS3 Editor"> <meta name="author" content="Simon Waldherr"> <meta name="keywords" content="CSS, WYSIWYG, HTML, JS, Editor, Generator, Position, Style, Background, Border, Margin, Padding, Shadow, Filter"><script src="script.js" type="text/javascript"></script> <script src="online.js" type="text/javascript"></script><link href="style.css" rel="stylesheet" type="text/css"/><link rel="apple-touch-icon" href="/apple-touch-icon-precomposed.png"/> <link href="favicon.ico" rel="icon" type="image/x-icon"/> <style id="special_style"> </style> <style id="editable_style"> </style> </head> <body onload="wpt_init();"> <div id="topbar"> <div class="item"><a href="./"><img id="logo" src="./logo.png" alt="selfCSS Logo"/></a></div>
</div>
<div id="box"> <div id="toolbar"> <div class="button" id="about_btn" onclick="wpt_dialog('about');">About</div>
<div class="button" id="fullscreen_btn" onclick="wpt_fullscreen();">Fullscreen</div>
<div class="button" id="foldin_btn" onclick="wpt_collapse_all();">collapse all</div>
<div class="button" id="foldout_btn" onclick="wpt_expand_all();">expand all</div>
<div class="button" id="foldout_btn" onclick="wpt_expand_enabled();">expand enabled</div>
<div class="button" id="examples_btn" onclick="wpt_dialog('examples');">Examples</div>
<div id="viewmode" class="segmented"><div class="segment" onclick="editor_show('CSS');">CSS</div><div class="segment" onclick="editor_show('HTML');">HTML</div><div class="segment selected" onclick="editor_show('View');">Preview</div>
</div>
</div>
<div id="sidebar" class="ptr_scrollable"> <div class="ptr_wrap"> <div class="header">Main</div>
<div class="item"><div class="title" id="Main-Position">Position</div>
<div class="wpt_contents"> <div id="posonoff" class="segmented segtwo"><div class="off segment selected">off</div><div class="on segment">on</div></div>
<div id="postype1" class="segmented segthree"><div class="relative segment selected">relative</div><div class="absolute segment">absolute</div><div class="fixed segment">fixed</div></div>
<div id="postype2" class="segmented segthree"><div class="px segment selected">px</div><div class="em segment">em</div><div class="percent segment">%</div></div>
<table> <tbody> <tr> <td>Top:</td> <td> <input name="postop" id="postop" class="fd_slider" type="range" max="100" min="-100" title="postop" value="0" maxlength="6" /> </td> </tr> <tr> <td>Left:</td> <td> <input name="posleft" id="posleft" class="fd_slider" type="range" max="100" min="-100" title="posleft" value="0" maxlength="6" /> </td> </tr> <tr> <td>Right:</td> <td> <input name="posright" id="posright" class="fd_slider" type="range" max="100" min="-100" title="posright" value="0" maxlength="6" /> </td> </tr> <tr> <td>Bottom:</td> <td> <input name="posbottom" id="posbottom" class="fd_slider" type="range" max="100" min="-100" title="posbottom" value="0" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Main-Size">Size</div>
<div class="wpt_contents"> <div id="sizeonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="sizetype" class="segmented segthree"><div class="px segment selected">px</div><div class="em segment">em</div><div class="percent segment">%</div></div>
<table> <tbody> <tr> <td>Width:</td> <td> <input name="width" id="width" class="fd_slider" type="range" max="800" min="0" title="width" value="440" maxlength="6" /> </td> </tr> <tr> <td>Height:</td> <td> <input name="height" id="height" class="fd_slider" type="range" max="800" min="0" title="height" value="535" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Main-Padding">Padding</div>
<div class="wpt_contents"> <div id="padonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="paddd" class="segmented segtwo"><div class="separate segment selected">separate</div><div class="common segment">common</div></div>
<table> <tbody> <tr> <td>Top:</td> <td> <input name="padtop" id="padtop" class="fd_slider" type="range" max="100" min="0" title="padtop" value="15" maxlength="6" /> </td> </tr> <tr> <td>Left:</td> <td> <input name="padleft" id="padleft" class="fd_slider" type="range" max="100" min="0" title="padleft" value="15" maxlength="6" /> </td> </tr> <tr> <td>Right:</td> <td> <input name="padright" id="padright" class="fd_slider" type="range" max="100" min="0" title="padright" value="15" maxlength="6" /> </td> </tr> <tr> <td>Bottom:</td> <td> <input name="padbottom" id="padbottom" class="fd_slider" type="range" max="100" min="0" title="padbottom" value="15" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Main-Margin">Margin</div>
<div class="wpt_contents"> <div id="margonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="margd" class="segmented segtwo"><div class="separate segment selected">separate</div><div class="common segment">common</div></div>
<table> <tbody> <tr> <td>Top:</td> <td> <input name="martop" id="martop" class="fd_slider" type="range" max="100" min="-101" title="martop" value="30" maxlength="6" /> </td> </tr> <tr> <td>Left:</td> <td> <input name="marleft" id="marleft" class="fd_slider" type="range" max="100" min="-101" title="marleft" value="-101" maxlength="6" /> </td> </tr> <tr> <td>Right:</td> <td> <input name="marright" id="marright" class="fd_slider" type="range" max="100" min="-101" title="marright" value="-101" maxlength="6" /> </td> </tr> <tr> <td>Bottom:</td> <td> <input name="marbottom" id="marbottom" class="fd_slider" type="range" max="100" min="-101" title="marbottom" value="0" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Main-Display">Display</div>
<div class="wpt_contents"> <div id="disponoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="displayt" class="segmented full"><div class="block segment full selected">block</div><div class="inline segment full">inline</div><div class="inline-block segment full">inline-block</div><div class="inline-table segment full">inline-table</div><div class="none segment full">none</div></div>
</div>
</div>
<div class="header">Background</div>
<div class="item"><div class="title" id="Background-Color">Color</div>
<div class="wpt_contents"> <div id="bgonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="bgd" class="segmented segtwo"><div class="separate segment selected">colored</div><div class="common segment">gray</div></div>
<table> <tbody> <tr> <td>Red:</td> <td> <input name="bgred" id="bgred" class="fd_slider" type="range" max="255" min="0" title="bgred" value="255" maxlength="6" /> </td> </tr> <tr> <td>Green:</td> <td> <input name="bggreen" id="bggreen" class="fd_slider" type="range" max="255" min="0" title="bggreen" value="255" maxlength="6" /> </td> </tr> <tr> <td>Blue:</td> <td> <input name="bgblue" id="bgblue" class="fd_slider" type="range" max="255" min="0" title="bgblue" value="255" maxlength="6" /> </td> </tr> <tr> <td>Opacity:</td> <td> <input name="bgalpha" id="bgalpha" class="fd_slider" type="range" max="1" min="0" step="0.1" title="bgalpha" value="1" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Background-Image">Image</div>
<div class="wpt_contents"> <div id="backgroundimg" class="segmented full"><div class="none segment full selected">none</div><div class="summer segment full">summer</div><div class="winter segment full">winter</div></div>
</div>
</div>
<div class="item"><div class="title" id="Background-Size">Size</div>
<div class="wpt_contents"> <div id="bgstype" class="segmented segtwo"><div class="px segment selected">px</div><div class="percent segment">%</div></div>
<table> <tbody> <tr> <td>Width:</td> <td> <input name="bgw" id="bgw" class="fd_slider" type="range" max="200" min="0" title="bgw" value="100" maxlength="6" /> </td> </tr> <tr> <td>Height:</td> <td> <input name="bgh" id="bgh" class="fd_slider" type="range" max="200" min="0" title="bgh" value="100" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Background-Position">Position</div>
<div class="wpt_contents"> <div id="bgptype" class="segmented segtwo"><div class="px segment selected">px</div><div class="percent segment">%</div></div>
<table> <tbody> <tr> <td>Top:</td> <td> <input name="bgtop" id="bgtop" class="fd_slider" type="range" max="200" min="0" title="bgtop" value="0" maxlength="6" /> </td> </tr> <tr> <td>Left:</td> <td> <input name="bgleft" id="bgleft" class="fd_slider" type="range" max="200" min="0" title="bgleft" value="0" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="header">Font</div>
<div class="item"><div class="title" id="Text-Size">Size</div>
<div class="wpt_contents"> <div id="fsizeonoff" class="segmented segtwo"><div class="off segment selected">off</div><div class="on segment">on</div></div>
<div id="fontsizetype" class="segmented segfour"><div class="px segment selected">px</div><div class="em segment">em</div><div class="pt segment">pt</div><div class="percent segment">%</div></div>
<table> <tbody> <tr> <td>Size:</td> <td> <input name="fsize" id="fsize" class="fd_slider" type="range" max="100" min="0" title="fsize" value="20" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Text-Color">Color</div>
<div class="wpt_contents"> <div id="tconoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="tcd" class="segmented segtwo"><div class="separate segment selected">colored</div><div class="common segment">gray</div></div>
<table> <tbody> <tr> <td>Red:</td> <td> <input name="tcred" id="tcred" class="fd_slider" type="range" max="255" min="0" title="tcred" value="0" maxlength="6" /> </td> </tr> <tr> <td>Green:</td> <td> <input name="tcgreen" id="tcgreen" class="fd_slider" type="range" max="255" min="0" title="tcgreen" value="0" maxlength="6" /> </td> </tr> <tr> <td>Blue:</td> <td> <input name="tcblue" id="tcblue" class="fd_slider" type="range" max="255" min="0" title="tcblue" value="0" maxlength="6" /> </td> </tr> <tr> <td>Opacity:</td> <td> <input name="tcalpha" id="tcalpha" class="fd_slider" type="range" max="1" min="0" step="0.1" title="tcalpha" value="1" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Main-Font">Family</div>
<div class="wpt_contents"> <div id="fontonoff" class="segmented segtwo"><div class="off segment selected">off</div><div class="on segment">on</div></div>
<div id="font" class="segmented full"><div class="Helvetica segment full selected">Helvetica</div><div class="Lucida segment full">Lucida</div><div class="Georgia segment full">Georgia</div><div class="Menlo segment full">Menlo</div><div class="Hoefler segment full">Hoefler</div></div>
</div>
</div>
<div class="header">Border</div>
<div class="item"><div class="title" id="Border-Thickness">Width</div>
<div class="wpt_contents"> <div id="btonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="bordert" class="segmented segtwo"><div class="separate segment selected">separate</div><div class="common segment">common</div></div>
<table> <tbody> <tr> <td>Top:</td> <td> <input name="bttop" id="bttop" class="fd_slider" type="range" max="25" min="0" title="bttop" value="1" maxlength="6" /> </td> </tr> <tr> <td>Left:</td> <td> <input name="btleft" id="btleft" class="fd_slider" type="range" max="25" min="0" title="btleft" value="1" maxlength="6" /> </td> </tr> <tr> <td>Right:</td> <td> <input name="btright" id="btright" class="fd_slider" type="range" max="25" min="0" title="btright" value="1" maxlength="6" /> </td> </tr> <tr> <td>Bottom:</td> <td> <input name="btbottom" id="btbottom" class="fd_slider" type="range" max="25" min="0" title="btbottom" value="25" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Border-Color">Color</div>
<div class="wpt_contents"> <div id="bcd" class="segmented segtwo"><div class="separate segment selected">colored</div><div class="common segment">gray</div></div>
<table> <tbody> <tr> <td>Red:</td> <td> <input name="bcred" id="bcred" class="fd_slider" type="range" max="255" min="0" title="bcred" value="255" maxlength="6" /> </td> </tr> <tr> <td>Green:</td> <td> <input name="bcgreen" id="bcgreen" class="fd_slider" type="range" max="255" min="0" title="bcgreen" value="255" maxlength="6" /> </td> </tr> <tr> <td>Blue:</td> <td> <input name="bcblue" id="bcblue" class="fd_slider" type="range" max="255" min="0" title="bcblue" value="255" maxlength="6" /> </td> </tr> <tr> <td>Opacity:</td> <td> <input name="bcalpha" id="bcalpha" class="fd_slider" type="range" max="1" min="0" step="0.1" title="bcalpha" value="1" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="Border-Type">Type</div>
<div class="wpt_contents"> <div id="btype" class="segmented full"><div class="solid segment full selected">solid</div><div class="dotted segment full">dotted</div><div class="dashed segment full">dashed</div><div class="double segment full">double</div><div class="none segment full">none</div></div>
</div>
</div>
<div class="item"><div class="title" id="Border-Radius">Radius</div>
<div class="wpt_contents"> <div id="bradonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="borderd" class="segmented segtwo"><div class="separate segment selected">separate</div><div class="common segment">common</div></div>
<table> <tbody> <tr> <td>Top-Left:</td> <td> <input name="brtl" id="brtl" class="fd_slider" type="range" max="100" min="0" title="brtl" value="4" maxlength="6" /> </td> </tr> <tr> <td>Top-Right:</td> <td> <input name="brtr" id="brtr" class="fd_slider" type="range" max="100" min="0" title="brtr" value="4" maxlength="6" /> </td> </tr> <tr> <td>Bottom-Right:</td> <td> <input name="brbr" id="brbr" class="fd_slider" type="range" max="100" min="0" title="brbr" value="4" maxlength="6" /> </td> </tr> <tr> <td>Bottom-Left:</td> <td> <input name="brbl" id="brbl" class="fd_slider" type="range" max="100" min="0" title="brbl" value="4" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="header">Box-Shadow</div>
<div class="item"><div class="title" id="BS-Position">Position</div>
<div class="wpt_contents"> <div id="bsonoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<div id="bstype" class="segmented segtwo"><div class="inset segment selected">inset</div><div class="outside segment">outside</div></div>
<table> <tbody> <tr> <td>Horizontal:</td> <td> <input name="bsh" id="bsh" class="fd_slider" type="range" max="25" min="-25" title="bsh" value="2" maxlength="6" /> </td> </tr> <tr> <td>Vertical:</td> <td> <input name="bsv" id="bsv" class="fd_slider" type="range" max="25" min="-25" title="bsv" value="2" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="BS-Color">Color</div>
<div class="wpt_contents"> <div id="bscold" class="segmented segtwo"><div class="separate segment selected">colored</div><div class="common segment">gray</div></div>
<table> <tbody> <tr> <td>Red:</td> <td> <input name="bsred" id="bsred" class="fd_slider" type="range" max="255" min="0" title="bsred" value="255" maxlength="6" /> </td> </tr> <tr> <td>Green:</td> <td> <input name="bsgreen" id="bsgreen" class="fd_slider" type="range" max="255" min="0" title="bsgreen" value="255" maxlength="6" /> </td> </tr> <tr> <td>Blue:</td> <td> <input name="bsblue" id="bsblue" class="fd_slider" type="range" max="255" min="0" title="bsblue" value="255" maxlength="6" /> </td> </tr> <tr> <td>Opacity:</td> <td> <input name="bsalpha" id="bsalpha" class="fd_slider" type="range" max="1" min="0" step="0.1" title="bsalpha" value="1" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="BS-Blur">Blur</div>
<div class="wpt_contents"> <table> <tbody> <tr> <td>Radius:</td> <td> <input name="bsrad" id="bsrad" class="fd_slider" type="range" max="25" min="0" title="bsrad" value="25" maxlength="6" /> </td> </tr> <tr> <td>Spread:</td> <td> <input name="bssp" id="bssp" class="fd_slider" type="range" max="25" min="-25" title="bssp" value="7" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="header">Text-Shadow</div>
<div class="item"><div class="title" id="TS-Position">Position</div>
<div class="wpt_contents"> <div id="tsonoff" class="segmented segtwo"><div class="off segment selected">off</div><div class="on segment">on</div></div>
<table> <tbody> <tr> <td>Horizontal:</td> <td> <input name="tsh" id="tsh" class="fd_slider" type="range" max="10" min="-10" title="tsh" value="0" maxlength="6" /> </td> </tr> <tr> <td>Vertical:</td> <td> <input name="tsv" id="tsv" class="fd_slider" type="range" max="10" min="-10" title="tsv" value="0" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="TS-Color">Color</div>
<div class="wpt_contents"> <div id="tscold" class="segmented segtwo"><div class="separate segment selected">colored</div><div class="common segment">gray</div></div>
<table> <tbody> <tr> <td>Red:</td> <td> <input name="tsred" id="tsred" class="fd_slider" type="range" max="255" min="0" title="tsred" value="0" maxlength="6" /> </td> </tr> <tr> <td>Green:</td> <td> <input name="tsgreen" id="tsgreen" class="fd_slider" type="range" max="255" min="0" title="tsgreen" value="0" maxlength="6" /> </td> </tr> <tr> <td>Blue:</td> <td> <input name="tsblue" id="tsblue" class="fd_slider" type="range" max="255" min="0" title="tsblue" value="0" maxlength="6" /> </td> </tr> <tr> <td>Opacity:</td> <td> <input name="tsalpha" id="tsalpha" class="fd_slider" type="range" max="1" min="0" step="0.1" title="tsalpha" value="1" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="TS-Blur">Blur</div>
<div class="wpt_contents"> <table> <tbody> <tr> <td>Radius:</td> <td> <input name="tsrad" id="tsrad" class="fd_slider" type="range" max="25" min="0" title="tsrad" value="0" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="header">Special</div>
<div class="item"><div class="title" id="skew">Skew</div>
<div class="wpt_contents"> <table> <tbody> <tr> <td>Skew-X:</td> <td> <input name="skewx" id="skewx" class="fd_slider" type="range" max="360" min="-360" title="skewx" value="0" maxlength="6" /> </td> </tr> <tr> <td>Skew-Y:</td> <td> <input name="skewy" id="skewy" class="fd_slider" type="range" max="360" min="-360" title="skewy" value="0" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="rotate">Rotate</div>
<div class="wpt_contents"> <table> <tbody> <tr> <td>Degrees:</td> <td> <input name="degrot" id="degrot" class="fd_slider" type="range" max="360" min="-360" title="degrot" value="-3" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div class="item"><div class="title" id="filter">Filter</div>
<div class="wpt_contents"> <div id="filteronoff" class="segmented segtwo"><div class="off segment">off</div><div class="on segment selected">on</div></div>
<table> <tbody> <tr> <td>Blur:</td> <td> <input name="fblur" id="fblur" class="fd_slider" type="range" max="25" min="0" title="fblur" value="0" maxlength="6" /> </td> </tr> <tr> <td>Grayscale:</td> <td> <input name="fgray" id="fgray" class="fd_slider" type="range" max="100" min="0" title="fgray" value="0" maxlength="6" /> </td> </tr> <tr> <td>Sepia:</td> <td> <input name="fsepia" id="fsepia" class="fd_slider" type="range" max="100" min="0" title="fsepia" value="12" maxlength="6" /> </td> </tr> <tr> <td>Brightness:</td> <td> <input name="fbright" id="fbright" class="fd_slider" type="range" max="100" min="0" title="fbright" value="0" maxlength="6" /> </td> </tr> <tr> <td>Hue-Rotate:</td> <td> <input name="fhue" id="fhue" class="fd_slider" type="range" max="359" min="0" title="fhue" value="0" maxlength="6" /> </td> </tr> <tr> <td>Saturate:</td> <td> <input name="fsat" id="fsat" class="fd_slider" type="range" max="200" min="0" title="fsat" value="200" maxlength="6" /> </td> </tr> <tr> <td>Contrast:</td> <td> <input name="fcontr" id="fcontr" class="fd_slider" type="range" max="100" min="0" title="fcontr" value="100" maxlength="6" /> </td> </tr> </tbody> </table> </div>
</div>
<div id="sidebarend"></div></div>
</div>
<div id="editor"> <div id="editorView"> <div class="selfCSS" style="background-image:url(./summer.jpg);"></div>
</div>
<div id="editorHTML"> <textarea name="HTMLedit" id="HTMLedit" onchange="$id('editorView').innerHTML = this.value;">&lt;div class="selfCSS" style="background-image:url(./summer.jpg);"&gt;&lt;/div&gt;</textarea> <div id="demos" style="display:none;"> <div id="demo_lorem"><span class="selfCSS">Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></div>
<div id="demo_list"><ul><li class="selfCSS">Lorem</li><li class="selfCSS">ipsum</li><li class="selfCSS">dolor</li><li class="selfCSS">sit</li></ul></div>
<div id="demo_div"><div class="selfCSS"></div></div>
<div id="demo_imgs"><div class="selfCSS" style="background-image:url(./summer.jpg);"></div></div>
<div id="demo_imgw"><div class="selfCSS" style="background-image:url(./winter.jpg);"></div></div>
</div>
</div>
<div id="editorCSS"> <pre class="prettyprint lang-css linenums" id="CSSbox"> </pre> <textarea id="CSStextarea" style="display:none;" onchange="CSStextarea();"></textarea> <br /> <div id="sendCSSviaMail" class="button"></div>
<div id="editCSSbutton" onclick="editCSS('on');" class="button">edit CSS</div>
<div id="showCSSbutton" onclick="editCSS();" style="display:none;" class="button">show CSS</div>
</div>
<div id="backgroundslider"><table><tbody><tr><td>Background:</td><td style="padding-left:15px;width:275px;"><input name="bgslider" id="bgslider" class="fd_slider" type="range" max="255" min="0" title="bgslider" value="23"  maxlength="6" /></td></tr></tbody></table>
  </div>
</div>
<div id="dialog"><h1 id="loadingstat" style="text-align: center;">loading .</h1></div>
<div id="dialogs"> <div id="about"><div class="contents"><h1>about <a href="http://selfcss.org/">selfCSS</a></h1><br/> selfCSS is a <a href="http://de.wikipedia.org/wiki/WYSIWYG">WYSIWYG</a> <a href="http://de.wikipedia.org/wiki/Cascading_Style_Sheets">CSS</a> Editor. Feel free to contact me via <a href="mailto:contact@selfcss.org">eMail</a> or on <a href="simon.waldherr.eu/t">Twitter</a>. This software will be continually developed. Suggestions and tips are always welcome. <br/><br/>selfCSS works on desktop Browsers just as well as on Tablets (like the iPad). It has automatically detected and loaded the <b id="devicetype"></b> of selfCSS. <br/><br/>Other good resources for Web Devs are: <a href="http://css3generator.com/">CSS3generator</a>, <a href="http://html5please.com/">HTML5please</a>, <a href="http://subtlepatterns.com/">SubtlePatterns</a>, <a href="http://css3please.com/">CSS3please</a>, <a href="http://www.colorzilla.com/gradient-editor/">Colorzilla Gradient Editor</a>, <a href="http://www.css3.me/">css3.me</a>, <a href="http://border-radius.com/">border-radius</a>, <a href="http://selfcss.org/baf/editor/buttons.html">BaF Button Editor</a> and <a href="http://selfcss.org/baf/editor/forms.html">BaF Forms Editor</a>.<br/><br/> This Software uses the following open-source codes: <br/><br/>Style and look of <a href="https://github.com/evanw/webgl-filter/">webgl-filter</a> provided under the terms of <b>MIT license</b> by <a href="http://madebyevan.com/">Evan Wallace</a>. <br/>Input Range Polyfill <a href="https://github.com/freqdec/fd-slider">fd-slider</a> provided under the terms of <b>MIT license</b> by <a href="http://www.frequency-decoder.com/">Brian McAllister</a>. <br/><a href="http://cubiq.org/add-to-home-screen">Add to Home Screen</a> provided under the terms of <b>MIT license</b> by <a href="http://cubiq.org/">Matteo Spinelli</a>. <br/><a href="https://github.com/SimonWaldherr/selfCSS">The rest of this code</a> is provided under the terms of <b>MIT license</b> by me (<a href="http://simon.waldherr.eu/">Simon Waldherr</a>). <br/><br/>More Information about the license on Wikipedia: <a href="http://en.wikipedia.org/wiki/MIT_License">en.wikipedia.org/wiki/MIT_License</a> </div><div id="sm_container"></div><div class="button closedialog" onclick="wpt_dialog();">Close</div>
<?php if(strpos($_SERVER["HTTP_ACCEPT_LANGUAGE"], 'de-DE') !== false) { echo '<div class="button" id="about_btn" onclick="wpt_dialog(\'tmg\');">Impressum</div>'; } ?>
</div>
<div id="examples"><div class="contents"><h1>Examples</h1> <div class="button" onclick="loadCSSexample('imgs');">Image</div>
<div class="button" onclick="loadCSSexample('imgw');">Image 2</div>
<div class="button" onclick="loadCSSexample('text');">Text</div>
<div class="button" onclick="loadCSSexample();">clear</div>
</div><br/><br/> <div class="button closedialog" onclick="wpt_dialog();">Close</div>
</div>
<div id="tmg"><div class="contents"><h1>Impressum</h1> <p>Angaben gem&auml;&szlig; &sect; 5 TMG:<br/></p><br /> <h2>Kontakt:</h2> <table><tr> <td>Name:</td><td>Simon Waldherr</td></tr> <td>Stra&szlig;e:</td><td>Kloepfstrasse 2</td></tr> <td>Wohnort:</td><td>94522 Ettling</td></tr> <td>Telefon:</td><td>0049 151 11309488</td></tr> <tr><td>Telefax:</td><td>0049 32 224178618</td></tr> <tr><td>E-Mail:</td><td>contact@selfcss.org</td> </tr></table> </div>
<div class="button closedialog" onclick="wpt_dialog();">Close</div>
</div>
</div>
<div id="dimmer" onclick="wpt_dialog();"></div>
</div>
<div id="topgrad"></div>
<div id="onSmartphones">selfCSS does not work on Smartphones, please try it on the iPad or on a PC</div>
<script type="text/javascript"> var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-36066376-1']); _gaq.push(['_setDomainName', 'selfcss.org']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = 'http://statistik.simon.waldherr.eu/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })(); </script>
</body></html>
