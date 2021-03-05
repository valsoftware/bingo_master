const {pool} = require('../mySQLDB')
const formidable = require("formidable");

const register = async (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
      await pool.query(
        "SELECT * FROM users where email_id = ?",
        [fields.emailId],
        async (err, rows) => {
          if (rows[0]) {
            res.json("Given Mail Id was already existerd please try another one");
          } else {
            pool.query(
              "INSERT INTO users (user_name, email_id, password) values(?,?,?)",
              [fields.userName, fields.emailId, fields.password],
              (error, results) => {
                console.log(fields.userName, fields.emailId, fields.password);
  
                res.json("Submitted Successfy");
              } 
            );
          }  
        }
      );    
    });
  };
  
  const login = async (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
      await pool.query(
        "SELECT * FROM users WHERE email_id=?",
        [fields.emailId],
        (err, rows) => {
          if(rows[0] == undefined){
            res.json("Please check your Password or Mail Id")
          }else if(rows[0].password ==fields.password ){
            res.json(rows[0].user_id)
          }else{
            res.json("Please check your Password or Mail Id")
          }
        }
      );   
        
    });        
  }; 

  const user_info = async (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
      let { user_id } = req.params;
      pool.query('SELECT * from users WHERE user_id = ?',[user_id],(err,rows)=>{
        res.json(rows[0])   
      })
    }); 
  };     

module.exports = {
    register,
    login,
    user_info   
};