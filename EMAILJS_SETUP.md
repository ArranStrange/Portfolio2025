# EmailJS Setup Guide

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using arranstrange@googlemail.com)
4. Connect your Gmail account
5. Note down your **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Subject:

```
New Contact Form Message from {{from_name}}
```

### Template Body:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>
    A message by {{from_name}} has been received. Kindly respond at your
    earliest convenience.
  </div>
  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px">
            <strong>{{from_name}}</strong>
          </div>
          <div style="color: #cccccc; font-size: 13px">{{from_email}}</div>
          <div style="color: #cccccc; font-size: 13px">{{time}}</div>
          <p style="font-size: 16px">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update Your Contact Component

Replace the placeholder values in your `src/components/Contact.tsx` file:

```typescript
// Replace these with your actual EmailJS credentials
const result = await emailjs.send(
  "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
  "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
  {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    time: new Date().toLocaleString(),
  },
  "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
);
```

## Step 6: Test Your Form

1. Start your development server: `npm run dev`
2. Navigate to your contact page
3. Fill out the form and submit
4. Check your email (arranstrange@googlemail.com) for the test message

## Troubleshooting

- **Service not found error**: Make sure your Service ID is correct
- **Template not found error**: Verify your Template ID is correct
- **Authentication error**: Check that your Public Key is correct
- **Email not received**: Check your spam folder and EmailJS dashboard for delivery status

## Security Notes

- The Public Key is safe to use in client-side code
- EmailJS handles the email sending securely
- Your Gmail credentials are stored securely by EmailJS
- Consider adding rate limiting or CAPTCHA for production use

## Free Tier Limits

- EmailJS free tier allows 200 emails per month
- Perfect for a portfolio website
- Upgrade if you need more volume
