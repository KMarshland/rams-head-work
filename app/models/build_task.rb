# == Schema Information
#
# Table name: build_tasks
#
#  id            :integer          not null, primary key
#  name          :string
#  set_task_id   :integer
#  complete      :boolean          default(FALSE)
#  notes         :text
#  schematic_url :string
#  user_id       :integer
#  skills        :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_build_tasks_on_complete     (complete)
#  index_build_tasks_on_set_task_id  (set_task_id)
#  index_build_tasks_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (set_task_id => set_tasks.id)
#  fk_rails_...  (user_id => users.id)
#

class BuildTask < ApplicationRecord
  belongs_to :set_task
  belongs_to :user, optional: true

  serialize :skills, Array

  validates :name, presence: true
  validates :set_task, presence: true

  def as_json(opts)
    {
        id: self.id,
        name: self.name,
        set_task_id: self.set_task_id,
        complete: self.complete,
        notes: self.notes,
        schematic_url: self.schematic_url,
        skills: self.skills,

        user_id: self.user_id,
        user_name: self.user_id.present? ? self.user.name : nil,
        user_email: self.user_id.present? ? self.user.email : nil,
        created_at: self.created_at,
        updated_at: self.updated_at
    }
  end

end
