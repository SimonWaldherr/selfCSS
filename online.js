function insert_sm()
  {
    if($id('sm_container'))
      {
        $id('sm_container').innerHTML = '<iframe style="visibility: visible; height: 21px; width: 100px;" src="http://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fselfcss.org%2F&amp;text=selfCSS%20-%20WYSIWYG%20CSS%20Editor" style="width:110px; height:20px;" allowtransparency="true" frameborder="0" scrolling="no"></iframe><div class="g-plusone" data-size="medium" data-href="http://selfcss.org/"></div><div class="t3nAggregator" data-url="http://selfcss.org/"></div><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fselfcss.org%2F&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=true&amp;action=like&amp;colorscheme=dark&amp;font&amp;height=21&amp;appId=216545561765744" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:21px;" allowTransparency="true"></iframe>';
      }
    
    
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

