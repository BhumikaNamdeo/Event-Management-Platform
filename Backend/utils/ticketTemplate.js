exports.getTicketHTML = (data, qrCodeDataURL) => `
<html>
  <body style="font-family: Arial, sans-serif; padding: 20px;">
    <h1 style="color: green;">🎟 Event Ticket</h1>
    <hr/>
    <h2>Customer Details</h2>
    <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Email:</b> ${data.email}</p>

    <h2>Event Details</h2>
    <p><b>Event:</b> ${data.eventTitle}</p>
    <p><b>Category:</b> ${data.eventCategory}</p>
    <p><b>Date:</b> ${new Date(data.eventDate).toLocaleDateString()}</p>
    <p><b>Time:</b> ${data.eventTime}</p>
    <p><b>Location:</b> ${data.location}</p>

    <h2>Tickets</h2>
    <ul>
      ${data.tickets.map(t => `<li>${t.type} - ${t.quantity} x ₹${t.price} = ₹${t.subtotal}</li>`).join('')}
    </ul>

    <h2>Total Amount: ₹${data.totalAmount}</h2>
    <p><b>Payment Status:</b> ${data.paymentStatus}</p>
    <p><b>Booked At:</b> ${new Date(data.bookedAt).toLocaleString()}</p>

    <h2>QR Code</h2>
    <img src="${qrCodeDataURL}" alt="QR Code" width="150" height="150"/>
  </body>
</html>
`;
