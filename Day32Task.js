// 1 Find all the topics and tasks which are thought in the month of October
db.TopicsAndTasks.find({Date : {$gte:"2024-10-01",$lte:"2024-10-31"}})

// 2 Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.Company_drives.find({Date : {$gte:"2020-10-15",$lte:"2020-10-30"}})

// 3 Find all the company drives and students who are appeared for the placement.
db.Users.aggregate([
  {
$group : {
_id : "$CompanyDrivesAttended",
Count : {$sum : 1},
Users : {$push : {Name : "$UserName"}}
}
}
])

// 4 Find the number of problems solved by the user in codekata
db.Users.aggregate([{
$project : {
UserName : 1,
CodekataCount : {$size : "$Codekata"}
}
}])

// 5 Find all the mentors with who has the mentee's count more than 15
db.Mentors.find({MenteeCount : {$gte : 15}})


// 6 Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.Users.find({
Attendance : { $not : { $elemMatch:{$gte : "2020-10-15", $lte : "2020-10-31"}} },
TaskSubmittedDate : { $not : {$elemMatch:{$gte : "2020-10-15", $lte : "2020-10-31"}} }
})