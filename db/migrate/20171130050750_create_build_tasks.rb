class CreateBuildTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :build_tasks do |t|
      t.string :name
      t.belongs_to :set_task, foreign_key: true
      t.boolean :complete
      t.text :notes
      t.string :schematic_url
      t.belongs_to :user, foreign_key: true
      t.text :skills

      t.timestamps
    end
    add_index :build_tasks, :complete
  end
end
