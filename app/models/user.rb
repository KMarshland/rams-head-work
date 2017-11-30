# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  name                   :string           default("")
#  admin                  :boolean          default(FALSE)
#  role                   :string           default("")
#  skills                 :text
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  serialize :skills, Array

  def to_s
    self.name || self.email
  end

  def as_json(_opts={})
    {
        id: self.id,
        email: self.email,
        name: self.name,
        is_admin: self.is_admin?,
        role: self.role,
        skills: self.skills
    }
  end

  def is_admin?
    self.admin
  end

  def make_admin
    return if is_admin?

    self.update(admin: true)
  end

  def self.skills
    [
        'Beginner Carpentry',
        'Intermediate Carpentry',
        'Advanced Carpentry',
        'Welding',
        'Table Saw',
        'Scroll Saw',
        'Miter Saw',
        'Beginner Painting',
        'Advanced Painting',
        'Drilling'
    ]
  end

end
