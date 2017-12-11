AbstractAd
display()

GoogleAd
display()

FacebookAd
display()

AmazaonAd()
display()


AdDisplayer
display(type)
  begin
    (type + 'Ad').constantize.new.display
  rescue
    "don't know that ad type"
  end
  

pickAd
  adDisplayer = AdDisplayer.new
  content = case 'traffic source':
  when 'Google':
    adDisplayer.display('Google')
  when 'Facebook':
    adDisplayer.display('Facebook')
  when 'Amazon':
    adDisplayer.display('Amazon')
  else
    adDisplayer.display('booga booga')
  end

  p content