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

require 'test_helper'

class SetTaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
