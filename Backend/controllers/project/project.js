let project = require('../../data/models/project/project');
const db = require('../../utils/database_connection');

exports.projectlist = async (req, res) => {
    db.query('SELECT id, name, duration, sprints, currentSprint, roles, startDate, endDate, icon FROM project ', async (error, result) => {
        if (error) {
            return res.status(400).json({
                data: {
                    data: {

                    },
                    error: {
                        error,
                        message: "Connection failed please try again"
                    }
                }
            });
        } else if (result.length > 0) {
            project = result;

            return res.status(200).json(
                {
                    data: {
                        data: {
                            project

                        }
                    }

                }
            );
        } else if (result.length <= 0) {
            //return res.status()

        }
    });

}