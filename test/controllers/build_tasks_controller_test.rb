require 'test_helper'

class BuildTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @build_task = build_tasks(:one)
  end

  test "should get index" do
    get build_tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_build_task_url
    assert_response :success
  end

  test "should create build_task" do
    assert_difference('BuildTask.count') do
      post build_tasks_url, params: { build_task: { complete: @build_task.complete, name: @build_task.name, notes: @build_task.notes, schematic_url: @build_task.schematic_url, set_task_id: @build_task.set_task_id, skills: @build_task.skills, user_id: @build_task.user_id } }
    end

    assert_redirected_to build_task_url(BuildTask.last)
  end

  test "should show build_task" do
    get build_task_url(@build_task)
    assert_response :success
  end

  test "should get edit" do
    get edit_build_task_url(@build_task)
    assert_response :success
  end

  test "should update build_task" do
    patch build_task_url(@build_task), params: { build_task: { complete: @build_task.complete, name: @build_task.name, notes: @build_task.notes, schematic_url: @build_task.schematic_url, set_task_id: @build_task.set_task_id, skills: @build_task.skills, user_id: @build_task.user_id } }
    assert_redirected_to build_task_url(@build_task)
  end

  test "should destroy build_task" do
    assert_difference('BuildTask.count', -1) do
      delete build_task_url(@build_task)
    end

    assert_redirected_to build_tasks_url
  end
end
