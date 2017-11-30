class SetTasksController < ApplicationController
  before_action :set_set_task, only: [:show, :edit, :update, :destroy]
  before_action :requires_admin

  # GET /set_tasks
  # GET /set_tasks.json
  def index
    @set_tasks = SetTask.all
  end

  # GET /set_tasks/1
  # GET /set_tasks/1.json
  def show
  end

  # GET /set_tasks/new
  def new
    @set_task = SetTask.new
  end

  # GET /set_tasks/1/edit
  def edit
  end

  # POST /set_tasks
  # POST /set_tasks.json
  def create
    @set_task = SetTask.new(set_task_params)

    respond_to do |format|
      if @set_task.save
        format.html { redirect_to @set_task, notice: 'Set task was successfully created.' }
        format.json { render :show, status: :created, location: @set_task }
      else
        format.html { render :new }
        format.json { render json: @set_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /set_tasks/1
  # PATCH/PUT /set_tasks/1.json
  def update
    respond_to do |format|
      if @set_task.update(set_task_params)
        format.html { redirect_to @set_task, notice: 'Set task was successfully updated.' }
        format.json { render :show, status: :ok, location: @set_task }
      else
        format.html { render :edit }
        format.json { render json: @set_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /set_tasks/1
  # DELETE /set_tasks/1.json
  def destroy
    @set_task.destroy
    respond_to do |format|
      format.html { redirect_to set_tasks_url, notice: 'Set task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_set_task
    @set_task = SetTask.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def set_task_params
    params.require(:set_task).permit(:name, :priority, :complete, :user_id).tap do |params|
      params[:user_id] = current_user.id if params[:user_id].blank?
    end
  end

end
