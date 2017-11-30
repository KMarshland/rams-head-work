class AddCompletionDefaults < ActiveRecord::Migration[5.1]
  def change
    change_column :set_tasks, :complete, :boolean, default: false
    change_column :build_tasks, :complete, :boolean, default: false
  end
end
