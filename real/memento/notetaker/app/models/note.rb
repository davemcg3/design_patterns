class Note < ApplicationRecord
  belongs_to :user
  belongs_to :site, optional: true
  belongs_to :status, optional: true # this one might be backward or non-sensical, need to think through
end
