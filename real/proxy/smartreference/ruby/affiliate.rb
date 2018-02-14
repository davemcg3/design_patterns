CURRENCY_FORMAT = '$%.2f'

class Advertiser
  attr_reader :id, :name, :saleCount, :totalPayout
  @@last_id = 0

  def initialize(name=nil)
    @@last_id += 1;
    @id = @@last_id
    @name = name
    @saleCount = 0
    @totalPayout = 0

    # p self.inspect
    puts "Welcome to the program #{@name}!\n"
  end

  def addSale count=1, payout=0
    @saleCount += count
    @totalPayout += payout
  end
end

class Offer
  attr_reader :id, :payout_percentage, :content, :advertiser, :amount
  @@last_id = 0

  def initialize(payout_percentage=0, content="", advertiser=nil, amount=0)
    @@last_id += 1
    @id = @@last_id

    @payout_percentage = payout_percentage
    @content = content
    @advertiser = advertiser
    @amount = amount

    # p self.inspect
    puts "Offer #{@id} for #{@content} added!"
  end

  def self.last_offer_id
    @@last_id
  end
end

class Sale
  attr_reader :id, :offer, :amount, :advertiser, :advertiser_payout
  @@last_id = 0

  def initialize(offer, amount, advertiser, advertiser_payout)
    @@last_id += 1
    @id = @@last_id

    @offer = offer
    @amount = amount
    @advertiser = advertiser
    @advertiser_payout = advertiser_payout

    # p self.inspect
    puts "Thanks for your purchase!\n"
  end
end

class SmartProxySale
  def self.sale(offer, amount, advertiser, advertiser_payout)
    advertiser.addSale 1, advertiser_payout
    Sale.new(offer, amount, advertiser, advertiser_payout)
  end
end

def run
  advertisers = []
  offers = []
  sales = []

  advertisers << Advertiser.new("Dave")

  offers << Offer.new(0.05, "Widgets", advertisers[0], 5)
  offers << Offer.new(0.10, "Service", advertisers[0], 10)

  loop do
    puts "\nWe have #{offers.count} offers today! Please choose 1 by entering the number of your preferred offer:\n"
    puts "-1: Exit\n"
    puts "0: Advertiser Report\n" # this should only be accessible through an advertiser login, but for today's purposes it's fine
    offers.each do |offer|
      puts "#{offer.id}: #{offer.content} #{sprintf(CURRENCY_FORMAT, offer.amount)}\n"
    end
    print "> "

    selection = gets
    begin
      unless Integer(selection) <= Offer.last_offer_id && Integer(selection) >= -1
        #raise "Invalid selection"
        puts "Invalid selection\n"
        next
      end
    rescue => ex
      puts "Invalid selection\n"
      next
    end
    selection = Integer(selection)

    if selection == -1
      puts "Have a great day!\n"
      exit 0
    elsif selection == 0
      puts "Advertiser report\n"
      puts "#{advertisers[0].name} has made #{advertisers[0].saleCount} sales for a total of #{sprintf(CURRENCY_FORMAT, advertisers[0].totalPayout)}"
      sales.each do |sale|
        # puts "*"*24
        # puts "#{sale.inspect}"
        next if sale.advertiser != advertisers[0]
        puts "* Sale #{sale.id}: #{sale.offer.content}, payout of #{sprintf(CURRENCY_FORMAT, sale.advertiser_payout)}"
        # puts sale.inspect
      end
    else
      # puts "valid\n"
      selection -= 1 #arrays are 0-indexed
      # puts offers[selection].inspect
      sales << SmartProxySale.sale(offers[selection], offers[selection].amount, offers[selection].advertiser, offers[selection].amount * offers[selection].payout_percentage)
      # puts sales.inspect
    end
  end
end

run