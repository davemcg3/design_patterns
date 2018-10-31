class ChangeNotesUserToUserId < ActiveRecord::Migration[5.2]
  def change
    rename_column :notes, :user, :user_id
    rename_column :notes, :site, :site_id
    rename_column :notes, :status, :status_id
  end
end
