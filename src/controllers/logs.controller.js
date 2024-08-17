// controllers/tasks.controller.js
import UserAccountVerificationLog from '../models/userAccountVerificationLog.js';

export const getVerificationLogs = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const query = {};

    if (startDate && endDate) {
      query.emailSentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const logs = await UserAccountVerificationLog.find(query).populate('user');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving logs' });
  }
};
