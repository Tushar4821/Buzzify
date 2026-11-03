
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

const emailLayout = (title, name, message, details = "") => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:30px 15px;background:#111111;font-family:Arial,sans-serif;color:#ffffff;">
  <div style="max-width:600px;margin:auto;background:#191919;border:1px solid #333;border-radius:14px;overflow:hidden;">
    <div style="padding:30px;text-align:center;border-bottom:1px solid #333;">
      <h1 style="margin:0;color:#D4AF37;letter-spacing:5px;">BUZZIFY</h1>
      <p style="color:#999;font-size:12px;letter-spacing:2px;">IDEAS INTO IMPACT</p>
    </div>

    <div style="padding:35px 30px;">
      <h2 style="color:#D4AF37;margin-top:0;">${title}</h2>

      <p style="font-size:15px;line-height:1.8;color:#eeeeee;">
        Hi ${escapeHtml(name || "there")},
      </p>

      <p style="font-size:15px;line-height:1.8;color:#cccccc;">
        ${message}
      </p>

      ${details}

      <p style="font-size:14px;line-height:1.8;color:#cccccc;margin-top:30px;">
        Best regards,<br/>
        <strong style="color:#D4AF37;">Team Buzzify</strong>
      </p>
    </div>

    <div style="padding:20px;text-align:center;background:#141414;border-top:1px solid #333;">
      <p style="margin:0;color:#777;font-size:12px;">
        Thank you for choosing Buzzify.
      </p>
    </div>
  </div>
</body>
</html>
`;

const detailsBox = (items) => `
  <div style="background:#242424;padding:20px;border-radius:10px;margin-top:25px;">
    ${items.map(([label, value]) => `
      <p style="font-size:14px;color:#cccccc;margin:10px 0;">
        <strong style="color:#D4AF37;">${escapeHtml(label)}:</strong>
        ${escapeHtml(value || "Not provided")}
      </p>
    `).join("")}
  </div>
`;

export const meetingReceivedTemplate = ({
  name,
  service,
  preferredDate,
}) => emailLayout(
  "We've received your request!",
  name,
  "Thank you for choosing Buzzify. Your meeting request has been successfully received. Our team will review it and contact you shortly to confirm your meeting.",
  detailsBox([
    ["Service", service],
    ["Preferred date", preferredDate],
    ["Status", "Pending confirmation"],
  ])
);

export const meetingConfirmedTemplate = ({
  name,
  service,
  scheduledDate,
  scheduledTime,
}) => emailLayout(
  "Your meeting is confirmed!",
  name,
  "Great news! Our team has confirmed your meeting. We look forward to connecting with you.",
  detailsBox([
    ["Service", service],
    ["Meeting date", scheduledDate],
    ["Meeting time", scheduledTime],
    ["Status", "Confirmed"],
  ])
);

export const meetingRejectedTemplate = ({
  name,
  service,
}) => emailLayout(
  "Meeting request update",
  name,
  "Thank you for your interest in Buzzify. Unfortunately, we are unable to confirm your requested meeting at this time. Please feel free to contact our team to discuss alternative arrangements.",
  detailsBox([
    ["Service", service],
    ["Status", "Unable to confirm"],
  ])
);
