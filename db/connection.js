const mysql = require('mysql')

module.exports = {
    execSQLQuery: () => {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            port: "3306",
            password: "8601",
            database: "flink01"
        });
      
        return connection
    }
    
}




