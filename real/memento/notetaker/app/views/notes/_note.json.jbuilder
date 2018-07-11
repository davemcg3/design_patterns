json.extract! note, :id, :data, :site, :user, :status, :created_at, :updated_at
json.url note_url(note, format: :json)
