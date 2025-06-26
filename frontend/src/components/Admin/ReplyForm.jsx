import React, { useState } from 'react';
import axios from 'axios';

const ReplyForm = ({ ticketId, onSuccess }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/api/v1/admin/tickets/${ticketId}/reply`, {
        sender: 'Support Agent',
        message,
      });
      setMessage('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error sending reply:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Write your reply..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
      ></textarea>
      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Reply'}
      </button>
    </form>
  );
};

export default ReplyForm;
