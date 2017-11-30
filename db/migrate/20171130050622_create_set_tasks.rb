class CreateSetTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :set_tasks do |t|
      t.string :name
      t.integer :priority
      t.boolean :complete
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
    add_index :set_tasks, :complete
  end
end
