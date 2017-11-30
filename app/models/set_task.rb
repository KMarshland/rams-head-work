# == Schema Information
#
# Table name: set_tasks
#
#  id         :integer          not null, primary key
#  name       :string
#  priority   :integer
#  complete   :boolean
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_set_tasks_on_complete  (complete)
#  index_set_tasks_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class SetTask < ApplicationRecord
  belongs_to :user
  has_many :build_tasks

  validates :name, presence: true

end
