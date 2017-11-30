class RemoveCompletedFromSetTask < ActiveRecord::Migration[5.1]
  def change
    remove_column :set_tasks, :complete, :boolean, default: false
  end
end
