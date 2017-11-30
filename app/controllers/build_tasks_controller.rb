class BuildTasksController < ApplicationController
  before_action :set_build_task, only: [:show, :edit, :update, :destroy]

  # GET /build_tasks
  # GET /build_tasks.json
  def index
    @build_tasks = BuildTask.all
  end

  # GET /build_tasks/1
  # GET /build_tasks/1.json
  def show
  end

  # GET /build_tasks/new
  def new
    @build_task = BuildTask.new
  end

  # GET /build_tasks/1/edit
  def edit
  end

  # POST /build_tasks
  # POST /build_tasks.json
  def create
    @build_task = BuildTask.new(build_task_params)

    respond_to do |format|
      if @build_task.save
        format.html { redirect_to @build_task, notice: 'Build task was successfully created.' }
        format.json { render :show, status: :created, location: @build_task }
      else
        format.html { render :new }
        format.json { render json: @build_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /build_tasks/1
  # PATCH/PUT /build_tasks/1.json
  def update
    respond_to do |format|
      if @build_task.update(build_task_params)
        format.html { redirect_to @build_task, notice: 'Build task was successfully updated.' }
        format.json { render :show, status: :ok, location: @build_task }
      else
        format.html { render :edit }
        format.json { render json: @build_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /build_tasks/1
  # DELETE /build_tasks/1.json
  def destroy
    @build_task.destroy
    respond_to do |format|
      format.html { redirect_to build_tasks_url, notice: 'Build task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_build_task
      @build_task = BuildTask.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def build_task_params
      params.require(:build_task).permit(:name, :set_task_id, :complete, :notes, :schematic_url, :user_id, :skills)
    end
end
