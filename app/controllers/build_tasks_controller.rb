class BuildTasksController < ApplicationController
  before_action :set_tasks, only: [:show, :edit, :update, :destroy, :claim, :relinquish, :mark_complete]
  before_action :requires_admin

  def claim
    if @build_task.user.present?
      return render json: {
          success: false,
          reason: "You can't claim a claimed task"
      }, status: :unprocessable_entity
    end

    missing_skills = []
    @build_task.skills.each do |skill|
      missing_skills << skill unless current_user.skills.include? skill
    end

    unless missing_skills.blank?
      return render json: {
          success: false,
          reason: "Missing required skills: #{missing_skills.join(', ')}"
      }, status: :unprocessable_entity
    end

    if BuildTask.where(user_id: current_user.id, complete: false).exists?
      return render json: {
          success: false,
          reason: "You can't claim a task while you already have another one claimed"
      }, status: :unprocessable_entity
    end

    if @build_task.update({user_id: current_user.id})
      render json: {
          success: true,
          build_task: @build_task,
          set_task: @build_task.set_task
      }
    else
      render json: {
          success: false,
          reason: @build_task.errors
      }, status: :unprocessable_entity
    end
  end

  def relinquish
    unless @build_task.user_id == current_user.id
      return render json: {
          success: false,
          reason: "You can't relinquish a claim you don't own"
      }, status: :unprocessable_entity
    end

    notes = @build_task.notes
    if params[:notes]
      notes << "\n\n#{params[:notes]}"
    end

    if @build_task.update({user_id: nil, notes: notes})
      render json: {
          success: true,
          build_task: @build_task,
          set_task: @build_task.set_task
      }
    else
      render json: {
          success: false,
          reason: @build_task.errors
      }, status: :unprocessable_entity
    end
  end

  def mark_complete
    unless @build_task.user_id == current_user.id
      return render json: {
          success: false,
          reason: "You can't complete a task you haven't claimed"
      }, status: :unprocessable_entity
    end

    notes = @build_task.notes
    if params[:notes]
      notes << "\n\n#{params[:notes]}"
    end

    if @build_task.update({complete: true, notes: notes})
      render json: {
          success: true,
          build_task: @build_task,
          set_task: @build_task.set_task
      }
    else
      render json: {
          success: false,
          reason: @build_task.errors
      }, status: :unprocessable_entity
    end
  end

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
    @build_task.set_task_id = params[:set_task_id]
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
        format.html { redirect_to set_task_build_task_path(@build_task.set_task, @build_task), notice: 'Build task was successfully created.' }
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
        format.html { redirect_to set_task_build_task_path(@build_task.set_task, @build_task), notice: 'Build task was successfully updated.' }
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
  def set_tasks
    @set_task = SetTask.find(params[:set_task_id])
    @build_task = BuildTask.find(params[:id] || params[:build_task_id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def build_task_params
    params.require(:build_task).permit(:name, :set_task_id, :complete, :notes, :schematic_url, :user_id,
                                       skills: (0..User.skills.length).map(&:to_s)).tap do |params|
      params[:skills] = []
      params[:skills] = params[:skills].values if params[:skills].present?
    end
  end
end
