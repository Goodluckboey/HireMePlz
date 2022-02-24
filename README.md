# HireMePlz

## About HireMePlz

HireMePlz is the third project in a series of assignments given to General Assembly students. Each group is tasked to produce a full-stack app, using the MERN stack. The app's main purpose is to connect employees and employers on a job by job basis. Employees will be able to search for jobs related to their skillsets, while employers will be able to search for candidates for their specific tasks. Both user-modes are interchangable by clicking the toggle at the top of the screen.

Produced by Lim Rui Bing, Ignatius Yap and Patrick Boey


### Built With
* [React.js](https://reactjs.org/)
* [Mongo](https://www.mongodb.com/)


## Usage
* Create an Account
* Login
* Either continue with Employee Mode and browse the jobs available on the database
* Or toggle to Employer Mode and either edit or create your own jobs
* Both modes come with a fuzzy search function for their respective queries.

## Difficulties

### Search Function

Because of the imprecise nature of names and job descriptions, a fuzzy search was implemented as a feature. This allowed users(both Employees and Employers) to incorrectly search for their queries and still get a relatively similar match to what they entered in the first place.

 ```sh
// search for a job allows optional tags and query
app.post("/searchjobs?", async (req, res) => {
  const { query, tags } = sanitize(req.body);
  const { type } = sanitize(req.query); // ?type=and
  let jobs;
  try {
    const regex = new RegExp(query, "gi");
    if (tags.length === 0) {
      jobs = await Job.find({ $or: [{ name: regex }, { description: regex }] });
    } else {
      if (type === "or") {
        jobs = await Job.find({
          $or: [{ name: regex }, { description: regex }],
          tags: { $all: tags },
        });
      } else if (type === "and") {
        jobs = await Job.find({
          $or: [{ name: regex }, { description: regex }],
          tags,
        });
      }
    }
    res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});
   ```
   
By using REGEX, this allowed each query to search for entries similar to itself in a certain margin.

### Database Design
The initial idea was to seperate Employees and Employers e.g Each of these users would only be able to be a certain type upon registration. However, upon further discussion with our instructor and the TAs, we discovered that it was far more intuitive to combine them within a single user, using the employee's id as a link between the two.

The Job Creator would have their Employee Id be used under the key: employer. Any job searches this user makes will henceforth ignore all jobs with the key.employer: user's employee Id.

By designing it this way, it also allowed both modes to be interchangable, rather than singular.



## Acknowledgments
* Wei Jie
* Alex
* Desmond
