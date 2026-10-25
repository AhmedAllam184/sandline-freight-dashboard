# Sandline Freight dashboard

Author: Ahmed Allam.

A working Saudi freight dashboard concept with 120 synthetic vehicles, nine hubs,
shipment details, driver KPIs, Arabic/English, responsive phone views and optional motion.

**Live demo:** https://sandline-freight-demo.vercel.app/

## Run

Serve `public/` with any static web server. For example:

```sh
python -m http.server 8080 --directory public
```

Run fixture/privacy checks with `node tools/check.cjs`. Deploy `public/` to a static
host; `vercel.json` additionally enables the optional anonymous visit endpoint.
No database or BI viewer licence is required for this synthetic demo.

## Presentations

Choose a reporting period and shipment, then select **Presentation**. Download four
editable English PowerPoint slides covering fleet results, seven-day delivery
activity, driver performance and the selected shipment. Data is calculated from
`public/data.js`; the presentation is generated in the browser with locally bundled
PptxGenJS. Period totals include all hubs, regardless of the table's hub/search filter.

## Data and deployment boundary

The company, drivers, customers and all records are fictional. Routes and telemetry
are simulated. No real GPS or business-system integration is included.

The public demo contains no confidential data. A company deployment needs its own
authentication, role permissions, governed data connections, retention and security
review. Keep private data and credentials out of browser bundles and public repos.
The static frontend can be adapted to company infrastructure; hosting, development
and maintenance can have costs. Vercel Hobby is for personal/non-commercial use.
See [Vercel plans](https://vercel.com/docs/plans).

Anonymous visit events, when deployed to Vercel, are private runtime logs. The app
does not record raw IPs, form contents or exact visitor location; Do Not Track is
respected. Retention follows the host plan. Remove `api/visit.js` and the `track`
call if analytics are not wanted. No real employee or customer data is used.

## Libraries and assets

D3, Lucide and PptxGenJS retain their upstream notices; the PptxGenJS MIT licence
is included in `public/assets/pptxgenjs-LICENSE.txt`. Country boundaries use Natural
Earth public-domain geography; hub coordinates use GeoNames CC BY 4.0.
The Sandline-branded truck image is AI-generated portfolio artwork.

The walkthrough video is hosted with the demo rather than stored in Git:
[MP4](https://sandline-freight-demo.vercel.app/assets/sandline-walkthrough.mp4).
