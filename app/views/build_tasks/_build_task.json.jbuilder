json.extract! build_task, :id, :name, :set_task_id, :complete, :notes, :schematic_url, :user_id, :skills, :created_at, :updated_at
json.url build_task_url(build_task, format: :json)
