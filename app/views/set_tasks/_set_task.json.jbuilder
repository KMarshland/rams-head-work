json.extract! set_task, :id, :name, :priority, :complete, :user_id, :created_at, :updated_at
json.url set_task_url(set_task, format: :json)
