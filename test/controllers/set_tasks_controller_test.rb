require 'test_helper'

class SetTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @set_task = set_tasks(:one)
  end

  test "should get index" do
    get set_tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_set_task_url
    assert_response :success
  end

  test "should create set_task" do
    assert_difference('SetTask.count') do
      post set_tasks_url, params: { set_task: { complete: @set_task.complete, name: @set_task.name, priority: @set_task.priority, user_id: @set_task.user_id } }
    end

    assert_redirected_to set_task_url(SetTask.last)
  end

  test "should show set_task" do
    get set_task_url(@set_task)
    assert_response :success
  end

  test "should get edit" do
    get edit_set_task_url(@set_task)
    assert_response :success
  end

  test "should update set_task" do
    patch set_task_url(@set_task), params: { set_task: { complete: @set_task.complete, name: @set_task.name, priority: @set_task.priority, user_id: @set_task.user_id } }
    assert_redirected_to set_task_url(@set_task)
  end

  test "should destroy set_task" do
    assert_difference('SetTask.count', -1) do
      delete set_task_url(@set_task)
    end

    assert_redirected_to set_tasks_url
  end
end
