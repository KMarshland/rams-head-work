
task :make_admin, [:email] => [:environment] do |t, args|
  email = args[:email]
  user = User.find_by(email: email)

  if user.blank?
    puts "Could not find user with email '#{email}'"
    next
  end

  if user.is_admin?
    puts "User with email #{email} is already an admin"
    next
  end

  user.make_admin
  if User.find_by(email: email).is_admin?
    puts "User with email #{email} is now an admin"
  else
    puts "Something has gone horribly wrong and user with email #{email} is not an admin"
  end

end