# EmailJS 412 Error Troubleshooting

## The 412 Error Explained
A 412 error in EmailJS typically means "Precondition Failed" - usually indicating a configuration issue.

## Common Causes & Solutions

### 1. **Template Variables Mismatch**
**Problem:** Template expects variables that aren't being sent.

**Check:** Your template uses these variables:
- `{{name}}`
- `{{time}}`
- `{{message}}`

**Solution:** Make sure your form sends exactly these variable names.

### 2. **Service Not Active**
**Problem:** Gmail service isn't properly connected.

**Check:**
1. Go to EmailJS Dashboard → Email Services
2. Verify your Gmail service is "Active" (green status)
3. If not, reconnect your Gmail account

### 3. **Template Not Saved**
**Problem:** Template changes weren't saved properly.

**Check:**
1. Go to Email Templates
2. Open your template
3. Make sure it's saved and active
4. Copy the exact Template ID

### 4. **Wrong Credentials**
**Problem:** Service ID, Template ID, or Public Key is incorrect.

**Verify:**
- Service ID: `service_ctyuukj` ✅ (looks correct)
- Template ID: `template_gua585j` ✅ (looks correct)
- Public Key: `sR0LMHDgWJggw6gDZ` ✅ (looks correct)

### 5. **Template Content Issues**
**Problem:** Template HTML might have syntax errors.

**Test:** Try a simple template first:
```html
<div>
  <h2>New Message from {{name}}</h2>
  <p><strong>Email:</strong> {{email}}</p>
  <p><strong>Message:</strong> {{message}}</p>
</div>
```

## Debugging Steps

### Step 1: Check Console Logs
Open browser console and submit the form. Look for:
- EmailJS Config logs
- Form Data logs
- Template Params logs
- Error details

### Step 2: Test EmailJS Dashboard
1. Go to EmailJS Dashboard
2. Try sending a test email manually
3. Check if the service works outside your app

### Step 3: Verify Template Variables
Make sure your template only uses these variables:
- `{{name}}`
- `{{email}}` (optional)
- `{{message}}`
- `{{time}}`

### Step 4: Check EmailJS Account Status
- Verify your account is active
- Check if you've hit the free tier limit (200 emails/month)
- Ensure your Gmail account is properly connected

## Quick Fixes to Try

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Clear browser cache and try again**

3. **Test with a minimal template:**
   ```html
   <p>Message from {{name}}: {{message}}</p>
   ```

4. **Check if Gmail service is working:**
   - Go to EmailJS Dashboard
   - Try sending a test email manually

## Still Having Issues?

1. Check the EmailJS dashboard for any error messages
2. Verify your Gmail account settings allow "less secure apps"
3. Try creating a new template with a different name
4. Contact EmailJS support if the issue persists

## Template Verification Checklist

- [ ] Template is saved and active
- [ ] Template ID is correct
- [ ] Template only uses variables: `{{name}}`, `{{message}}`, `{{time}}`
- [ ] No extra spaces or special characters in template
- [ ] Template subject is set correctly
