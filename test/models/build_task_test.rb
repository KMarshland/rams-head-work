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

require 'test_helper'

class BuildTaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
