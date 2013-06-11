function insert_sm() {
  if($id('sm_container')) {
    $id('sm_container').innerHTML = '<iframe style="visibility: visible; height: 21px; width: 100px;" src="http://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fselfcss.org%2F&amp;text=selfCSS%20-%20WYSIWYG%20CSS%20Editor" style="width:110px; height:20px;" allowtransparency="true" frameborder="0" scrolling="no"></iframe><div class="g-plusone" data-size="medium" data-href="http://selfcss.org/"></div><div class="t3nAggregator" data-url="http://selfcss.org/"></div><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fselfcss.org%2F&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=true&amp;action=like&amp;colorscheme=dark&amp;font&amp;height=21&amp;appId=216545561765744" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:21px;" allowTransparency="true"></iframe><a class="FlattrButton" style="display:none;" rev="flattr;button:compact;" href="http://selfcss.org/"></a><noscript><a href="http://flattr.com/thing/979296/selfCSS" target="_blank"><img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" /></a></noscript>';
  }
  
  /* <![CDATA[ */
    (function() {
      var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'http://api.flattr.com/js/0.6/load.js?mode=auto';
      t.parentNode.insertBefore(s, t);
    })();
  /* ]]> */
  
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://apis.google.com/js/plusone.js';
    var gs = document.getElementsByTagName('script')[0]; gs.parentNode.insertBefore(ga, gs);
  })();
  
  (function() {
    var tn = document.createElement("script"); tn.type = "text/javascript"; tn.async = true;
    tn.src = "http://t3n.de/aggregator/ebutton_async";
    var ts = document.getElementsByTagName("script")[0]; ts.parentNode.insertBefore(tn, ts);
  })();
}
