
import  { useState, useEffect } from 'react';
import { getVerificationLogs } from '../api/verifiedUsers';

function VerificationLogPage() {
  const [logs, setLogs] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await getVerificationLogs(startDate, endDate);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">User Account Verification Logs</h1>
      <form className="flex items-center gap-4 mb-4" onSubmit={handleFilter}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md dark:text-neutral"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button type="submit" className="p-2 bg-indigo-600 text-white rounded-md">
          Filter
        </button>
      </form>
  
      <table className="w-full max-w-4xl border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">User</th>
            <th className="p-2 border-b">Email Sent Date</th>
            <th className="p-2 border-b">Verification Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log._id} className="odd:bg-gray-800 even:bg-gray-700">
                <td className="p-2">{log.user?.username || 'Unknown'}</td>
                <td className="p-2">{new Date(log.emailSentDate).toLocaleDateString()}</td>
                <td className="p-2">{log.verificationDate ? new Date(log.verificationDate).toLocaleDateString() : 'Not Verified'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 text-center">No verification logs found for the selected date range</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VerificationLogPage;
