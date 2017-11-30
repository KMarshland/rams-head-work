# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171130050750) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "build_tasks", force: :cascade do |t|
    t.string "name"
    t.bigint "set_task_id"
    t.boolean "complete"
    t.text "notes"
    t.string "schematic_url"
    t.bigint "user_id"
    t.text "skills"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["complete"], name: "index_build_tasks_on_complete"
    t.index ["set_task_id"], name: "index_build_tasks_on_set_task_id"
    t.index ["user_id"], name: "index_build_tasks_on_user_id"
  end

  create_table "set_tasks", force: :cascade do |t|
    t.string "name"
    t.integer "priority"
    t.boolean "complete"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["complete"], name: "index_set_tasks_on_complete"
    t.index ["user_id"], name: "index_set_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "name", default: ""
    t.boolean "admin", default: false
    t.string "role", default: ""
    t.text "skills"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "build_tasks", "set_tasks"
  add_foreign_key "build_tasks", "users"
  add_foreign_key "set_tasks", "users"
end
