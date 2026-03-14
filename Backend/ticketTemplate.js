exports.getTicketHTML = (data) => {
  const {
    username,
    email,
    eventTitle,
    eventCategory,
    eventDate,
    eventTime,
    location,
    tickets,
    totalAmount,
    paymentStatus,
    bookedAt,
  } = data;

  const ticketRows = tickets
    .map(
      (t) => `
      <tr>
        <td>${t.type}</td>
        <td>${t.quantity}</td>
        <td>₹${t.price}</td>
        <td>₹${t.subtotal}</td>
      </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            padding: 20px;
            color: #333;
          }
          h1 {
            text-align: center;
            color: #4A90E2;
          }
          .section {
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #f0f0f0;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 0.9em;
            color: #888;
          }
        </style>
      </head>
      <body>
        <h1>🎟 Event Ticket</h1>
        
        <div class="section">
          <strong>Name:</strong> ${username}<br/>
          <strong>Email:</strong> ${email}<br/>
          <strong>Booked At:</strong> ${new Date(bookedAt).toLocaleString()}
        </div>

        <div class="section">
          <strong>Event:</strong> ${eventTitle}<br/>
          <strong>Category:</strong> ${eventCategory}<br/>
          <strong>Date:</strong> ${eventDate}<br/>
          <strong>Time:</strong> ${eventTime}<br/>
          <strong>Venue:</strong> ${location}
        </div>

        <div class="section">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${ticketRows}
            </tbody>
          </table>
        </div>

        <div class="section">
          <strong>Total Amount:</strong> ₹${totalAmount}<br/>
          <strong>Payment Status:</strong> ${paymentStatus}
        </div>

        <div class="footer">
          Thank you for booking with us!
        </div>
      </body>
    </html>
  `;
};
