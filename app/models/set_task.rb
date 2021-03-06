# == Schema Information
#
# Table name: set_tasks
#
#  id         :integer          not null, primary key
#  name       :string
#  priority   :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_set_tasks_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class SetTask < ApplicationRecord
  belongs_to :user
  has_many :build_tasks, dependent: :destroy

  validates :name, presence: true

  def complete?
    self.build_tasks.count > 0 && !self.build_tasks.where(complete: false).exists?
  end

  def as_json(opts={})
    {
        id: self.id,
        name: self.name,
        priority: self.priority,
        complete: self.complete?,
        user_name: self.user.name,
        user_email: self.user.email,
        created_at: self.created_at,
        updated_at: self.updated_at,

        build_tasks: self.build_tasks.as_json(opts)
    }
  end

end
