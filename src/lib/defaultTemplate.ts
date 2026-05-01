export const DEFAULT_HTML_TEMPLATE = `<p><strong>Date:</strong> {date}</p>

<p>To,<br>
{name},<br>
{position},</p>

<p><strong>Subject: {subject}</strong></p>

<p>Dear {name},</p>

<p>
As per the review of your performance this year, we are extremely pleased to inform you that you have been promoted to 
<strong>{newPosition}</strong>. Also, you have a raise in your salary of 
<strong>Rs. {previousTotal}/- per annum</strong>, effective from 
<strong>{effectiveDate}</strong>. Below is the breakdown of your salary structure.
</p>

<p><strong>Detail Break up of Salary:</strong></p>

<table style="width:100%; border-collapse: collapse; margin-top:10px;">
<tr>
  <th style="padding:8px; border:1px solid #000; text-align:left;">Particulars</th>
  <th style="padding:8px; border:1px solid #000; text-align:left;">Monthly Salary</th>
</tr>

<tr>
  <td style="padding:8px; border:1px solid #000;">Basic Salary</td>
  <td style="padding:8px; border:1px solid #000;">{basicSalary}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;">Dearness Allowance</td>
  <td style="padding:8px; border:1px solid #000;">{dearnessAllowance}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;">Total Cash Component</td>
  <td style="padding:8px; border:1px solid #000;">{totalCashComponent}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;">10% PF Contribution (Employee)</td>
  <td style="padding:8px; border:1px solid #000;">{pfEmployee}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;">Gross Salary</td>
  <td style="padding:8px; border:1px solid #000;">{grossSalary}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;">Lunch Allowance</td>
  <td style="padding:8px; border:1px solid #000;">{lunchAllowance}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;">10% PF Contribution (Employer)</td>
  <td style="padding:8px; border:1px solid #000;">{pfEmployer}</td>
</tr>
<tr>
  <td style="padding:8px; border:1px solid #000;"><strong>Total Amount</strong></td>
  <td style="padding:8px; border:1px solid #000;"><strong>{total}</strong></td>
</tr>
</table>

<p>The tax will be deducted and paid as per the Income Tax Act 2058.</p>

<p>
<strong>Note:</strong> Lunch amount is subjected to be cash only if the lunch offered by the company is not used. 
In such case, such amount is taxable amount according to Income Tax Act 2058.
</p>

<p>Wishing you all the best with your new role and responsibilities.</p>

<p>Thank You.</p>

<p style="margin-top:40px;">___________________</p>

<p>
{signatoryName}<br>
{signatoryDesignation}<br>
{companyName}
</p>`;